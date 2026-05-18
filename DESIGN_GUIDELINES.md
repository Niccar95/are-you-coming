# Design Guidelines

## Font

**Plus Jakarta Sans** — set via `--font-plus-jakarta`. Applied globally to all elements including buttons, inputs, textareas.

---

## Typography

| Class            | Style                                                          | Usage                        |
| ---------------- | -------------------------------------------------------------- | ---------------------------- |
| `.text-title`    | `text-xl font-bold text-zinc-700` + `border-l-4 border-violet-500 pl-3 tracking-wide` | Page/section headings |
| `.text-subtitle` | `text-lg font-semibold text-zinc-700 dark:text-white tracking-wide` | Card titles, event names |
| `.text-body`     | `text-sm text-zinc-700 dark:text-zinc-300`                     | Paragraphs, descriptions     |
| `.text-meta`     | `text-sm text-zinc-500 dark:text-zinc-400`                     | Dates, secondary info        |
| `.text-subtle`   | `text-xs text-zinc-500 dark:text-zinc-400`                     | Hints, labels, tiny details  |

Text truncation: `truncate` (single line), `line-clamp-1` / `line-clamp-2` (multiline).

---

## Colors

| Role           | Value              | Usage                                         |
| -------------- | ------------------ | --------------------------------------------- |
| Primary        | `violet-500/600`   | Buttons, borders, active states               |
| Soft accent    | `violet-50/100`    | Backgrounds, pill badges, hover fills         |
| Text accent    | `violet-700`       | Pill text, active nav links                   |
| Neutral bg     | `zinc-50/100`      | Page backgrounds, disabled/empty states       |
| Borders        | `zinc-200/300`     | Cards, inputs, dividers                       |
| Text dark      | `zinc-700/800`     | Headings and body text                        |
| Text muted     | `zinc-500`         | Metadata, placeholders                        |
| Danger         | `red-500/600`      | Delete buttons                                |
| Overlay        | `bg-black/40`      | Modal backdrop. `bg-black/60` for heavier overlay |

---

## Buttons

| Class                 | Usage                                  |
| --------------------- | -------------------------------------- |
| `.btn-primary`        | Main actions (Save, Submit)            |
| `.btn-secondary`      | Cancel, neutral actions                |
| `.btn-danger`         | Destructive actions (Delete)           |
| `.btn-outline-violet` | Tertiary actions (Manage, filters)     |

Size overrides use `!` suffix: `py-1! px-1.5! md:py-1.5! md:px-2.5!`

---

## Cards & Surfaces

| Class          | Usage                                                 |
| -------------- | ----------------------------------------------------- |
| `.card`        | Content cards — `p-6 bg-white rounded-lg`            |
| `.form-card`   | Form modals — `p-3 bg-white rounded-lg`              |
| `.shadow-even` | Applied to all cards — `box-shadow: 0 0 15px rgba(0,0,0,0.1)` |

All cards: white background, `rounded-lg`, `shadow-even`. Dark mode: `dark:bg-zinc-900`.

Accent card variant: `border-l-4 border-violet-500` (e.g. calendar selected event).

---

## Forms

| Class            | Usage              |
| ---------------- | ------------------ |
| `.form-input`    | Text inputs        |
| `.form-textarea` | Textareas          |
| `.form-label`    | Input labels       |
| `.form-heading`  | Modal/form titles  |

**Field structure:**
```
flex flex-col gap-2
  label.form-label  (+ <span class="text-red-500">*</span> for required)
  input.form-input
  p.text-xs.text-zinc-400  (optional helper text)
```

Error messages: `text-xs text-red-500`
Success messages: `flex items-center gap-2 text-sm text-violet-600` + icon

**File input pattern:** Hidden `<input type="file">` with a styled `<label>` using `border border-dashed rounded-lg`. Active state: `border-violet-400 text-violet-600`.

**Spotify section:** Wrapped in `flex flex-col gap-4 border border-zinc-200 rounded-lg p-4`.

---

## Pills / Badges

Used for dates, times, locations throughout:

```html
<span class="bg-violet-100 text-violet-700 text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1">
  <Icon size={12} />
  Label
</span>
```

White/glass variant (on dark image backgrounds): `bg-white/20 backdrop-blur-sm text-white`

---

## Modals / Overlays

**Overlay:** `fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4`

**Modal container:** `.form-card w-full max-w-2xl max-h-[90vh]`

**Scrollable form body:** `flex flex-col gap-4 p-3 overflow-y-auto`

**Dismissal:** `useClickOutside` hook + X button with `.btn-secondary`.

---

## Show/Hide Animation Pattern

Used for forms, drawers, and collapsible sections:

```
opacity-0/100 + max-h-0/max-h-screen + overflow-hidden + pointer-events-none + transition-all duration-300
```

Staggered children: `style={{ transitionDelay: \`${index * 100}ms\` }}`

---

## Layout

- **Max width:** `max-w-3xl` (event pages, dashboard), `max-w-4xl` (calendar)
- **Sidebar offset:** `md:ml-56` / `md:pl-56` for desktop sidebar
- **Navbar offset:** `pt-14` on mobile (top bar height)
- **Section gaps:** `gap-8` between major sections, `gap-12` for page-level spacing
- **Responsive breakpoint:** Single `md:` breakpoint — mobile first

---

## Navigation

**Desktop sidebar:** `fixed top-0 left-0 h-screen w-56 bg-white border-r border-zinc-200 z-50`

Nav link: `flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-violet-600 hover:bg-violet-50 px-3 py-2 rounded-md transition-colors`

**Mobile top bar:** `fixed top-0 left-0 right-0 h-14 bg-white border-b border-zinc-200 z-50`

**Mobile slide menu:** `fixed top-14 bottom-0 w-[65%] bg-white border-r border-zinc-200 shadow-2xl`
Slide animation: `${open ? "left-0 opacity-100" : "-left-1/2 opacity-0 pointer-events-none"} transition-all duration-300`

---

## Images

- Always use Next.js `<Image>` component
- Responsive: `width={0} height={0} sizes="..."` with explicit class dimensions
- Fit: `object-cover` for all event images
- **No-image fallback:** `CalendarDays` icon centered in `bg-violet-50 rounded-lg`

---

## Icons

Lucide React icons only. Sizing conventions:
- Inline / buttons: `size={16}`
- Medium: `size={18}` / `size={20}`
- Featured / empty states: `size={40}`, `size={60}`, `size={70}`

---

## Grids

| Pattern                                        | Usage                  |
| ---------------------------------------------- | ---------------------- |
| `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6` | Event card grids |
| `grid grid-cols-7`                             | Calendar               |
| `grid grid-cols-4 md:flex gap-3`              | Countdown              |
| `flex gap-4 overflow-x-auto scrollbar-hide`   | Horizontal scroll list |

Horizontal scroll children: `w-[300px] shrink-0`

---

## Sort Controls

Toggle button group pattern:
```
flex rounded-md overflow-hidden border border-zinc-200
  button: px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer
  Active: bg-violet-600 text-white
  Inactive: text-zinc-600 hover:bg-zinc-50
  Divider: border-l border-zinc-200
```

---

## Animations

| Class                    | Usage                                      |
| ------------------------ | ------------------------------------------ |
| `.animate-fade-in`       | Simple fade in (0.3s)                      |
| `.animate-fade-in-up`    | Fade in + slide up (1s, forwards)          |
| `.animation-delay-300`   | 300ms delay                                |
| `.animation-delay-600`   | 600ms delay                                |
| `animate-pulse`          | Loading dots, expired countdown            |

Loading dots: three `w-2 h-2 rounded-full bg-zinc-400 animate-pulse` with inline `[animation-delay:200ms]` / `[animation-delay:400ms]`.

Hover scale on cards: `hover:scale-[1.02] transition-all duration-300`

---

## Countdown

```
.countdown-wrapper  — grid-cols-4 mobile, flex desktop
.countdown-box      — violet gradient bg (violet-400 → violet-600), rounded-lg, p-3
.countdown-number   — text-3xl font-bold text-white
.countdown-label    — text-xs uppercase text-violet-100 font-semibold
.countdown-expired  — text-3xl font-bold text-violet-500 animate-pulse
```

---

## Dark Mode

Supported via Tailwind `dark:` variants. Applied to all form elements, cards, and text:
- Backgrounds: `dark:bg-zinc-900` (cards), `dark:bg-zinc-800` (inputs)
- Text: `dark:text-white`, `dark:text-zinc-300`, `dark:text-zinc-400`
- Borders: `dark:border-zinc-700`

---

## Z-index

| Level    | Value    | Used for                  |
| -------- | -------- | ------------------------- |
| Modals   | `z-50`   | Overlays, navbar, drawers |
| Spinner  | `z-9999` | Full-screen loading       |

---

## AI Assistant UI

**Chat bubbles:**
- User: `bg-violet-100 self-start text-sm text-zinc-700 max-w-[80%] rounded-lg p-3`
- Assistant: `bg-zinc-100 self-end text-sm text-zinc-700 max-w-[80%] rounded-lg p-3`

**Floating button:** `fixed right-4 bottom-4 md:right-10 md:bottom-10`

**Chat window (desktop):** `md:bottom-30 md:right-10 md:w-[400px]`
