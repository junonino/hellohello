# hllohllo marketing

> **Local marketing for local businesses.**  
> Helping independent local businesses show up on Google Maps, look trustworthy online, and make it easy for customers to call.

---

## About the Site

This repository contains the static website for **hllohllo marketing** (`hllohllo.com`), built with vanilla HTML5, CSS3, and JavaScript, and designed for fast loading, zero dependencies, and hosting via GitHub Pages. Built-in technology stack powered by `hllo.you`.

---

## File Structure

```text
HelloHelloMarketing/
├── assets/
│   ├── hhlohllomktg-logo.png        # Main navbar logo (geometric sans + mascot)
│   ├── hllohllo-logo-footer.png     # Inverted footer logo
│   └── og-image.png                 # Social preview image (1200x630, <200 KB)
├── index.html                       # Main landing page
├── privacy.html                     # Privacy Policy page
├── terms.html                       # Terms of Service page
├── styles.css                       # Site stylesheet (palette, typography, layout)
├── main.js                          # Client-side interactions & hllo.you form wiring
├── CNAME                            # Custom domain pointer (hllohllo.com)
├── .gitignore                       # Git ignore configuration
└── README.md                        # Project documentation and setup guide
```

---

## How to Edit Site Copy and Placeholders

The site copy is structured in plain HTML with clear section IDs (`#hero`, `#services`, `#roadmap`, `#comparison`, `#growth-plan`, `#faq`).

### Open Placeholders to Fill

Before launching publicly, search for the following bracketed placeholders and replace them with your actual business information:

| Placeholder | Location | Description |
| :--- | :--- | :--- |
| `[YOUR AREA]` | `index.html` (Hero subtext) | The city or geographic region you serve |
| `[CITY AND SERVICE AREA]` | `index.html`, `privacy.html`, `terms.html` (Footer blurb) | Short service territory description |
| `[CITY, STATE]` | `index.html`, `privacy.html`, `terms.html` (Footer) | Public business location or office city |
| `[EMAIL]` / `[CONTACT EMAIL]` | Footers, form feedback, `privacy.html`, `terms.html` | Business email address |
| `[PHONE]` | Footers | Business telephone number |
| `[FORM_ENDPOINT_URL]` | `main.js` | Endpoint URL from Formspree (or similar form service) |
| `[ONE BUSINESS DAY]` | `main.js`, `index.html` (Modal message) | Promised audit turnaround time |
| `[30]` days | `index.html` (Promises section) | Notice period to cancel month-to-month service |
| `[NUMBER]` posts | `index.html` (Social media card) | Number of monthly social posts included |
| `[DATE]` | `privacy.html`, `terms.html` | Date of last policy review |
| `[STATE]` | `terms.html` | Governing state for legal terms |

---

## Setting Up the Audit Form

The free audit form in `#growth-plan` submits form data as JSON via `fetch` to a form service endpoint:

1. Create a form at [Formspree](https://formspree.io/) (or a similar form processing service).
2. Copy your form endpoint URL (e.g. `https://formspree.io/f/xyz...`).
3. Open `main.js` and update line 15:
   ```javascript
   const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
4. Test a submission. When submitted successfully, the form resets and displays the confirmation modal. If network issues occur or the endpoint is unreachable, an inline alert guides the visitor to email you directly.
5. The form includes an invisible honeypot field (`company-website`) that silently catches automated spam bots without requiring CAPTCHAs.

---

## Local Development

You can run this project locally using Python's built-in HTTP server:

```bash
# Start local server on port 3000
python3 -m http.server 3000
```
Open your browser and navigate to `http://localhost:3000`.

---

## Publishing to GitHub Pages

1. Push your changes to the `main` branch:
   ```bash
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment**, ensure **Source** is set to **Deploy from a branch**.
   - Select branch `main` and folder `/ (root)`, then click **Save**.
3. With the included `CNAME` file, configure your DNS provider with the proper `ALIAS` / `ANAME` or `A` records pointing to GitHub Pages.

---

## Legal Review Notice

> **Important:** The provided `privacy.html` and `terms.html` pages are plain-language drafts written to outline standard agency practices and data collection. A qualified legal professional should review both documents before the site begins collecting client data or conducting commercial transactions.
