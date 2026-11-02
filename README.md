# Emerald website — GitHub Pages

A responsive, static multi-section website for Emerald. It uses plain HTML, CSS and JavaScript; there is no build process, framework or package manager.

## Pages and assets

- `index.html` — Home, Features, Premium and Support sections.
- `docs.html` — Quick start, feature documentation, command explorer and FAQ.
- `privacy.html` — Emerald privacy policy draft based on the reviewed bot source.
- `commands.json` — 147 slash-command definitions extracted from the saved `Emerald_with_privacy.py` source file on 2 November 2026.
- `status.json` — public status feed read by the footer every 60 seconds.
- `assets/emerald-banner.webp` and `assets/emerald-logo.webp` — the images supplied for this website.
- `styles.css`, `script.js` — responsive styling and client-side interactions.

## Preview locally

Open `index.html` in a browser, or run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish on GitHub Pages

1. Extract this ZIP.
2. Upload the **contents** of the `emerald-website-v3` folder to the root of the repository used by GitHub Pages.
3. Open repository **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/(root)`, then save.

For the clean URL `https://emeralddiscordbot.github.io/`, the repository must be named `emeralddiscordbot.github.io` under the `emeralddiscordbot` account. If you keep a project repository named `Emerald`, the URL will normally include `/Emerald/`; use relative asset and page paths as supplied.

## Configure the footer bot status

GitHub Pages is static hosting. It cannot see whether the Python bot process on its host is running. The site therefore reads `status.json` and honestly displays **Status not connected** until you provide a trusted health feed.

The JSON format is:

```json
{
  "status": "operational",
  "message": "All systems operational",
  "last_updated": "2026-11-02T17:00:00Z"
}
```

Accepted statuses:

- `operational` (green)
- `degraded` (amber)
- `maintenance` (amber)
- `outage` (red)
- `unknown` (neutral)

For an actual live indicator, connect an uptime monitor or a small health-check service on the bot host that updates/publishes this file only after checking the running Emerald process. Do not mark the bot operational based only on the website being reachable. Keep any hosting/API credentials on the server or in GitHub Actions secrets; never put them in `script.js`, HTML or a public JSON file. The website refreshes the status every 60 seconds.

For a quick manual update, edit `status.json` and commit it when the bot's state changes. This is not automatic monitoring.

## Privacy policy — required before final publication

`privacy.html` is intentionally marked **Draft**. The saved policy draft still needs verified operator details before it can be treated as the final policy:

1. Operator's legal name or organisation.
2. A monitored privacy contact email.
3. Actual host name, storage region, backup provider and backup retention.
4. All other APIs/services that receive Emerald data, or verified confirmation that there are none.
5. A review of the deployed configuration and retention/deletion behaviour.

After these details are filled in and reviewed, set `EMERALD_PRIVACY_POLICY_URL` and `EMERALD_PRIVACY_CONTACT_EMAIL` in the bot host's environment, test `/privacy`, and add the final policy URL to the Discord Developer Portal. Do not leave the placeholders visible in a policy presented as final.

The policy describes the code's current deletion boundaries: `/privacy` processes Emerald-managed JSON/SQLite records and makes best-effort attempts to remove eligible bot-created messages/reactions/log entries. It cannot delete Discord platform records, user-authored messages, other people's copies or hosting-provider backups outside Emerald's control.

## Command reference notes

The command explorer was generated from the saved source available for this update. It is a code reference, not a live Discord command API. The deployed bot may use a different build or have commands that have not synced. Run `/help` in Discord for the commands actually available in a server.

**Source review note:** the saved source defines both a top-level `/owner` command and an `owner` command group containing `/owner dashboard` and `/owner analytics`, then attempts to register the group. Discord application-command trees cannot have a command and a group with the same root name. Resolve that duplicate in the bot source and sync commands before assuming all owner entries are available.

## Links used by this site

- Invite: https://discord.com/oauth2/authorize?client_id=1427340751880323172&permissions=8&integration_type=0&scope=bot
- Support server: https://discord.gg/25kPTjhRpZ
- Top.gg: https://top.gg/bot/1427340751880323172

The website support link uses the latest support invite previously provided. Check that it is still active before promoting the new site.
