# Component Patterns

## Cards

### `.card`
General content container. **Do not override its padding.**
```
p-6 bg-white rounded-lg shadow-even
```
Used for: displaying content (calendar event popup, attendee list, etc.)

### `.form-card`
Form and modal container. Already has `flex flex-col gap-4` built in — do not add it again.
```
flex flex-col gap-4 w-full p-3 bg-white rounded-lg shadow-even
```
Used for: all modals (EventForm, EditEventForm, delete confirm), AttendeeForm.

### `EventCard`
Fixed height card with image at top, content below.
```
shadow-even h-80 w-full bg-white rounded-lg overflow-hidden
hover:scale-[1.02] transition-all duration-300
```
- Image: `w-full h-36 object-cover` — fallback: `bg-violet-50` with `<CalendarDays size={60} className="text-violet-300" />`
- Content wrapper: `p-5`
- Title: `text-subtitle mb-2 line-clamp-2 md:line-clamp-1`
- Description: `text-body mt-3 line-clamp-2`

---

## Modals

**Always use this exact pattern:**
```jsx
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
  <div ref={modalRef} className="form-card w-full max-w-[size]">
    <h3 className="form-heading">Title</h3>
    {content}
  </div>
</div>
```

- Overlay: `fixed inset-0 z-50 bg-black/40`
- Close: `useClickOutside(isOpen, onClose)` — attach `ref` to the card div
- Sizes: `max-w-sm` (confirm dialogs), `max-w-lg` (medium), `max-w-2xl max-h-[90vh]` (large forms)
- Large forms need `overflow-y-auto` on the inner form element
- Conditional render: `{isOpen && (...)}` — not opacity/max-h toggling

---

## Forms

**Field group structure:**
```jsx
<div className="flex flex-col gap-2">
  <label htmlFor="id" className="form-label">
    Label <span className="text-red-500">*</span>
  </label>
  <input id="id" className="form-input" />
  <p className="text-xs text-zinc-400">Optional helper text</p>
</div>
```

**Submit button row:**
```jsx
<div className="flex justify-between md:justify-start gap-3 mt-2">
  <button type="submit" className="btn-primary flex items-center gap-2">
    <Icon size={16} /> Save
  </button>
  <button type="button" className="btn-secondary flex items-center gap-2">
    <X size={16} /> Cancel
  </button>
</div>
```

**State pattern:**
```ts
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
// Flow: validate → setLoading(true) → setError("") → fetch → catch setError(...) → finally setLoading(false) → router.refresh()
```

Error display: `{error && <p className="text-xs text-red-500">{error}</p>}`

This is the single pattern for all validation and error messages — `text-xs text-red-500`. Always clear the error on a new submission attempt with `setError("")`.

**File input:**
```jsx
<label htmlFor="file" className="border border-dashed rounded-lg px-4 py-2 text-sm cursor-pointer border-zinc-300 text-zinc-500 hover:border-violet-400 hover:text-violet-600">
  Choose file...
</label>
<input id="file" type="file" className="hidden" />
```
Selected state: `border-violet-400 text-violet-600`

---

## Pills / Badges

Standard pill — icon + text:
```jsx
<span className="bg-violet-100 text-violet-700 text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1 max-w-full truncate">
  <Icon size={12} />
  Text
</span>
```

For `<time>` elements use the same classes with `<time>` tag instead of `<span>`.

Glass variant (on dark/image backgrounds):
```
bg-white/20 backdrop-blur-sm text-white
```

---

## Buttons

| Class | Usage |
|---|---|
| `.btn-primary` | Main actions |
| `.btn-secondary` | Cancel, neutral |
| `.btn-danger` | Delete, destructive |
| `.btn-outline-violet` | Tertiary (Manage, filters) |

Compact size override (e.g. calendar nav): `py-1! px-1.5! md:py-1.5! md:px-2.5!`

Icon buttons always: `flex items-center gap-2`

---

## Fetch

Always use a leading slash:
```ts
fetch("/api/events", { ... })
fetch("/api/assistant", { ... })
```

Request body uses snake_case field names: `event_date`, `event_location`, `image_url`, etc.

---

## Loading / Spinner

Full-screen spinner:
```jsx
{loading && <Spinner />}
```
Place inside the modal/form container, not the overlay.

---

## AI Assistant Button (in forms)

```jsx
<div className="flex items-center gap-2">
  <label className="form-label">Field Name</label>
  <button type="button" onClick={toggle} className="cursor-pointer shadow-even border border-violet-200 rounded-full">
    <Image src="/AI-assistant.svg" alt="Aria AI" width={28} height={28} />
  </button>
</div>
```
`<MiniAssistant>` renders below the input, not the label.

---

## Text Truncation

| Pattern | Class | When to use |
|---|---|---|
| `truncate` | 1 line, adds `...` | Pills, badges, single-line labels |
| `line-clamp-2` | 2 lines, adds `...` | Descriptions in cards/popups |
| `line-clamp-2 md:line-clamp-1` | 2 lines on mobile, 1 on desktop | Event names in cards |

**Rules:**
- Pills always use `truncate` — they must never wrap
- Card titles: `line-clamp-2 md:line-clamp-1`
- Card descriptions: `line-clamp-2`
- Detail pages: no clamping — let text wrap naturally
- In flex rows, add `min-w-0` to the content div or truncation won't work
