import type {
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    EditorConfig,
    LexicalEditor,
    LexicalNode,
    NodeKey,
    SerializedEditor,
    SerializedLexicalNode,
    Spread,
} from "lexical";
import { $applyNodeReplacement, createEditor, DecoratorNode } from "lexical";
import * as React from "react";
import { JSX, Suspense } from "react";

const ImageComponent = React.lazy(() => import("../editor-ui/image-component"));

export interface ImagePayload {
    altText: string;
    caption?: LexicalEditor;
    height?: number;
    key?: NodeKey;
    margin?: number;
    maxWidth?: number;
    showCaption?: boolean;
    src: string;
    width?: number;
    captionsEnabled?: boolean;
}

function isGoogleDocCheckboxImg(img: HTMLImageElement): boolean {
    return (
        img.parentElement != null &&
        img.parentElement.tagName === "LI" &&
        img.previousSibling === null &&
        img.getAttribute("aria-roledescription") === "checkbox"
    );
}

// "10px" 형태의 CSS 값만 숫자로 변환한다. ("100%" 같은 값은 무시)
function parsePxValue(value: string): number | undefined {
    if (!value.endsWith("px")) {
        return undefined;
    }
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? undefined : parsed;
}

function $convertImageElement(domNode: Node): null | DOMConversionOutput {
    const img = domNode as HTMLImageElement;
    if (img.src.startsWith("file:///") || isGoogleDocCheckboxImg(img)) {
        return null;
    }
    const { alt: altText, src, width, height } = img;
    const node = $createImageNode({
        altText,
        height,
        src,
        width,
        // 폭이 명시된 이미지는 그 폭까지 표시할 수 있어야 하므로 maxWidth 기본값(500)에 걸리지 않게 한다.
        maxWidth: width || undefined,
        margin: parsePxValue(img.style.margin),
    });
    return { node };
}

export type SerializedImageNode = Spread<
    {
        altText: string;
        caption: SerializedEditor;
        height?: number;
        margin?: number;
        maxWidth: number;
        showCaption: boolean;
        src: string;
        width?: number;
    },
    SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __width: "inherit" | number;
    __height: "inherit" | number;
    __maxWidth: number;
    __showCaption: boolean;
    __caption: LexicalEditor;
    // Captions cannot yet be used within editor cells
    __captionsEnabled: boolean;
    __margin: number;

    static getType(): string {
        return "image";
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(
            node.__src,
            node.__altText,
            node.__maxWidth,
            node.__width,
            node.__height,
            node.__showCaption,
            node.__caption,
            node.__captionsEnabled,
            node.__margin,
            node.__key,
        );
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        const { altText, height, width, maxWidth, caption, src, showCaption, margin } = serializedNode;
        const node = $createImageNode({
            altText,
            height,
            margin,
            maxWidth,
            showCaption,
            src,
            width,
        });
        const nestedEditor = node.__caption;
        const editorState = nestedEditor.parseEditorState(caption.editorState);
        if (!editorState.isEmpty()) {
            nestedEditor.setEditorState(editorState);
        }
        return node;
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement("img");
        element.setAttribute("src", this.__src);
        element.setAttribute("alt", this.__altText);

        // 폭/높이는 지정된 경우에만 내보낸다. ("inherit" 을 그대로 쓰면 잘못된 HTML 속성이 된다)
        const styles: string[] = [];
        if (this.__width !== "inherit") {
            element.setAttribute("width", this.__width.toString());
            // 원본 폭이 본문 영역보다 큰 경우에도 넘치지 않도록 100% 상한을 함께 둔다.
            styles.push(`width: ${this.__width}px`, "max-width: 100%");
        }
        if (this.__height !== "inherit") {
            element.setAttribute("height", this.__height.toString());
            styles.push(`height: ${this.__height}px`);
        } else {
            // 폭만 지정된 경우 비율 유지를 위해 높이는 자동으로 둔다.
            styles.push("height: auto");
        }
        if (this.__width === "inherit") {
            // 폭이 없는 이미지(예전에 본문 드롭으로 들어가 폭 없이 저장된 게시물, 외부 붙여넣기)도
            // 최소한 컨테이너를 넘지 않게 상한을 붙인다.
            styles.push("max-width: 100%");
        }
        if (this.__margin > 0) {
            styles.push(`margin: ${this.__margin}px`);
        }
        if (styles.length > 0) {
            element.setAttribute("style", styles.join("; "));
        }
        return { element };
    }

    static importDOM(): DOMConversionMap | null {
        return {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            img: (node: Node) => ({
                conversion: $convertImageElement,
                priority: 0,
            }),
        };
    }

    constructor(
        src: string,
        altText: string,
        maxWidth: number,
        width?: "inherit" | number,
        height?: "inherit" | number,
        showCaption?: boolean,
        caption?: LexicalEditor,
        captionsEnabled?: boolean,
        margin?: number,
        key?: NodeKey,
    ) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__maxWidth = maxWidth;
        this.__width = width || "inherit";
        this.__height = height || "inherit";
        this.__margin = margin || 0;
        this.__showCaption = showCaption || false;
        this.__caption =
            caption ||
            createEditor({
                nodes: [],
            });
        // this.__captionsEnabled = captionsEnabled || captionsEnabled === undefined
        this.__captionsEnabled = false;
    }

    exportJSON(): SerializedImageNode {
        return {
            altText: this.getAltText(),
            caption: this.__caption.toJSON(),
            height: this.__height === "inherit" ? 0 : this.__height,
            margin: this.__margin,
            maxWidth: this.__maxWidth,
            showCaption: this.__showCaption,
            src: this.getSrc(),
            type: "image",
            version: 1,
            width: this.__width === "inherit" ? 0 : this.__width,
        };
    }

    setWidthAndHeight(width: "inherit" | number, height: "inherit" | number): void {
        const writable = this.getWritable();
        writable.__width = width;
        writable.__height = height;
    }

    setShowCaption(showCaption: boolean): void {
        const writable = this.getWritable();
        writable.__showCaption = showCaption;
    }

    // View

    createDOM(config: EditorConfig): HTMLElement {
        const span = document.createElement("span");
        const theme = config.theme;
        const className = theme.image;
        if (className !== undefined) {
            span.className = className;
        }
        // 에디터 미리보기에서도 여백이 그대로 보이도록 래퍼에 적용한다.
        if (this.__margin > 0) {
            span.style.margin = `${this.__margin}px`;
        }
        return span;
    }

    updateDOM(): false {
        return false;
    }

    getSrc(): string {
        return this.__src;
    }

    getAltText(): string {
        return this.__altText;
    }

    decorate(): JSX.Element {
        return (
            <Suspense fallback={null}>
                <ImageComponent
                    src={this.__src}
                    altText={this.__altText}
                    width={this.__width}
                    height={this.__height}
                    maxWidth={this.__maxWidth}
                    nodeKey={this.getKey()}
                    showCaption={this.__showCaption}
                    caption={this.__caption}
                    captionsEnabled={this.__captionsEnabled}
                    resizable={true}
                />
            </Suspense>
        );
    }
}

export function $createImageNode({
    altText,
    height,
    margin,
    maxWidth = 500,
    captionsEnabled,
    src,
    width,
    showCaption,
    caption,
    key,
}: ImagePayload): ImageNode {
    return $applyNodeReplacement(
        new ImageNode(src, altText, maxWidth, width, height, showCaption, caption, captionsEnabled, margin, key),
    );
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
    return node instanceof ImageNode;
}
