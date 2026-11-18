# @zerikb/icons

A React icon library with over 2,300 icons. Every icon is a typed, tree-shakeable component that follows your text color by default.

The set includes icons from [Lucide](https://lucide.dev), used under its license (see `THIRD_PARTY_NOTICES.md`). Five icons (`clock`, `layers`, `message`, `send` and `user`) are this library's own designs. Where Lucide has an icon of the same name, this library's version is the one included.

## Install

```bash
npm install @zerikb/icons
```

React 17 or newer is required (it's a peer dependency).

## Usage

```tsx
import { ArrowLeftIcon, SendIcon } from "@zerikb/icons";

export function Example() {
  return (
    <button>
      <ArrowLeftIcon /> Back
    </button>
  );
}
```

Bundlers drop every icon you don't import, so the size of the set doesn't affect your app.

## Finding icons

Component names are the icon name in PascalCase plus `Icon`: `arrow-left` becomes `ArrowLeftIcon`, and `chevron-down` becomes `ChevronDownIcon`. Browse names on [lucide.dev](https://lucide.dev), or type `import { Arr` in your editor and let autocomplete list them.

Names follow Lucide 1.73.0. An icon added or renamed in a later Lucide release may not be here yet.

## Props

| Prop    | Type               | Default          | Description                                    |
| ------- | ------------------ | ---------------- | ---------------------------------------------- |
| `size`  | `number \| string` | `"1em"`          | Width and height. `1em` scales with font size. |
| `color` | `string`           | `"currentColor"` | Any CSS color. Defaults to the text color.     |

Every other SVG attribute (`className`, `onClick`, `aria-label`, and so on) is passed to the `<svg>` element, and `ref` points at it.

```tsx
<ArrowLeftIcon size={32} color="#0139F6" strokeWidth={1.5} />
```

`strokeWidth` applies to the outline icons. This library's own filled icons ignore it.

## Accessibility

Icons don't set any accessibility attributes. For a decorative icon, add `aria-hidden="true"`. For an icon that carries meaning on its own, add `role="img"` and an `aria-label`.

## License

MIT. Icons derived from Lucide are covered by Lucide's license, included in `THIRD_PARTY_NOTICES.md`.