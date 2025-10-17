

# Sticky Shadcn Tabs


Sticky Shadcn Tabs is a modern, fully customizable sticky tabs component for React, built on top of [Radix UI Tabs](https://www.radix-ui.com/docs/primitives/components/tabs) and [Framer Motion](https://www.framer.com/motion/). Designed for seamless integration with Tailwind CSS, it allows smooth sticky behavior with blur, shadow, gradient fade, and full motion customization.

[@sorrybodikmain](https://www.github.com/sorrybodikmain)

[![CodeTime Badge](https://shields.jannchie.com/endpoint?style=social&color=222&url=https%3A%2F%2Fapi.codetime.dev%2Fv3%2Fusers%2Fshield%3Fuid%3D19050%26project%3Dsticky-shadcn-tabs)](https://codetime.dev)


---

## Features

- Sticky `TabsList` that sticks to the top of the viewport when scrolling.
- Optional backdrop blur with customizable intensity.
- Shadow and gradient fade effects for polished UI.
- Fully customizable animations via `motionVariants` and `motionConfig`.
- Supports offsets for fixed headers.
- Works with nested tabs.
- Tailwind-friendly, fully controllable via className props.

---

## Installation

```bash
npm install sticky-shadcn-tabs
# or
yarn add sticky-shadcn-tabs
# or
bun add sticky-shadcn-tabs
````

## Peer Dependencies:

* `react` >= 18
* `react-dom` >= 18
* `@radix-ui/react-tabs` >= 1.0.0
* `framer-motion` >= 10.0.0
* `tailwindcss` (optional, recommended for styling)

---

## Usage

```tsx
'use client'

import { StickyShadcnTabs } from 'sticky-shadcn-tabs'
import { TabsTrigger, TabsContent } from './BaseTabs'

export default function Example() {
  return (
    <StickyShadcnTabs
      defaultValue="overview"
      offset={64}
      enableBlur
      enableShadow
      enableFade
      blurAmount={16}
      gradientHeight={12}
      gradientColors="from-background/90 to-transparent"
      triggers={[
        <TabsTrigger key="overview" value="overview">Overview</TabsTrigger>,
        <TabsTrigger key="details" value="details">Details</TabsTrigger>,
        <TabsTrigger key="settings" value="settings">Settings</TabsTrigger>
      ]}
    >
      <TabsContent value="overview">
        <div className="h-[2000px] p-4">Overview content here...</div>
      </TabsContent>
      <TabsContent value="details">
        <div className="h-[2000px] p-4">Details content here...</div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="h-[2000px] p-4">Settings content here...</div>
      </TabsContent>
    </StickyShadcnTabs>
  )
}
```

---

## Props

| Prop                 | Type                              | Default                               | Description                                                            |
| -------------------- | --------------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| `triggers`           | `ReactNode[]`                     | required                          | Array of `TabsTrigger` elements to render inside the sticky tab list.  |
| `children`           | `ReactNode`                       | required                          | `TabsContent` components.                                              |
| `offset`             | `number`                          | `0`                                   | Vertical offset in pixels for sticky tabs (useful with fixed headers). |
| `enableBlur`         | `boolean`                         | `true`                                | Enable backdrop blur for sticky tabs.                                  |
| `blurAmount`         | `number`                          | `12`                                  | Amount of blur in pixels.                                              |
| `enableShadow`       | `boolean`                         | `true`                                | Add shadow to sticky tabs.                                             |
| `enableFade`         | `boolean`                         | `true`                                | Enable gradient fade below the sticky tabs.                            |
| `gradientHeight`     | `number`                          | `8`                                   | Height of the gradient fade in pixels.                                 |
| `gradientColors`     | `string`                          | `'from-background/80 to-transparent'` | Tailwind gradient classes for fade.                                    |
| `motionConfig`       | `MotionProps['transition']`       | `{ duration: 0.3, ease: 'easeOut' }`  | Default Framer Motion transition configuration.                        |
| `motionVariants`     | `{ container?, overlay?, fade? }` | `undefined`                           | Custom Framer Motion variants for container, overlay, or fade.         |
| `listClassName`      | `string`                          | `''`                                  | Additional Tailwind classes for `TabsList`.                            |
| `containerClassName` | `string`                          | `''`                                  | Tailwind classes for the sticky container.                             |
| `overlayClassName`   | `string`                          | `''`                                  | Tailwind classes for the offset overlay (top space).                   |
| `fadeClassName`      | `string`                          | `''`                                  | Tailwind classes for gradient fade.                                    |
| `style`              | `CSSProperties`                   | `undefined`                           | Inline styles for the sticky container.                                |

---

## Motion Customization

You can fully override the animations using `motionVariants`:

```ts
motionVariants={{
  container: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20 }
  },
  overlay: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 0.8 } }
}}
```

Or adjust global timing via `motionConfig`:

```ts
motionConfig={{ duration: 0.4, ease: 'easeInOut' }}
```

---

## Styling

The component is fully compatible with Tailwind CSS. You can style all elements via:

* `listClassName` → `TabsList`
* `containerClassName` → sticky container
* `overlayClassName` → top offset overlay
* `fadeClassName` → gradient fade

Example:

```tsx
<StickyShadcnTabs
  listClassName="bg-muted text-muted-foreground rounded-lg p-1"
  containerClassName="border border-gray-200 shadow-lg"
  overlayClassName="bg-gray-50"
  fadeClassName="bg-gradient-to-b from-gray-100 to-transparent"
/>
```

---

## Advanced Usage

Nested tabs work seamlessly. Sticky behavior is automatically scoped to each `StickyShadcnTabs` instance:

```tsx
<StickyShadcnTabs triggers={[...]} offset={64}>
  <TabsContent value="main">
    <StickyShadcnTabs triggers={[...]} offset={0}>
      <TabsContent value="nested">Nested content</TabsContent>
    </StickyShadcnTabs>
  </TabsContent>
</StickyShadcnTabs>
```

