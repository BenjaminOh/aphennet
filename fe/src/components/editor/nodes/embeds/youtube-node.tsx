import { BlockWithAlignableContents } from "@lexical/react/LexicalBlockWithAlignableContents"
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from "@lexical/react/LexicalDecoratorBlockNode"
import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  Spread,
} from "lexical"
import * as React from "react"
import { JSX } from "react"

import { extractYoutubeId, youtubeEmbedSrc } from "@/lib/youtube"

type YouTubeComponentProps = Readonly<{
  className: Readonly<{
    base: string
    focus: string
  }>
  format: ElementFormatType | null
  nodeKey: NodeKey
  videoID: string
}>

function YouTubeComponent({
  className,
  format,
  nodeKey,
  videoID,
}: YouTubeComponentProps) {
  return (
    <BlockWithAlignableContents
      className={className}
      format={format}
      nodeKey={nodeKey}
    >
      <iframe
        // 작성 화면에서도 렌더 화면과 같은 크기 규칙을 쓴다 (editor-theme.css 참조)
        className="editor-youtube-iframe"
        src={youtubeEmbedSrc(videoID)}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        title="YouTube video"
      />
    </BlockWithAlignableContents>
  )
}

export type SerializedYouTubeNode = Spread<
  {
    videoID: string
  },
  SerializedDecoratorBlockNode
>

// aphennet 기존 게시물의 iframe 은 YouTube 임베드 코드를 그대로 붙여넣은 것이라
// data-lexical-youtube 속성이 없다. @/lib/youtube 의 extractYoutubeId 로 src 에서
// video id 를 뽑아내 함께 인식한다. (null 을 반환하면 그 iframe 이 통째로 사라진다)
function $convertYoutubeElement(
  domNode: HTMLElement
): null | DOMConversionOutput {
  const videoID =
    domNode.getAttribute("data-lexical-youtube") ||
    extractYoutubeId(domNode.getAttribute("src"))
  if (videoID) {
    const node = $createYouTubeNode(videoID)
    return { node }
  }
  return null
}

export class YouTubeNode extends DecoratorBlockNode {
  __id: string

  static getType(): string {
    return "youtube"
  }

  static clone(node: YouTubeNode): YouTubeNode {
    return new YouTubeNode(node.__id, node.__format, node.__key)
  }

  static importJSON(serializedNode: SerializedYouTubeNode): YouTubeNode {
    const node = $createYouTubeNode(serializedNode.videoID)
    node.setFormat(serializedNode.format)
    return node
  }

  exportJSON(): SerializedYouTubeNode {
    return {
      ...super.exportJSON(),
      type: "youtube",
      version: 1,
      videoID: this.__id,
    }
  }

  constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key)
    this.__id = id
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("iframe")
    element.setAttribute("data-lexical-youtube", this.__id)
    // width/height 를 고정하지 않는다. 크기는 렌더 측 CSS
    // (components/common/common/postContentStyles.ts 의 POST_CONTENT_CSS)가
    // width:100% / max-width:1024px / aspect-ratio:16-9 로 결정한다.
    element.setAttribute("src", youtubeEmbedSrc(this.__id))
    element.setAttribute("frameborder", "0")
    element.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    )
    element.setAttribute("allowfullscreen", "true")
    element.setAttribute("title", "YouTube video")
    return { element }
  }

  static importDOM(): DOMConversionMap | null {
    return {
      iframe: (domNode: HTMLElement) => {
        // data-lexical-youtube 가 없는 기존 게시물의 YouTube iframe 도 받는다.
        if (
          !domNode.hasAttribute("data-lexical-youtube") &&
          !extractYoutubeId(domNode.getAttribute("src"))
        ) {
          return null
        }
        return {
          conversion: $convertYoutubeElement,
          priority: 1,
        }
      },
    }
  }

  updateDOM(): false {
    return false
  }

  getId(): string {
    return this.__id
  }

  getTextContent(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _includeInert?: boolean | undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _includeDirectionless?: false | undefined
  ): string {
    return `https://www.youtube.com/watch?v=${this.__id}`
  }

  decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {}
    const className = {
      base: embedBlockTheme.base || "",
      focus: embedBlockTheme.focus || "",
    }
    return (
      <YouTubeComponent
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        videoID={this.__id}
      />
    )
  }
}

export function $createYouTubeNode(videoID: string): YouTubeNode {
  return new YouTubeNode(videoID)
}

export function $isYouTubeNode(
  node: YouTubeNode | LexicalNode | null | undefined
): node is YouTubeNode {
  return node instanceof YouTubeNode
}
