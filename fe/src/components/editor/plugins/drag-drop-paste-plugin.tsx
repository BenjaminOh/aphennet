"use client"

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { DRAG_DROP_PASTE } from "@lexical/rich-text"
import { isMimeType } from "@lexical/utils"
import { COMMAND_PRIORITY_LOW } from "lexical"
import { useEffect } from "react"

import { INSERT_IMAGE_COMMAND } from "@/components/editor/plugins/images-plugin"
import {
  DEFAULT_INSERT_OPTIONS,
  MAX_IMAGE_COUNT,
  stripExtension,
  validateImageBytes,
} from "@/components/editor/utils/image-insert-options"
import { resizeImageFile } from "@/lib/imageResize"
import { uploadEditorImage } from "@/service/common/uploadEditorImage"
import { usePopupStore } from "@/store/common/usePopupStore"

const ACCEPTABLE_IMAGE_TYPES = [
  "image/",
  "image/heic",
  "image/heif",
  "image/gif",
  "image/webp",
]

/**
 * 본문에 사진을 직접 드래그앤드롭하거나 붙여넣는 경로.
 *
 * 예전에는 `mediaFileReader` 로 원본을 그대로 data URL 로 만들어
 * `{ altText, src }` 만 넘겼다. 그래서
 *  - 폭이 없으니 ImageNode 가 "inherit" 이 되고, exportDOM 이 width·style 을 아예 안 붙여
 *    저장된 본문에서 사진이 원본 픽셀 그대로 나왔고,
 *  - 원본 바이트가 그대로 실려 서버 저장 상한에 걸리고 본문이 무거워졌다.
 *
 * 지금은 모달("이미지 넣기")과 같은 축소·기본값 규칙을 태운다.
 */
export function DragDropPastePlugin(): null {
  const [editor] = useLexicalComposerContext()
  const { setConfirmPop } = usePopupStore()

  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        ;(async () => {
          const images = files.filter((file) =>
            isMimeType(file, ACCEPTABLE_IMAGE_TYPES)
          )
          if (images.length === 0) {
            return
          }

          // 모달과 같은 상한을 쓴다. 초과분은 잘라내고 그 사실을 알린다.
          const accepted = images.slice(0, MAX_IMAGE_COUNT)
          const dropped = images.length - accepted.length

          const resized = await Promise.all(
            accepted.map(async (file) => ({
              name: file.name,
              ...(await resizeImageFile(file)),
            }))
          )
          // 서버 저장 상한(be/src/middleware/util.js)을 업로드 전에 먼저 잡는다.
          const invalid = validateImageBytes(resized)
          if (invalid) {
            setConfirmPop(true, invalid, 1)
            return
          }

          // 본문에 base64 로 싣지 않고 여기서 파일로 올린 뒤 URL 만 넣는다.
          let uploaded: { name: string; url: string }[]
          try {
            uploaded = await Promise.all(
              resized.map(async (image) => ({
                name: image.name,
                url: await uploadEditorImage(image.blob, image.name),
              }))
            )
          } catch {
            // consoleAxios 인터셉터가 이미 사유를 띄운다. 여기서 중복 안내하지 않는다.
            return
          }

          uploaded.forEach((image) => {
            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
              src: image.url,
              altText: stripExtension(image.name),
              // 폭을 지정해야 exportDOM 이 width·max-width 를 내보낸다.
              width: DEFAULT_INSERT_OPTIONS.width,
              maxWidth: DEFAULT_INSERT_OPTIONS.width,
              margin: DEFAULT_INSERT_OPTIONS.margin,
              align: DEFAULT_INSERT_OPTIONS.align,
              newLine: DEFAULT_INSERT_OPTIONS.newLine,
            })
          })

          if (dropped > 0) {
            setConfirmPop(
              true,
              `한 번에 최대 ${MAX_IMAGE_COUNT}장까지 넣을 수 있습니다.<br />${dropped}장은 제외했습니다.`,
              1
            )
          }
        })()
        return true
      },
      COMMAND_PRIORITY_LOW
    )
  }, [editor, setConfirmPop])
  return null
}
