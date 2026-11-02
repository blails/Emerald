# Emerald Website

A responsive, static landing page for Emerald, designed to work on GitHub Pages. It uses plain HTML, CSS and JavaScript — no build step, framework, package manager or server required.

## Preview locally

Open `index.html` in a browser. For a local server, run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish on GitHub Pages

### Recommended clean URL

To publish at `https://emeralddiscordbot.github.io/`, the repository needs to be named exactly:

```text
emeralddiscordbot.github.io
```

Create that repository under the `emeralddiscordbot` GitHub account, upload the **contents** of this folder to the repository root, then open **Settings → Pages** and choose **Deploy from a branch → main → /(root)**.

If you keep the existing repository named `Emerald`, the project URL will remain `https://emeralddiscordbot.github.io/Emerald/` (unless you rename the repository).

## Before publishing

1. Confirm the bot invite URL and the support invite in `index.html`.
2. Confirm each command and Premium perk shown in the command explorer against the current bot build. The explorer is intentionally labelled as a selection; `/help` remains the source for the full live list.
3. Confirm the Premium feature descriptions reflect the current offer.
4. Update the Open Graph image URL in `index.html` if you choose a different final domain or repository path.

## Main files

- `index.html` — page content and sections
- `styles.css` — visual design and responsive layouts
- `script.js` — mobile menu and searchable command explorer
- `assets/` — Emerald mark, favicon and social-sharing cover

## Editing links

Search `index.html` for `discord.com/oauth2/authorize` to change the invite URL and `discord.gg/25kPTjhRpZ` to change the support invite.

The invite link currently uses the same permissions value as the public Emerald invite link. Review the permissions requested in Discord before promoting it.
