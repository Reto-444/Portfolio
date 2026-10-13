# DM. — Personal Portfolio

A personal portfolio website for a junior web developer, built with plain
HTML5, CSS3 and vanilla JavaScript. No frameworks, no build step, no
dependencies — the site opens directly in a browser and works on GitHub
Pages as-is.

## Features

- Editorial dark theme with a single acid-green accent
- Custom CSS design system based on variables
- Hand-built SVG "blueprint" illustration on the hero
- Scroll-reveal animations via `IntersectionObserver`
- Sticky header with active-section highlighting
- Full-screen mobile menu with keyboard support
- All content driven by a single `js/config.js` file
- Graceful empty states: missing links, images and contacts are hidden
  instead of rendering broken buttons
- Respects `prefers-reduced-motion`
- Semantic HTML, visible focus styles, accessible labels
- Responsive from 320 px to 1920 px

## Tech stack

- HTML5 (semantic markup)
- CSS3 (custom properties, Grid, Flexbox, `clamp()`)
- Vanilla JavaScript (ES5-compatible, no dependencies)
- Inline SVG (illustration and favicon)

## File structure

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── config.js      ← edit this file to change content
│   └── main.js        ← rendering logic, do not touch
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   └── images/
│       └── .gitkeep
└── README.md
```

## Local preview

No server or build step required.

1. Clone or download the repository.
2. Open `index.html` in any modern browser.

If you prefer a local server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploying to GitHub Pages

1. Create a repository on GitHub (for example `portfolio`).
2. Push the project files to the `main` branch.
3. In the repository go to **Settings → Pages**.
4. Under **Source**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`.
6. Save. The site will be available at
   `https://<username>.github.io/<repository>/`.

All asset paths are relative, so the site works from a subdirectory without
any changes.

## Editing content

Everything visitors see comes from `js/config.js`. You do not need to touch
`index.html`, `css/style.css` or `js/main.js` to update text.

### Basic information

```js
name:    "Даниил Мазуров",
brand:   "DM.",
role:    "Веб-разработчик",
eyebrow: "Начинающий специалист",
intro:   "Short intro shown on the hero screen.",
status:  ""
```

- `status` — a short line under the hero buttons. Leave `""` to hide it.

### Contacts

```js
contacts: [
  { type: "github",   label: "GitHub",   value: "Reto-444", url: "" },
  { type: "email",    label: "Email",    value: "",         url: "" },
  { type: "telegram", label: "Telegram", value: "",         url: "" }
]
```

- Fill in `url` to make the contact appear. Empty `url` hides it.
- For `type: "email"` you may leave `url` empty — it will be built from
  `value` as a `mailto:` link.
- The GitHub button in the header and hero uses the `github` entry. If
  `url` is empty, the button is hidden.

### About section

```js
aboutFacts: [
  { label: "Образование", value: "..." }
],
aboutText: [
  "First paragraph.",
  "Second paragraph with <strong>bold</strong> and <em>accent</em>."
]
```

- `aboutFacts` renders as a definition list.
- Each string in `aboutText` becomes a paragraph. `<strong>` and `<em>`
  are allowed; `<em>` is styled with the accent color.

### Adding projects

`projects` is an array. Start empty:

```js
projects: []
```

When you have a project, add an object:

```js
projects: [
  {
    title:       "Project name",
    description: "One or two sentences about what it does.",
    stack:       ["HTML5", "CSS3", "JavaScript"],
    image:       "assets/images/project-1.jpg",
    demo:        "",
    code:        ""
  }
]
```

| Field         | Required | Notes |
|---------------|----------|-------|
| `title`       | no       | Card heading. |
| `description` | no       | Short description. |
| `stack`       | no       | Array of technology names. |
| `image`       | no       | Preview image path. If empty or the file fails to load, an automatic placeholder with initials is shown. |
| `demo`        | no       | Live demo URL. Leave `""` to hide the button. |
| `code`        | no       | Repository URL. Leave `""` to hide the button. |

**Do not add placeholder or guessed URLs.** If a link does not exist yet,
leave the field as an empty string — the corresponding button will not
be rendered at all.

If `projects` is empty, the section shows a neutral "coming soon" block.

### Adding project images

1. Put the file into `assets/images/`.
2. Reference it in `config.js`:

```js
image: "assets/images/my-project.jpg"
```

Recommended aspect ratio is **16:10**. Images are cropped with
`object-fit: cover`.

### Skills

```js
skills: {
  "Frontend": ["HTML5", "CSS3", "JavaScript"],
  "Backend":  ["PHP", "SQL"]
}
```

Each key becomes a group card, each array item becomes a line in the list.

### Process

```js
process: [
  { title: "Step name", text: "What happens at this step." }
]
```

Items render in the order they appear in the array.

## Design system

All colors, fonts, spacing and easing values are CSS custom properties
at the top of `css/style.css`:

```css
:root {
  --bg:     #0A0A0B;
  --fg:     #F2F2EE;
  --accent: #C8F53C;
  ...
}
```

Changing `--accent` updates every accent element at once.

## Accessibility notes

- Skip link to the main content.
- Visible focus outline on all interactive elements.
- `aria-expanded` / `aria-controls` on the mobile menu toggle.
- Escape closes the mobile menu and returns focus to the toggle.
- Decorative SVG is marked `aria-hidden`.
- Motion is disabled when `prefers-reduced-motion: reduce` is set.

## Browser support

Uses `IntersectionObserver`, CSS custom properties, Grid, `clamp()` and
`aspect-ratio` — all supported in modern evergreen browsers.

## License

Personal project. Content and design belong to the author.