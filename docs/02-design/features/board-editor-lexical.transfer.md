# 게시판 에디터 (Quill → Lexical) — 이관 작업지시서

- **원본**: `/Users/benjaminoh/dev/project/likeweb/basic_solution/fe/src/components/{editor,blocks/editor-x}` (읽기 전용 — 원본 미수정)
- **대상**: `/Users/benjaminoh/dev/project/aphennet/aphennet`
- **작성일**: 2026-08-17
- **판정**: **혼합** (코어 이식 + 결합부 재작성)
- **소비자**: 관리자 게시판 글쓰기/수정 화면 1곳 — `fe/src/components/console/board/post/-components/PostFormBody.tsx`

> ⚠️ 이 문서는 지시서다. 착수 지시를 받아 구현한다.

---

## 1. 왜 가져오는가

관리자가 에디터에 YouTube 링크를 넣으면 플레이어가 아니라 링크로 저장된다. 운영 DB 실측:

```html
-- i_board.idx = 786 (https://aphen.net/243/786)
<a href="https://www.youtube.com/embed/1YOsGYdd3K8?showinfo=0">https://www.youtube.com/embed/1YOsGYdd3K8?showinfo=0</a><p></p>
```

원인은 `fe/src/components/console/form/Editor.tsx`에 `modules.clipboard` 설정과 `toolbar.handlers.video` 오버라이드가 **둘 다 없다**는 것이다. Quill 2의 기본 클립보드 매처가 URL을 `<a>`로 자동 링크만 한다.

YouTube 게시물 61건의 분포가 이를 뒷받침한다:

| `b_content_type` | 건수 | iframe 포함 |
|---|---:|---:|
| `html` (HTML 탭에 임베드 코드 직접 붙여넣기) | 51 | **50** |
| `editor` (Quill) | 10 | **0** |

**Quill로는 임베드가 애초에 불가능**했고 관리자는 HTML 탭으로 우회해 왔다. 786은 우회하지 않은 쪽이다.

**소비자는 1곳**이므로 공용 선행 단위 분리는 불필요하다. `Editor.tsx`(Quill)를 쓰는 나머지 5개 콘솔 폼(팝업·배너·카테고리·유지보수·정책)은 **이번 범위 밖**이며 Quill을 그대로 유지한다.

## 2. 원본 실측

| 항목 | 값 |
|---|---|
| 경로 | `fe/src/components/editor`, `fe/src/components/blocks/editor-x` |
| 규모 | **124파일 · 31,820줄** (`analyze-scope [1]`) |
| 지배적 외부 의존 | `lexical` 84 · `@lexical/react` 82 · `lucide-react` 44 · `@lexical/utils` 18 · `@lexical/selection` 18 (`[3]`) |
| 원본 소비처 | **9곳** (콘솔 4 + 사용자 4 + `EditorWithHtml` 1) — 실사용으로 검증된 API |
| 저장·전송 포맷 | **HTML 문자열** — `$generateNodesFromDOM` ↔ `$generateHtmlFromNodes` (`blocks/editor-x/editor.tsx:3,125,175`) |
| 런타임 | Next `^16.1.1` · React `^19.0.0` · TS 5.3.3 |

**포맷이 HTML in / HTML out인 것이 이 이관의 핵심 전제다.** 대상의 기존 259건이 그대로 열린다 — 데이터 마이그레이션 없음.

## 3. 차이 지도 ⚠️ 이 문서의 본체

> **2026-08-17 정정**: 착수 시 실측한 결과 `probe-conventions.sh`의 "대상은 직접 변수" 판정은 **오탐**이었다.
> 두 프로젝트의 `globals.css` CSS 변수 값이 **완전히 동일**하고(diff 무차이), tailwind에서도
> `border`·`input`·`ring`·`muted`·`accent`·`secondary`·`destructive`·`popover`·`card`를 모두 `hsl(var(--x))`로
> 매핑한다. 스크립트가 오탐한 이유는 `primary`만 리터럴 hex로 오버라이드돼 있기 때문인데
> **basic_solution도 똑같이 그렇다**(`#4F46E5` vs aphennet `#206B6E`).
> → 프리미티브는 **복사 후 경량 수정**이 가능하다. §3-1·§7-1을 아래와 같이 하향 조정했다.

| 항목 | 원본 | 대상 | 조치 |
|---|---|---|---|
| shadcn 토큰 값 | `hsl(var(--x))`, 값 A | `hsl(var(--x))`, **값 A와 동일** | 차이 없음 — 복사 가능 |
| `primary` 리터럴 | `#4F46E5` (indigo) | `#206B6E` (teal) + `primary-2` | 조치 불요. 복사하면 대상의 teal이 자동 적용된다 |
| `primary-foreground` | tailwind에 키 없음 → **무효 유틸리티** | 동일하게 키 없음 (기존 `ui/tooltip.tsx:23`도 이미 사용 중) | 🟡 `text-primary-foreground`는 양쪽 모두 아무것도 만들지 않는다. 버튼 등에서 명시 색으로 대체 |
| React | `^19.0.0` | `18.2.0` | `@lexical/react` peer가 `react >=17.x`라 통과. 단 React 19 전용 패턴(`use()`, ref-as-prop) 혼입 여부를 파일별 확인 |
| Next | `^16.1.1` | `14.1.0` | 하향. `"use client"` 경계·`dynamic()` 사용부 확인 |
| 에디터 | Lexical 0.38.2 | `react-quill-new` 3.4.6 | 게시판만 교체, 나머지 5폼은 Quill 유지 → **두 에디터 공존** |
| 토스트 | `sonner` | 미설치 (`@radix-ui/react-toast`) | 기존 `toast`로 치환 |
| ui 프리미티브 | 20개 | **8개** | 12개 부족 (§3-1) |
| radix 패키지 | 17개 | 7개 | 부족분은 프리미티브와 함께 설치 |
| **공개 렌더 방식** | 읽기전용 Lexical `<Editor editable={false}>` (`user/board/PostDetail.tsx:336`) | `QuillContent`(Shadow DOM) + `dangerouslySetInnerHTML` 2분기 | **대상 방식 유지.** 원본 방식 채택 시 259건 전체 렌더가 바뀌어 위험 |

동일한 항목(Tailwind v3 `^3.4.17` · `tailwindcss-animate` `^1.0.7` · `@/* -> ./src/*` · `cn`이 `fe/src/lib/utils.ts` 파일 · zustand · react-query · react-hook-form + zod · lucide-react · TS 5.3.3)은 **차이가 없으므로 적지 않는다.**

### 3-1. 새로 만들어야 하는 프리미티브

원본 20개 − 대상 8개(`dialog` `popover` `scroll-area` `select` `switch` `toast` `toaster` `tooltip`):

```
accordion  button  button-group  checkbox  command  input
label      separator  tabs  textarea  toggle  toggle-group
```

(원본 `@/components/ui` 결합 **76건**이 이들에 몰려 있다)

**정정 후 방침**: 토큰 값이 동일하므로 **원본에서 복사 후 아래 2건만 수정**한다. 신규 작성은 불필요하다.

1. `text-primary-foreground` → 무효 유틸리티이므로 명시 색(`text-white`)으로 교체
2. radix 의존 패키지 설치 (`@radix-ui/react-*` 중 대상 미보유분)

⚠️ 대상이 이미 가진 8개(`dialog` `popover` `scroll-area` `select` `switch` `toast` `toaster` `tooltip`)는 **손대지 않는다.** 이미 통과한 대비·접근성 검증이 무효가 된다.

## 4. 판정과 근거

**혼합 (코어 이식 + 결합부 재작성)**

- 124파일·31,820줄이고 `@lexical/*` 13개 패키지 통합이 코드의 본체 → 재구현은 비현실적
- 다만 `[2]` 최대 파일 `emoji-list.ts`가 **16,602줄 = 전체의 52%**, `[5]` 주석 처리된 배선 18줄, `[6]` 죽은 파일 22개 → **약 74%는 가져오지 않는다**
- `[4]` 결합 82건 중 76건이 `@/components/ui` → 프리미티브 신규 작성으로 흡수. 나머지 6건(`@/registry/new-york-v4` 3 · `@/store/console` 1 · `@/constants/console` 1 · `@/components/console` 1)은 원본 전용이라 재작성

## 5. 가져올 것 / 버릴 것

### 가져온다

| 묶음 | 내용 |
|---|---|
| 셸·배선 | `blocks/editor-x/{editor.tsx, plugins.tsx, nodes.ts}` |
| **YouTube** | `editor/nodes/embeds/youtube-node.tsx`, `editor/plugins/embeds/{youtube-plugin,auto-embed-plugin}.tsx`, `editor/plugins/picker/embeds-picker-plugin.tsx`, `editor/plugins/toolbar/block-insert/insert-embeds.tsx` |
| 툴바 | `editor/plugins/toolbar/**` 중 `plugins.tsx:120-158`이 실제로 렌더하는 것만 |
| 본문 기능 | `editor/plugins/{images-plugin, layout-plugin, table-plugin}.tsx`, `editor/plugins/{floating-text-format,floating-link-editor}-plugin.tsx` |
| 노드 | `editor/nodes/image-node.tsx`, `editor/editor-ui/{image-component,image-resizer}.tsx` |
| 테마 | `editor/themes/editor-theme.{ts,css}` |
| 변환기 | `editor/transformers/{markdown-hr,markdown-table,markdown-image}-transformer.ts` |
| 공용 | `editor/shared/**` 중 참조되는 것만, `editor/editor-hooks/**` |

### 버린다

| 대상 | 줄 수 | 이유 |
|---|---:|---|
| `editor/utils/emoji-list.ts` | 16,602 | 데이터 덩어리. 요구사항 무관 (`[2]` 전체의 52%) |
| `editor/plugins/autocomplete-plugin.tsx` | 2,539 | 게시판에 불필요 |
| `editor-ui/color-picker.tsx` | 1,759 | `input`·`popover`·`select`·`button` 결합 4건. §12-1에서 최종 판단 |
| `editor/plugins/mentions-plugin.tsx` | 707 | 멘션 미사용 |
| `editor/plugins/actions/**` (12파일) | ~900 | `plugins.tsx:24-34`에서 **이미 주석 처리된 죽은 배선** (`[5]`) |
| `editor/nodes/embeds/tweet-node.tsx` + `twitter-plugin.tsx` + `markdown-tweet-transformer.ts` | ~330 | 트위터 미사용 |
| `emoji-picker-plugin` + `emojis-plugin` + `markdown-emoji-transformer` | ~230 | 이모지 미사용 |
| 참조 0 파일 나머지 (`[6]` 22개 중 위와 겹치지 않는 것) | ~500 | 죽은 코드 |
| **합계** | **약 23,600 (전체의 ~74%)** | |

### 이 결정의 연쇄 효과

- 트위터를 버리면 `auto-embed-plugin.tsx:116`의 `EmbedConfigs`에서 `TwitterEmbedConfig`를 제거해야 한다
- 이모지·멘션·자동완성을 버리면 `blocks/editor-x/nodes.ts`의 노드 등록 목록과 `editor-theme.ts`의 대응 키를 함께 정리해야 한다
- `color-picker`를 버리면 툴바에서 글자색·배경색이 빠진다 → §12-1

## 6. 끊어야 할 결합

`analyze-scope [4]`에서 **원본 전용**으로 분류된 것만. (`@/components/ui` 76건은 §3-1이 흡수)

| 파일:줄 | 결합 대상 | 조치 |
|---|---|---|
| `editor-ui/image-component.tsx:34` | `@/registry/new-york-v4/editor/images/image-broken.svg` | 존재하지 않는 경로. 원본에서 **이미 주석 처리**돼 있으므로 상수로 대체 |
| (`[4]` 집계) `@/registry/new-york-v4` 나머지 2건 | 동일 | 동일 |
| `@/store/console` 1건 | 원본 콘솔 스토어 | 대상 스토어로 치환 또는 해당 파일 재작성 |
| `@/constants/console` 1건 | 원본 콘솔 상수 | 동일 |
| `@/components/console` 1건 | 원본 콘솔 컴포넌트 | 동일 |
| `sonner` (1건) | 미설치 패키지 | 대상 `toast`로 치환 |

## 7. 🔴 조용히 깨지는 것

빌드·타입검사가 **잡지 못하는** 것만.

| # | 증상 | 원인 | 방어 |
|---|---|---|---|
| 1 | ~~빌드 통과, 화면만 무색~~ → **오탐. 성립하지 않음** | 두 프로젝트 CSS 토큰 값이 동일함을 실측 확인 (§3 정정) | 복사 후 `text-primary-foreground`만 명시 색으로 교체 |
| 2 | 임베드는 되는데 **폭이 560px 고정** | `youtube-node.tsx:104-108`이 `width="560" height="315"`를 하드코딩. 이식만으로는 요구사항 2가 충족되지 않는다 | §8의 CSS 오버라이드를 정본으로. 기존 50건도 함께 해결됨 |
| 3 | `youtube.com/shorts/` 링크가 **임베드로 안 바뀜** | `auto-embed-plugin.tsx:65` 정규식이 `youtu.be/`·`v/`·`u/w/`·`embed/`·`watch?v=`·`&v=`만 매칭 | `shorts/` 분기 추가. 대상에 shorts 게시물 **6건**(idx 382~387) 존재 |
| 4 | 게시물의 **iframe이 통째로 사라짐** | `be/src/middleware/xssHook.js`의 `xss` 기본 화이트리스트가 `<iframe>` 제거 | 현재 적용처는 `be/src/models/config.js:76`뿐이고 `models/board.js`에는 미적용. **이 상태를 유지한다** |
| 5 | Lexical로 쓴 글의 **서식이 공개 화면에서 빠짐** | 대상 공개 렌더는 `QuillContent`가 Shadow DOM에 CDN `quill.snow.css`만 주입한다(`QuillContent.tsx:16-19`). Lexical 테마 클래스에 대응하는 CSS가 없다 | Lexical 익스포트가 시맨틱 태그+인라인 style만 쓰는지 실물 확인. 부족하면 `editor-theme.css`를 Shadow DOM에 함께 주입 |
| 6 | 갤러리 게시판에서 **썸네일이 빔** | `be/src/controllers/board.js:193-199,435-441`의 `extractFirstImage`가 `<img>`만 찾는다. 임베드 전용 글은 `first_image: null` | 이번 범위 밖 — §12-3 |
| 7 | 공개 화면 CSS를 **한쪽만 고쳐 절반이 안 고쳐짐** | 렌더 경로가 2개(`editor` 29건 / `html` 230건)인데 스타일 위치가 다르다 | §8의 표대로 **둘 다** 적용 |

## 8. 공개 계약

```ts
// fe/src/components/blocks/editor-x/editor.tsx
export function Editor(props: {
    htmlValue?: string;                     // HTML 문자열 입력
    onHtmlChange?: (html: string) => void;  // HTML 문자열 출력
    editable?: boolean;                     // 읽기 전용 렌더용 (기본 true)
}): JSX.Element
```

- **소비자가 기대하는 이름을 따른다.** `EditorWithHtml2.tsx`가 이미 `editorValue`/`onChangeEditorValue`를 넘기고 있으므로 그 자리에 `htmlValue`/`onHtmlChange`로 연결만 한다. 새 이름을 짓지 않는다
- 저장·전송 포맷: **HTML 문자열**. `b_contents` 컬럼(`TEXT('medium')`, 16MB) 그대로. DB 마이그레이션 없음
- `EditorWithHtml2`의 **`html` 분기와 탭 UI는 건드리지 않는다** — 기존 230건의 작성 경로다

### 비디오 크기 규칙 (요구사항 2)

```css
width: 100%;  max-width: 1024px;  aspect-ratio: 16 / 9;  height: auto;
```

인라인 `width`/`height` 속성을 이기도록 작성한다. 적용 위치 — **모두** 손봐야 한다:

| 경로 | 파일 | 현재 상태 |
|---|---|---|
| `editor` 타입 (29건) | `fe/src/components/common/common/QuillContent.tsx:25-32` | **Shadow DOM** — `globals.css`·Tailwind가 닿지 않는다. 이 파일의 `styleElem`에 직접 넣어야 한다 |
| `html` 타입 (230건) | `fe/src/components/user/board/PostDetail.tsx:138-142` | 라이트 DOM. **콘텐츠 스타일이 전혀 없다** — 래퍼 클래스 부여 후 `globals.css`에 규칙 추가 |
| 콘솔 미리보기 | `fe/src/components/console/board/post/PostDetail.tsx:401-404` | 동일 2분기 구조 |
| 작성 화면 | `editor/themes/editor-theme.css` | 없으면 에디터 안에서 300×150으로 보인다 |

## 9. 테스트 — 착수 전 확정 (최소 12건)

대상 프로젝트에 테스트 하네스가 **없다**(`fe/package.json` scripts: `dev`/`build`/`start`/`lint`). 하네스를 새로 세우는 것은 이번 범위 밖이므로 **수동 검증 체크리스트**로 대체하고, 각 항목의 판정 기준을 명시한다.

| 그룹 | 최소 | 방법 | 대상 |
|---|:--:|---|---|
| A. 기존 콘텐츠 회귀 | 4 | 브라우저 | `editor` 29건 표본 / `html` 탭 왕복 / iframe 포함 글 / Quill 유지 5폼 무영향 |
| B. YouTube 임베드 | 4 | 브라우저 | `watch?v=` · `youtu.be/` · `/embed/` · `/shorts/` |
| C. 크기 규칙 | 3 | 브라우저 | 넓은 화면 1024 상한 / ≤400px 100% + 가로 스크롤 없음 / **기존 `width="560"` 게시물** 오버라이드 |
| D. 빌드 | 1 | `npm run build` | 통과 + First Load JS를 §11과 비교 |

**변이 확인 필수** — 이 코드를 빼면 실패해야 한다:
- CSS 오버라이드를 제거하면 C-3(기존 560px 게시물)이 560px로 돌아가야 한다
- `shorts/` 분기를 제거하면 B-4가 링크로 남아야 한다

## 10. 구현 순서

| # | 단계 | 검증 |
|---|---|---|
| 1 | **기준선 확보** — `fe`에 의존성 설치 후 현재 상태 실측 | `npm install --legacy-peer-deps` → `npx tsc --noEmit` → `npm run build` (§11에 기록) |
| 2 | 미보유 프리미티브 12개를 **대상 토큰 규약으로 신규 작성** | 빌드 통과 + 각 프리미티브가 색을 가지는지 화면 확인 |
| 3 | `@lexical/*` 13개 패키지 설치 (0.38.2) | `npm run build` 통과 |
| 4 | 코어 이식 — §5 "버린다" 제외하고 복사 → §6 결합 치환 | `npx tsc --noEmit` |
| 5 | `shorts/` 정규식 보강 (§7-3) | B-4 |
| 6 | `EditorWithHtml2.tsx`의 **`editor` 분기만** Lexical로 교체 | A-1, A-2 |
| 7 | §8 CSS를 4곳 모두 적용 | C-1, C-2, C-3 |
| 8 | 빌드·수동 체크리스트 전체 | §9 A~D |
| 9 | 배포 (Jenkins `aphen` 잡이 1분 폴링으로 자동) → 운영 확인 | `ssh tmanager-prod 'docker logs --tail 100 aphennet_api_blue 2>&1 \| grep -i error'` |
| 10 | 이상 없으면 apnhi에 동일 적용 (별건) | — |

> 1단계에서 이미 깨져 있으면 이관 이전 문제다. 반드시 먼저 기록한다.

## 11. 기준선 (착수 전 실측)

2026-08-17 실측 (`fe/`, `npm install --legacy-peer-deps` 직후):

| 항목 | 값 | 명령 |
|---|---|---|
| 단위·통합 테스트 | **하네스 없음** (`fe/package.json` scripts: dev/build/start/lint) | — |
| 타입 검사 | **0 에러 (exit 0)** | `npx tsc --noEmit` |
| E2E | **없음** | — |
| 빌드 | **exit 0** — 단 아래 경고 1건 | `npm run build` |

⚠️ **기존 경고 (회귀 아님, 착수 전부터 존재)**
```
⚠ Failed to copy traced files for .next/server/app/(user)/(pages)/page.js
  ENOENT: copyfile '.next/server/app/(user)/(pages)/page_client-reference-manifest.js'
```
Next 14의 route group + `output: "standalone"` 알려진 이슈. **exit 0이라 빌드는 성공**이고 운영 배포도 정상이다(Jenkins `aphen` #2 SUCCESS). 이관 후 같은 경고가 보여도 회귀로 판정하지 말 것.

**번들 First Load JS — 이관 영향 라우트**

| 라우트 | Size | First Load JS |
|---|---:|---:|
| **λ `/console/board/post/[category]`** ← **교체 대상** | 5.65 kB | **346 kB** |
| λ `/[category]/[post_idx]` (공개 상세) | 172 B | 267 kB |
| ○ `/console/design/banner` (Quill 유지) | 11.2 kB | 310 kB |
| ○ `/console/menu/category` (Quill 유지) | 19.5 kB | 280 kB |
| ○ `/console/maintenance` (Quill 유지) | 14 kB | 263 kB |
| ○ `/console/setting/policy` (Quill 유지) | 6.71 kB | 221 kB |
| ○ `/console/design/popup` (Quill 유지) | 8.25 kB | 275 kB |
| shared by all | — | 84.6 kB |

Lexical 추가로 `/console/board/post/[category]`가 증가할 것으로 예상된다. **Quill 유지 5개 라우트는 변동이 없어야 한다** — 변하면 배럴 import가 새어 나간 것이다.

⚠️ 대상은 lockfile을 gitignore하고(`.gitignore:3-4`) Docker에서 `npm install --legacy-peer-deps`로 빌드한다(`fe/Dockerfile:20,48`). 로컬도 같은 명령을 써야 버전이 어긋나지 않는다.

## 12. 미결 — 구현 중 확인해 결론을 남길 것

| # | 항목 | 판단 시점 |
|---|---|---|
| 1 | `color-picker.tsx`(1,759줄)를 버릴지 이식할지. 버리면 툴바에서 글자색·배경색이 빠진다. 기존 게시물의 인라인 `style="color:..."`는 **읽기는 되지만 편집으로 재지정 불가**가 된다 | 4단계 |
| 2 | Lexical 도입 후 번들 증가폭이 허용 범위인지 (§11 대비) | 8단계 |
| 3 | 임베드 전용 글의 갤러리 썸네일 부재(§7-6) 처리 방침 | 별건 |
| 4 | Lexical 익스포트 HTML이 `QuillContent` Shadow DOM에서 서식을 유지하는지(§7-5). 부족하면 `editor-theme.css` 주입 | 6단계 |
| 5 | React 19 전용 패턴이 이식 대상 파일에 섞였는지 (§3) | 4단계 |

---

# 구현 결과 (2026-08-17)

## 실측 이관량

| 항목 | 계획 | 실제 |
|---|---|---|
| 이관 파일 | — | **89파일 · 10,067줄** |
| 원본 | 124파일 · 31,820줄 | 동일 |
| 버린 비율 | 약 74% | **약 68%** (`color-picker` 이식 결정으로 1,759줄 추가) |

의존 폐쇄를 스크립트로 계산해 실제 필요한 파일만 복사했다. 필요 프리미티브도 12개 → **9개**로 줄었다 (`accordion`·`checkbox`·`textarea` 불필요).

## 미결 해소

| # | 항목 | 결론 |
|---|---|---|
| 1 | `color-picker` 이식 여부 | **이식.** 추가 프리미티브가 필요 없고(이미 필요한 `input`·`button`·`popover`만 사용), 기존 Quill 툴바에도 `color`·`background`가 있어 버리면 기능 후퇴다 |
| 2 | 번들 증가폭 | **허용 범위.** `next/dynamic` 코드분할로 교체 라우트가 346 → **362 kB (+16 kB)**. Lexical 은 실제 렌더 시에만 로드된다 |
| 3 | 갤러리 썸네일 부재 | 미해결 — 범위 밖. `extractFirstImage`가 `<img>`만 찾는 문제는 그대로 |
| 4 | Lexical 익스포트 서식 유지 | **유지 확인.** `text-align`·`<strong>`·`<span style="color">`·`<ul><li>` 모두 시맨틱 태그 + 인라인 style 로 나온다. Lexical 이 붙이는 클래스(`leading-7`·`font-bold`)는 Tailwind 유틸리티라 Shadow DOM 에서 무효지만 장식용이라 영향 없다 |
| 5 | React 19 전용 패턴 | **없음.** 89파일 이식 후 `tsc --noEmit` 0 에러, `next build` exit 0 |

## 계획에 없던 발견 — 모두 조치함

| # | 발견 | 조치 |
|---|---|---|
| A | 🔴 **`importDOM`이 `data-lexical-youtube` 속성을 요구** → 기존 iframe 게시물 50건을 에디터로 열면 **비디오가 통째로 사라진다** | `src` 에서 id 를 추출해 함께 인식하도록 `importDOM`·`$convertYoutubeElement` 수정 |
| B | 🔴 운영 게시물에 `.../embed//LZhH9Dm15LY` **이중 슬래시** URL 실존 → 두 정규식 모두 실패 | 슬래시를 `\/+` / `\/*` 로 허용. 운영 URL **60건 전수 통과** 확인 |
| C | `EmbedsPickerPlugin({embed:"tweet"})` 잔존 → 트위터 제거 후 `find`가 undefined 반환해 **런타임 크래시** | 호출부·타입에서 tweet 제거 |
| D | 🔴 **`BannerForm.tsx:15`도 `EditorWithHtml2` 사용** (계획이 놓친 두 번째 소비자) → 배너까지 Lexical 로 바뀌고 번들 +219 kB | `engine?: "quill" \| "lexical"` prop 추가(기본 quill) + `next/dynamic` 코드분할. 배너는 Quill 유지, 번들 +14 kB(Lexical 아님, 청크 재그룹핑) |
| E | 기존 `<a>` 자동링크 게시물(786 등 10건)은 에디터로 열어도 **링크로 남는다** (Lexical 자동임베드는 붙여넣기 시점에만 동작) | `lib/youtube.ts`의 `embedBareYoutubeLinks()`로 **렌더 시점 보정**. DB 무수정. 링크 텍스트가 href 와 같을 때만 변환해 의도적 텍스트 링크는 보존 |
| F | 사용자단·관리자단 상세가 동일한 2분기를 **중복 구현** | `PostContent` 공통 컴포넌트로 통합. `QuillContent.tsx` 삭제(참조 0) |
| G | Next App Router 는 `_` 로 시작하는 폴더를 private 로 취급해 라우팅 제외 | 검증용 임시 페이지 이름 변경 후 삭제 |

## 단일 소스 원칙

크기 규칙과 URL 파싱이 여러 곳에 복제되지 않도록 정리했다:

- `components/common/common/postContentStyles.ts` → `POST_CONTENT_CSS` (Shadow DOM · 라이트 DOM 양쪽이 이 하나를 쓴다)
- `lib/youtube.ts` → `extractYoutubeId` · `youtubeEmbedSrc` · `embedBareYoutubeLinks` (에디터 노드와 렌더가 공유)
- 예외: `editor/themes/editor-theme.css` 의 `.editor-youtube-iframe` 은 CSS 파일이라 TS 상수를 못 읽는다. 주석으로 상호 참조를 남겼다

## 검증 결과

**요구사항 1 — YouTube 링크 임베드**

붙여넣기 후 "Embed Youtube Video" 제안 → 클릭 시 iframe 생성. 4형태 모두 통과:

| URL 형태 | 결과 |
|---|---|
| `watch?v=` | `youtube-nocookie/embed/CGjSp9kr3TE` · 1024×576 |
| `youtu.be/` | `youtube-nocookie/embed/CGjSp9kr3TE` · 1024×576 |
| `shorts/` | `youtube-nocookie/embed/DWkYOVf-56Y` · 1024×576 |
| `embed/…?showinfo=0` | `youtube-nocookie/embed/1YOsGYdd3K8` · 1024×576 |

기존 콘텐츠 임포트: 373번 iframe → 인식(1024×576) · 이중슬래시 → 인식(1024×576) · 서식 본문 → 완전 보존 · 786번 `<a>` → 렌더 보정으로 플레이어.

`embedBareYoutubeLinks` 단위 검증 6/6: 786 변환 · 373 무변경 · **의도적 텍스트 링크 보존** · shorts 변환 · 비-YouTube 링크 보존 · 이중슬래시 변환.

**요구사항 2 — 크기**

실제 373번(`width="560" height="315"` 하드코딩) 및 786번 변환결과로 측정. 두 렌더 경로 동일:

| 뷰포트 | 결과 |
|---|---|
| 1600px | **1024×576** (상한 적용) |
| 1100px | **1024×576** (상한 적용) |
| 900px | 900×506 (가로 100%) |
| 390px | 390×219 (가로 100%) |

전 구간 16:9 유지, 가로 스크롤 없음, **인라인 `width`/`height` 속성을 CSS 가 이김**.

**빌드**: `tsc --noEmit` src 에러 0 · `next build` exit 0. 기존 경고(route group + standalone ENOENT)는 기준선과 동일하게 1건.

## 남은 수동 확인 (로그인 필요 — 제가 대신 못 함)

- 관리자 로그인 후 게시판 글쓰기에서 실제 저장 → 사용자 페이지 재생
- 이미지 삽입(`images-plugin`, dnd-kit 재정렬) 동작
- 표·레이아웃·링크 편집 등 툴바 기타 기능
- Quill 을 유지한 5개 폼(팝업·배너·카테고리·유지보수·정책) 회귀
