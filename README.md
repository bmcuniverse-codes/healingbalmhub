# Healing Balm Hub website

A responsive, static landing page built with HTML, CSS and vanilla JavaScript. It is ready to deploy to Vercel or serve from any static web host.

## Run locally
Because `script.js` loads `links.json` with `fetch`, run the site through a local web server rather than opening `index.html` directly.

For example:
- VS Code: use the Live Server extension.
- Node: `npx serve .`
- Python: `python -m http.server 8000`

## Deploy to Vercel
1. Extract this ZIP.
2. Push the contents of this folder to a GitHub repository.
3. In Vercel, choose **Add New → Project** and import the repository.
4. Framework preset: **Other**.
5. Build command: leave blank.
6. Output directory: `.` (project root).
7. Deploy.

No build step or environment variables are required.

## Update links in one place
Edit `links.json`. The website reads all navigation and contact destinations from this file.

Example:
```json
{
  "home": "#home",
  "about": "#about",
  "services": "#services",
  "approach": "#approach",
  "contact": "#contact",
  "whatsapp": "https://wa.me/2348012345678",
  "phone": "tel:+2348033253757",
  "email": "hello@example.com"
}
```

### Important contact detail to verify
The flyer displays WhatsApp as **0818627212** (10 digits). A Nigerian mobile number normally needs 11 digits locally / 13 digits including country code for a WhatsApp `wa.me` URL. To avoid inventing a missing digit, the current WhatsApp button opens the general WhatsApp site. Replace `whatsapp` in `links.json` with the correct verified international URL, e.g. `https://wa.me/234XXXXXXXXXX`.

The flyer does not provide an email address, so the email contact row is shown as not yet configured. Add the real address in `links.json` when available. The phone call button uses the supplied number **08033253757**.

## Included
- `index.html` — all landing-page content and sections
- `styles.css` — responsive design and loading animation styling
- `script.js` — JSON link loading, navigation menu, loading screen and enquiry form
- `links.json` — central configuration for every navigation/contact destination
- `assets/original-flyer-reference.jpg` — original flyer for reference
