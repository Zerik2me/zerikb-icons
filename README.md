# @zerikb/icons

A small React icon library. Every icon is a tree-shakeable component with TypeScript types, and it follows your text color by default.

## Install

```bash
npm install @zerikb/icons
```

React 17 or newer is required (it's a peer dependency).

## Usage

```tsx
import { UserIcon, SendIcon } from "@zerikb/icons";

export function Example() {
  return (
    <button>
      <SendIcon /> Send
    </button>
  );
}
```

Only the icons you import end up in your bundle.

## Props

| Prop    | Type               | Default          | Description                                   |
| ------- | ------------------ | ---------------- | --------------------------------------------- |
| `size`  | `number \| string` | `"1em"`          | Width and height. `1em` scales with font size. |
| `color` | `string`           | `"currentColor"` | Any CSS color. Defaults to the text color.    |

Every other SVG attribute (`className`, `onClick`, `aria-label`, and so on) is passed straight to the `<svg>` element, and `ref` points at it.

```tsx
<UserIcon size={32} color="#0139F6" aria-label="Profile" />
```

## License

MIT