# SafeTalk — private case-based support platform

SafeTalk expands the provided HTML landing page into a student / psychologist / admin application using **Express + Mongoose + MongoDB Atlas**. It can run locally or on Vercel. The original landing-page HTML is preserved in `docs/original-landing.html`.

> **Prototype — not suitable for real mental-health or crisis data yet.** The application needs a security review, privacy/consent and emergency-response workflows, email verification, moderation procedures, privacy-preserving audit retention, backups, and accessibility testing before real users share sensitive information. Google and private uploads are disabled until configured.

## Start locally (Windows PowerShell)

Prerequisites: Node.js 20+, MongoDB Atlas account and working URI.

```powershell
npm install
Copy-Item .env.example .env
```

Edit `.env` (do not commit it):

- `MONGODB_URI` — your **development** database, e.g. `...mongodb.net/safetalk_dev`
- `JWT_SECRET` — a strong random secret, minimum 32 characters
- `GOOGLE_CLIENT_ID` — optional, see below
- `ADMIN_ONE_ID`, `ADMIN_ONE_PASSWORD`, `ADMIN_TWO_ID`, `ADMIN_TWO_PASSWORD` — seed admin login credentials; choose distinct strong passwords (12+ chars). They are **never hard-coded in client code**.
- `BLOB_READ_WRITE_TOKEN` — optional, required for images/certificates

Generate a cryptographically random secret with:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Create the two admin accounts:

```powershell
npm run seed:admins
```

Start the app:

```powershell
npm run dev
```

Visit http://localhost:5000 (student landing), http://localhost:5000/psychologist.html (psychologist registration and login), http://localhost:5000/admin.html (admin login). Registration of an expert **does not** authorize counseling; only admin-approved `temporary` or `verified` experts can accept cases.

**Old test document:** The existing `SafeTalk Test Student` record in `safetalk_dev.users` is not a real account. You may remove it using Atlas Data Explorer after verifying it is the fictional test record.

## Google login (optional configuration)

1. In Google Cloud Console, configure an OAuth consent screen and create a **Web application** OAuth client ID.
2. Add `http://localhost:5000` and your deployed Vercel domain to **Authorized JavaScript origins**. If the consent screen is in Testing mode, add test users.
3. Set `GOOGLE_CLIENT_ID` in `.env` and in Vercel environment variables. Restart locally or redeploy.
4. The Google Identity Services button verifies the returned ID token **server-side**, with audience checking.

**Security:** Automatic linking by email alone is unsafe if manual-registration emails are unverified. This implementation intentionally prevents Google from silently taking over an existing password account. Users must log in to their password account and explicitly link their Google identity in their profile. For a production rollout, implement email verification and account recovery.

## Vercel deployment

1. Push the folder to a **private** GitHub repository (no `.env`!), connect it to Vercel.
2. Set framework preset **Other**, project root directory to repository root. `public/` serves the static pages; `api/index.js` handles `/api/*`.
3. Configure `MONGODB_URI`, `JWT_SECRET`, `GOOGLE_CLIENT_ID` (optional), `BLOB_READ_WRITE_TOKEN` (optional), and `CRON_SECRET` in Vercel environment variables.
4. Use a **separate production Atlas database and restricted credentials**, not `safetalk_dev`, before testing deployment with private content.
5. Redeploy. Test `/api/health` and registration using **fictional test accounts**.
6. On Vercel, ensure the `CRON_SECRET` is set for the scheduled trash-cleanup endpoint. Cron availability/schedule depends on Vercel plan. On other hosts run a daily job that calls `/api/cron/cleanup` with `Authorization: Bearer <CRON_SECRET>`; until cleanup is triggered, expired trash remains stored.

MongoDB Atlas must permit traffic from your deployed backend; production should use appropriately restricted network controls. Avoid public allow-all access where possible.

## What is implemented

- Student password registration/login, optional profile fields, username availability check, Google sign-in option.
- Separate student and psychologist portal URLs, admin portal URL not linked from the home page.
- Student public profiles are not exposed; student anonymous alias stays stable across cases (consider the potential **cross-case linkability** of a stable alias).
- Pending case queue, atomic acceptance, assigned-case messaging, solve/reopen cycles, metadata counters.
- Student case boxes, messenger-style **up to three** chat popups, minimize/close, notification counts, periodic refresh, typing indicator via a short-lived MongoDB presence record, read timestamps.
- Private case reporting; admin cannot access unrelated messages through admin endpoints, but can inspect reported conversations (with an audit record).
- Admin verification changes, suspension/hold status, reasons and case-report resolutions, psychology profile feedback.
- Trash and restore, scheduled deletion after 30 days (cleanup endpoint removes associated documents).
- Optional private Blob uploads of profile avatars and psychologist credentials, with proxy-mediated downloads. Limited to 4 MB with file signatures checked.

## Important limitations / tasks before a real launch

- **Not actually push-button production-ready** for real counselling: no penetration test, email ownership verification, specialized emergency escalation workflow, clinical supervision, consent controls, or independently verified license checks.
- **Typing/read updates use polling every ~6 seconds**, not persistent WebSockets. The `typing` event is short-lived in MongoDB for cross-instance consistency; sender must keep typing for indicator to refresh. True delivery acknowledgment isn't implemented: UI shows **Sent** and **Seen**, not **Delivered**.
- Public review comments must be screened for personal or sensitive information before public display; this prototype currently publishes them immediately. Do not use real feedback until moderation exists.
- A student’s stable alias allows longitudinal linkage; this was explicitly requested but could compromise anonymity across cases. A per-case alias may be safer.
- Psychologist public case counts use authorized case metadata; reports expose message content only to admins.
- No student email verification, password reset, password-change flow, Google account unlink, appeals process, automated backups, abuse throttles for all endpoints, attachment scanning, PDF content-disposition isolation, or anti-spam moderation.
- Chat history currently displays up to 500 messages per case; implement pagination for scale.
- No standalone file attachment inside a case yet; profile avatars and professional certification uploads are implemented behind optional Blob configuration.
- The 30-day trash process is initiated by a scheduled endpoint; actual deletion may be delayed if it does not run.
- For real-user safety, replace any test admin access with organizational SSO or stronger admin MFA and clearly documented authorization policies.

## Repository layout

```text
public/           Student landing page, student/psychologist/admin dashboards, CSS, JS
api/index.js      Vercel serverless API entry
src/app.js        Express routes and access controls
src/models.js     MongoDB schemas
src/db.js         Shared MongoDB connection
scripts/seed-admins.js  Secure two-admin bootstrap
server.js         Local HTTP entry point
vercel.json       Vercel routing and cleanup cron
.env.example      Nonsecret configuration template
```

## Notes on privacy and threat model

Psychologists do not receive a student's actual name, email, photo, or account ID from the case API. Admins see case metadata and status and can view messages **only in reported cases**. Atlas database administrators can inherently access stored data; the platform is not end-to-end encrypted. Authenticated students may rate assigned psychologists; do not use user-submitted reviews in production without moderation and privacy review. The site is **not an emergency service** and should not imply instant monitoring.
