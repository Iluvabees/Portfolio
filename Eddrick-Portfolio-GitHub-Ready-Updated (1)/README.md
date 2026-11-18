# Eddrick — Portfolio Website

A personal portfolio showcasing software projects, UX work, selected experience, and technical tools. Built with plain HTML, CSS, and JavaScript, with no build step.

## Published pages

- `/` — responsive portfolio and project case studies (hash routes such as `#/project/motivnation`)
- `/motivnation-demo/` — **MotivNation archived interactive demo** (browser-local sample profiles and progress)

The demo is **not** the original production backend. It does not use Supabase, authentication, real accounts, or a server database. Visitors' changes remain in their own browsers; resetting sample data returns it to the default state.

## Publish using GitHub Pages

1. Create a **public** GitHub repository, either named `portfolio` (URL `https://iluvabees.github.io/portfolio/`) or `iluvabees.github.io` (URL `https://iluvabees.github.io/`). **The second option gives you the cleanest personal address.**
2. Extract the ZIP first, then upload **the contents of the extracted folder to the repository root**; `index.html`, `css/`, `js/`, `assets/`, and `motivnation-demo/` must be at the top level.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, branch `main`, folder `/(root)`, then **Save**.
5. When GitHub shows your site URL, test `/`, the project case studies, and `/motivnation-demo/`.

The `.nojekyll` file tells GitHub to serve the static files directly. All asset paths are **relative**, so the site works at both a root domain and a project subpath.

## Updating the content

- Open [`js/site-data.js`](js/site-data.js) for projects, links, dates, tools, milestones, photographs, and sections.
- To add a portrait: place it in `assets/photos/` and set `personal.portrait: 'assets/photos/portrait.webp'`.
- To add event photographs: set each entry's `image: 'assets/photos/filename.webp'` in `moments`. Only entries with images appear as photo cards; empty entries combine into one tasteful **Coming Soon** teaser.
- If original screenshots arrive for the usability project, set the project's `image` path. It will replace the existing labeled illustrative concept.
- Hide an entire section using `settings.sections.<sectionName>: false`, or a single entry with `enabled: false`.
- Draft-only guidance is already off (`showDraftNotes: false`).
- The public GitHub profile link is set in `personal.links.github`. Add a LinkedIn URL or a privacy-reviewed résumé later if desired (the `.gitignore` currently excludes PDF files by default for privacy).

**Privacy / safety**: never commit `.env` files, API tokens, Supabase keys, raw databases, sensitive user data, or the original CV containing private contact details. The package contains none of those items.

## Quick local test

From the folder containing `index.html`, run:

```sh
python3 -m http.server 8000
```

Visit `http://localhost:8000` and `http://localhost:8000/motivnation-demo/`.

## License / attribution

Personal content, photographs, project screenshots, and branding belong to their respective creators. The materials are provided as a portfolio, not as a reusable software template.


## Certificates & Speaking Highlights (November 2026 update)

The new **Highlights** navigation item leads to the Speaking & Learning section. It includes three original certificates, distinguishing between **Presenter**, **Moderator**, and **Participant** roles. The original certificates appear in `assets/certificates/`; the moderation certificate also has a PDF original.

Edit `js/site-data.js` to manage the `certificates` array:

- Change `title`, `role`, `date` or `description` to update an entry.
- Use `image` for the thumbnail and `file` for the larger original/certificate PDF.
- Set `enabled: false` to hide an individual card. If every card is disabled, the Highlights navigation item also disappears.
- Set `settings.sections.certificates: false` to hide the entire section without deleting its data.

The original certificate artwork is displayed intact, without altering the names, recognitions, dates, or issuer details. The thumbnails are optimized for the web, while the linked original PDF remains available.

## Bangkok Rail Explorer (2026) and LUMEN visual cleanup

- `Bangkok Traffic Assistant` was **replaced** by the ICT324 `Bangkok Rail Explorer` case study in `js/site-data.js`. The Rail Explorer's live site and GitHub repository are linked directly. The portfolio labels the map as a demonstration and the validation results as preliminary rather than making unsupported live-data claims.
- `assets/photos/bangkok-rail-overview.webp`, `bangkok-rail-data-pipeline.webp`, and `bangkok-rail-model-results.webp` are **editorial graphics based on repository data**, not actual website screenshots. Replace these with captures from your live site later if desired.
- LUMEN's three avatar images are no longer used. Its cover and gallery now show original avatar-free help/FAQ and smartwatch UI designs from the submitted report. The original archive images remain in `assets/photos/` but are not displayed.
- Edit the new project's `enabled`, `links`, `screenshots`, and other fields in `js/site-data.js` to reorganize or hide it at any time.
