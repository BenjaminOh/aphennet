"use client"

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToParentElement } from "@dnd-kit/modifiers"
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils"
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isElementNode,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  ElementFormatType,
  LexicalCommand,
  LexicalEditor,
} from "lexical"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ImageOffIcon,
  ImagePlusIcon,
  Loader2Icon,
  Trash2Icon,
  XIcon,
} from "lucide-react"
import { JSX, useCallback, useEffect, useRef, useState } from "react"
import * as React from "react"

import Checkbox from "@/components/console/form/Checkbox"
import {
  $createImageNode,
  $isImageNode,
  ImageNode,
  ImagePayload,
} from "@/components/editor/nodes/image-node"
import { CAN_USE_DOM } from "@/components/editor/shared/can-use-dom"
import {
  DEFAULT_IMAGE_WIDTH_MODE,
  IMAGE_MARGIN,
  IMAGE_WIDTH_OPTIONS,
  ImageWidthMode,
  MAX_IMAGE_COUNT,
  stripExtension,
  validateImageBytes,
} from "@/components/editor/utils/image-insert-options"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { MAX_IMAGE_EDGE_PX, resizeImageFile } from "@/lib/imageResize"
import { cn } from "@/lib/utils"
import { usePopupStore } from "@/store/common/usePopupStore"

// 원본(basic_solution)은 @/constants/console/messages 의 CONSOLE_CONFIRM_MESSAGES 를 참조했다.
// aphennet 에는 해당 상수 파일이 없고 이 두 문구만 쓰이므로 여기에 둔다.
const DISCARD_PICKED_IMAGES = "URL 탭으로 이동하시겠습니까?"
const discardPickedImagesContent = (count: number) => `추가한 사진 ${count}장이 모두 사라집니다.`

export type InsertImagePayload = Readonly<
  ImagePayload & {
    /** 이미지를 감싸는 문단의 정렬 */
    align?: ElementFormatType
    /** 삽입 후 새 문단으로 줄바꿈할지 여부 (한 줄에 한 장씩) */
    newLine?: boolean
  }
>

const getDOMSelection = (targetWindow: Window | null): Selection | null =>
  CAN_USE_DOM ? (targetWindow || window).getSelection() : null

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND")

export function InsertImageUriDialogBody({
  onClick,
}: {
  onClick: (payload: InsertImagePayload) => void
}) {
  const [src, setSrc] = useState("")
  const [altText, setAltText] = useState("")

  const isDisabled = src === ""

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="image-url">이미지 주소</Label>
        <Input
          id="image-url"
          placeholder="예: https://example.com/image.jpg"
          onChange={(e) => setSrc(e.target.value)}
          value={src}
          data-test-id="image-modal-url-input"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="alt-text">대체 텍스트</Label>
        <Input
          id="alt-text"
          placeholder="이미지를 설명하는 문구"
          onChange={(e) => setAltText(e.target.value)}
          value={altText}
          data-test-id="image-modal-alt-text-input"
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          disabled={isDisabled}
          onClick={() => onClick({ altText, src })}
          className="bg-console-2 text-white hover:bg-console-2/90"
          data-test-id="image-modal-confirm-btn"
        >
          확인
        </Button>
      </DialogFooter>
    </div>
  )
}

// MAX_IMAGE_COUNT / IMAGE_MARGIN / stripExtension 은 본문 직접 드롭 경로와 공유해야 하므로
// @/components/editor/utils/image-insert-options 로 옮겼다.

type PickedImageStatus = "loading" | "loaded" | "error"

type PickedImage = {
  id: string
  name: string
  src: string
  status: PickedImageStatus
  /** 축소 후 실제 픽셀 폭 */
  naturalWidth: number
  /** 축소 후 바이트 수 — 서버 상한 사전 검사용 */
  bytes: number
}

function SortableThumbnail({
  image,
  onRemove,
}: {
  image: PickedImage
  onRemove: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-md border bg-muted",
        image.status === "loaded" && "cursor-grab active:cursor-grabbing",
        isDragging && "z-10 opacity-60 shadow-md"
      )}
      {...attributes}
      {...listeners}
    >
      {image.status === "loading" && (
        <div className="flex size-full items-center justify-center">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {image.status === "error" && (
        <div className="flex size-full flex-col items-center justify-center gap-1 px-1 text-center">
          <ImageOffIcon className="size-5 text-destructive" />
          <span className="text-[10px] leading-tight text-destructive">
            불러오기 실패
          </span>
        </div>
      )}

      {image.status === "loaded" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.src}
          alt={image.name}
          className="size-full object-cover"
          draggable={false}
        />
      )}

      <button
        type="button"
        aria-label={`${image.name} 삭제`}
        // 삭제 버튼을 누를 때 드래그가 시작되지 않도록 포인터 이벤트를 가로챈다.
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onRemove(image.id)}
        className="absolute right-1 top-1 rounded-full bg-foreground/60 p-0.5 text-background opacity-0 transition-opacity hover:bg-foreground/80 focus-visible:opacity-100 group-hover:opacity-100"
      >
        <XIcon className="size-3" />
      </button>
    </div>
  )
}

export function InsertImageUploadedDialogBody({
  onInsert,
  onClose,
  onCountChange,
}: {
  onInsert: (payloads: InsertImagePayload[]) => void
  onClose: () => void
  /** 탭 이동 시 경고가 필요한지 판단할 수 있도록 현재 담긴 사진 수를 알린다. */
  onCountChange: (count: number) => void
}) {
  const [images, setImages] = useState<PickedImage[]>([])
  const [widthMode, setWidthMode] = useState<ImageWidthMode>(
    DEFAULT_IMAGE_WIDTH_MODE
  )
  const [widthInput, setWidthInput] = useState("")
  const [align, setAlign] = useState<"left" | "center" | "right">("left")
  const [onePerLine, setOnePerLine] = useState(true)
  const [useMargin, setUseMargin] = useState(true)
  const [isDragOver, setIsDragOver] = useState(false)
  const { setConfirmPop } = usePopupStore()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const idRef = useRef(0)
  // 최신 목록 길이를 state 갱신 전에 참조하기 위한 ref (여러 파일을 연속으로 추가할 때 필요)
  const imagesRef = useRef<PickedImage[]>([])
  imagesRef.current = images

  const sensors = useSensors(
    // 클릭(삭제 버튼)과 드래그를 구분하기 위해 5px 이상 움직여야 드래그로 인식한다.
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const markError = useCallback((id: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, status: "error" } : img))
    )
  }, [])

  /**
   * 파일을 긴 변 1600px 이하로 줄여 data URL 로 읽는다.
   * 원본을 그대로 실으면 서버 저장 상한에 걸릴 수 있고 본문이 무거워지며,
   * 썸네일 12장이 원본 해상도로 메모리에 남는 것도 막는다.
   */
  const loadFile = useCallback(
    async (file: File, id: string) => {
      try {
        const { src, width, bytes } = await resizeImageFile(file)
        if (!src) {
          markError(id)
          return
        }
        setImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? { ...img, src, status: "loaded", naturalWidth: width, bytes }
              : img
          )
        )
      } catch {
        markError(id)
      }
    },
    [markError]
  )

  const addFiles = useCallback(
    (fileList: FileList | File[] | null) => {
      if (!fileList) {
        return
      }
      const picked = Array.from(fileList).filter((file) =>
        file.type.startsWith("image/")
      )
      const room = MAX_IMAGE_COUNT - imagesRef.current.length
      const accepted = picked.slice(0, Math.max(0, room))
      if (accepted.length === 0) {
        return
      }

      const entries: PickedImage[] = accepted.map((file) => ({
        id: `picked-${(idRef.current += 1)}`,
        name: file.name,
        src: "",
        status: "loading",
        naturalWidth: 0,
        bytes: 0,
      }))

      // 짧은 간격으로 연속 추가되어도 상한을 넘지 않도록 갱신 시점에 한 번 더 자른다.
      setImages((prev) => [...prev, ...entries].slice(0, MAX_IMAGE_COUNT))
      accepted.forEach((file, index) => void loadFile(file, entries[index].id))
    },
    [loadFile]
  )

  const handleRemove = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) {
      return
    }
    setImages((prev) => {
      const from = prev.findIndex((img) => img.id === active.id)
      const to = prev.findIndex((img) => img.id === over.id)
      return from === -1 || to === -1 ? prev : arrayMove(prev, from, to)
    })
  }, [])

  useEffect(() => {
    onCountChange(images.length)
  }, [images.length, onCountChange])

  // URL 탭으로 전환되면 이 본문이 언마운트되므로 보관 중이던 수도 함께 비운다.
  useEffect(() => () => onCountChange(0), [onCountChange])

  const loadedImages = images.filter((img) => img.status === "loaded")
  const isLoading = images.some((img) => img.status === "loading")
  const isFull = images.length >= MAX_IMAGE_COUNT

  const handleConfirm = () => {
    // 서버 저장 상한(be/src/middleware/util.js)을 저장 버튼이 아니라 여기서 먼저 잡는다.
    const invalid = validateImageBytes(loadedImages)
    if (invalid) {
      setConfirmPop(true, invalid, 1)
      return
    }

    // "원본" 은 각 이미지의 (축소 후) 실제 폭을 그대로 쓴다.
    // "직접 입력" 은 입력값을, 나머지는 선택값 자체가 픽셀 폭이다.
    let fixedWidth: number | undefined
    if (widthMode === "custom") {
      const parsedWidth = parseInt(widthInput, 10)
      fixedWidth =
        Number.isNaN(parsedWidth) || parsedWidth <= 0 ? undefined : parsedWidth
    } else if (widthMode !== "original") {
      fixedWidth = parseInt(widthMode, 10)
    }

    const payloads = loadedImages.map<InsertImagePayload>((img) => {
      // 디코딩에 실패한 파일(HEIC 등)은 naturalWidth 가 0 이다.
      // 그대로 두면 maxWidth 가 0 이 되어 이미지가 보이지 않으므로 undefined 로 떨군다.
      const width = fixedWidth ?? (img.naturalWidth || undefined)
      return {
        src: img.src,
        altText: stripExtension(img.name),
        width,
        maxWidth: width,
        margin: useMargin ? IMAGE_MARGIN : 0,
        align,
        newLine: onePerLine,
      }
    })

    if (payloads.length > 0) {
      onInsert(payloads)
    }
  }

  return (
    <div className="grid gap-4 py-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isFull}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlusIcon className="mr-1 size-4" />
            사진 추가
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={images.length === 0}
            onClick={() => setImages([])}
          >
            <Trash2Icon className="mr-1 size-4" />
            전체 삭제
          </Button>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {images.length}장 / 최대 {MAX_IMAGE_COUNT}장
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files)
          // 같은 파일을 다시 선택해도 change 가 발생하도록 값을 비운다.
          e.target.value = ""
        }}
        data-test-id="image-modal-file-upload"
      />

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragOver(false)
          addFiles(e.dataTransfer.files)
        }}
        className={cn(
          "rounded-md border-2 border-dashed p-2 transition-colors",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/30"
        )}
      >
        {images.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center gap-1 text-center">
            <ImagePlusIcon className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              사진을 점선 안으로 끌어 놓으세요
            </p>
            <p className="text-xs text-muted-foreground">
              한 번에 최대 {MAX_IMAGE_COUNT}장까지 넣을 수 있습니다
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToParentElement]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((img) => img.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid max-h-52 grid-cols-4 gap-2 overflow-y-auto">
                {images.map((image) => (
                  <SortableThumbnail
                    key={image.id}
                    image={image}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <div className="grid gap-3 rounded-md border p-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="image-width" className="shrink-0 text-xs">
              사진 폭
            </Label>
            <Select
              value={widthMode}
              onValueChange={(value) => setWidthMode(value as ImageWidthMode)}
            >
              <SelectTrigger id="image-width" className="h-8 w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {IMAGE_WIDTH_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {widthMode === "custom" && (
              <>
                <Input
                  inputMode="numeric"
                  placeholder="예: 720"
                  value={widthInput}
                  onChange={(e) =>
                    setWidthInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="h-8 w-20"
                />
                <span className="text-xs text-muted-foreground">픽셀</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Label className="shrink-0 text-xs">정렬</Label>
            <ToggleGroup
              type="single"
              size="sm"
              value={align}
              onValueChange={(value) => {
                if (value) {
                  setAlign(value as "left" | "center" | "right")
                }
              }}
            >
              <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
                <AlignLeftIcon className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="가운데 정렬">
                <AlignCenterIcon className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
                <AlignRightIcon className="size-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Checkbox
            checked={onePerLine}
            txt="한 줄에 한 장씩 넣기"
            className="justify-start text-xs"
            onChange={(e) => setOnePerLine(e.currentTarget.checked)}
          />
          <Checkbox
            checked={useMargin}
            txt="사진 여백 넣기"
            className="justify-start text-xs"
            onChange={(e) => setUseMargin(e.currentTarget.checked)}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          높이는 비율에 맞게 자동 설정되며, 위 설정은 모든 사진에 적용됩니다.
          <br />
          원본이 큰 사진은 긴 변 {MAX_IMAGE_EDGE_PX}px 이하로 자동 축소되어
          저장됩니다.
        </p>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button
          type="submit"
          disabled={loadedImages.length === 0 || isLoading}
          onClick={handleConfirm}
          className="bg-console-2 text-white hover:bg-console-2/90"
          data-test-id="image-modal-file-upload-btn"
        >
          {isLoading ? "불러오는 중..." : `확인 (${loadedImages.length}장)`}
        </Button>
      </DialogFooter>
    </div>
  )
}

export function InsertImageDialog({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor
  onClose: () => void
}): JSX.Element {
  const hasModifier = useRef(false)
  const [tab, setTab] = useState("file")
  const [pickedCount, setPickedCount] = useState(0)
  const { setConfirmPop } = usePopupStore()

  useEffect(() => {
    hasModifier.current = false
    const handler = (e: KeyboardEvent) => {
      hasModifier.current = e.altKey
    }
    document.addEventListener("keydown", handler)
    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [activeEditor])

  const handleTabChange = (value: string) => {
    // ConfirmPop 은 콘솔 레이아웃에서만 렌더링되므로, 콘솔 밖에서는 바로 전환한다.
    const canConfirm =
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/console")

    // 파일 탭을 벗어나면 본문이 언마운트되면서 담아둔 사진이 사라진다.
    if (value === "url" && pickedCount > 0 && canConfirm) {
      // aphennet 의 setConfirmPop 은 (show, txt, btn, handleClick?, handleClose?) 5인자다.
      // 원본의 6번째 content 인자가 없으므로 안내 문구를 txt 에 합친다.
      setConfirmPop(
        true,
        `${DISCARD_PICKED_IMAGES}<br />${discardPickedImagesContent(pickedCount)}`,
        2,
        () => setTab("url")
      )
      return
    }
    setTab(value)
  }

  const onClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
    onClose()
  }

  const onInsert = (payloads: InsertImagePayload[]) => {
    payloads.forEach((payload) =>
      activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
    )
    onClose()
  }

  return (
    <Tabs value={tab} onValueChange={handleTabChange}>
      <TabsList className="w-full">
        <TabsTrigger value="url" className="w-full">
          URL
        </TabsTrigger>
        <TabsTrigger value="file" className="w-full">
          파일
        </TabsTrigger>
      </TabsList>
      <TabsContent value="url">
        <InsertImageUriDialogBody onClick={onClick} />
      </TabsContent>
      <TabsContent value="file">
        <InsertImageUploadedDialogBody
          onInsert={onInsert}
          onClose={onClose}
          onCountChange={setPickedCount}
        />
      </TabsContent>
    </Tabs>
  )
}

export function ImagesPlugin({
  captionsEnabled,
}: {
  captionsEnabled?: boolean
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor")
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload)
          $insertNodes([imageNode])

          // 이미지가 최상위에 삽입되면 문단으로 감싼다. 이미 문단 안이면 그 문단을 그대로 쓴다.
          let block = imageNode.getParentOrThrow()
          if ($isRootOrShadowRoot(block)) {
            block = $wrapNodeInElement(imageNode, $createParagraphNode)
          }

          if ($isElementNode(block)) {
            // ImageNode 는 정렬 속성을 갖지 않으므로 감싸는 문단에 정렬을 적용한다.
            if (payload.align) {
              block.setFormat(payload.align)
            }
            if (payload.newLine) {
              // 다음 이미지가 같은 줄에 붙지 않도록 빈 문단을 만들어 커서를 옮긴다.
              const nextParagraph = $createParagraphNode()
              block.insertAfter(nextParagraph)
              nextParagraph.selectEnd()
            } else {
              block.selectEnd()
            }
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => {
          return $onDragStart(event)
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        (event) => {
          return $onDragover(event)
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => {
          return $onDrop(event, editor)
        },
        COMMAND_PRIORITY_HIGH
      )
    )
  }, [captionsEnabled, editor])

  return null
}

function $onDragStart(event: DragEvent): boolean {
  const node = $getImageNodeInSelection()
  if (!node) {
    return false
  }
  const dataTransfer = event.dataTransfer
  if (!dataTransfer) {
    return false
  }
  const TRANSPARENT_IMAGE =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  const img = document.createElement("img")
  img.src = TRANSPARENT_IMAGE
  dataTransfer.setData("text/plain", "_")
  dataTransfer.setDragImage(img, 0, 0)
  dataTransfer.setData(
    "application/x-lexical-drag",
    JSON.stringify({
      data: {
        altText: node.__altText,
        caption: node.__caption,
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        showCaption: node.__showCaption,
        src: node.__src,
        width: node.__width,
      },
      type: "image",
    })
  )

  return true
}

function $onDragover(event: DragEvent): boolean {
  const node = $getImageNodeInSelection()
  if (!node) {
    return false
  }
  if (!canDropImage(event)) {
    event.preventDefault()
  }
  return true
}

function $onDrop(event: DragEvent, editor: LexicalEditor): boolean {
  const node = $getImageNodeInSelection()
  if (!node) {
    return false
  }
  const data = getDragImageData(event)
  if (!data) {
    return false
  }
  event.preventDefault()
  if (canDropImage(event)) {
    const range = getDragSelection(event)
    node.remove()
    const rangeSelection = $createRangeSelection()
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range)
    }
    $setSelection(rangeSelection)
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data)
  }
  return true
}

function $getImageNodeInSelection(): ImageNode | null {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) {
    return null
  }
  const nodes = selection.getNodes()
  const node = nodes[0]
  return $isImageNode(node) ? node : null
}

function getDragImageData(event: DragEvent): null | InsertImagePayload {
  const dragData = event.dataTransfer?.getData("application/x-lexical-drag")
  if (!dragData) {
    return null
  }
  const { type, data } = JSON.parse(dragData)
  if (type !== "image") {
    return null
  }

  return data
}

declare global {
  interface DragEvent {
    rangeOffset?: number
    rangeParent?: Node
  }
}

function canDropImage(event: DragEvent): boolean {
  const target = event.target
  return !!(
    target &&
    target instanceof HTMLElement &&
    !target.closest("code, span.editor-image") &&
    target.parentElement &&
    target.parentElement.closest("div.ContentEditable__root")
  )
}

function getDragSelection(event: DragEvent): Range | null | undefined {
  let range
  const target = event.target as null | Element | Document
  const targetWindow =
    target == null
      ? null
      : target.nodeType === 9
        ? (target as Document).defaultView
        : (target as Element).ownerDocument.defaultView
  const domSelection = getDOMSelection(targetWindow)
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY)
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0)
    range = domSelection.getRangeAt(0)
  } else {
    throw Error(`Cannot get the selection when dragging`)
  }

  return range
}
