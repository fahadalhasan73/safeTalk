# SafeTalk — Complete Platform Documentation & User Guide

**Version:** 1.0 development guide  
**Updated:** 25 November 2026  
**Website:** https://safetalk-eta.vercel.app  
**Project:** SafeTalk — Anonymous, private, case-based student well-being support  
**Purpose:** Instructions for students, psychologists, administrators, development teammates, and anyone demonstrating or supporting the platform.

> **IMPORTANT — DEVELOPMENT PROTOTYPE, NOT A CLINICAL SERVICE.** This documentation describes the SafeTalk development build supplied for the project, not an independently audited live clinical service. Do not invite real students to submit sensitive disclosures until privacy, security, professional credential verification, consent, moderation, and crisis-escalation processes have been independently reviewed. SafeTalk is not a 24/7 emergency response service, and a reply may not be immediate.

---

## Table of contents

1. [About SafeTalk](#1-about-safetalk)
2. [Who uses SafeTalk?](#2-who-uses-safetalk)
3. [Website links and navigation](#3-website-links-and-navigation)
4. [Student guide: account creation and login](#4-student-guide-account-creation-and-login)
5. [Student guide: profile and anonymity](#5-student-guide-profile-and-anonymity)
6. [Student guide: create and manage cases](#6-student-guide-create-and-manage-cases)
7. [Student guide: private messaging](#7-student-guide-private-messaging)
8. [Student guide: finish, reopen, trash and restore](#8-student-guide-finish-reopen-trash-and-restore)
9. [Student guide: report and review](#9-student-guide-report-and-review)
10. [Psychologist guide: registration, verification and counseling](#10-psychologist-guide-registration-verification-and-counseling)
11. [Psychologist guide: dashboard and case actions](#11-psychologist-guide-dashboard-and-case-actions)
12. [Admin guide: login and management](#12-admin-guide-login-and-management)
13. [Admin guide: verification and reported cases](#13-admin-guide-verification-and-reported-cases)
14. [Case lifecycle and notifications](#14-case-lifecycle-and-notifications)
15. [Permissions, privacy and confidentiality](#15-permissions-privacy-and-confidentiality)
16. [Pictures, certificates, and attachments](#16-pictures-certificates-and-attachments)
17. [Technical architecture and database](#17-technical-architecture-and-database)
18. [Running locally and deploying](#18-running-locally-and-deploying)
19. [Troubleshooting](#19-troubleshooting)
20. [Demo walkthrough and onboarding checklists](#20-demo-walkthrough-and-onboarding-checklists)
21. [Implemented features versus limitations](#21-implemented-features-versus-limitations)
22. [Glossary and FAQ](#22-glossary-and-faq)

---

## 1. About SafeTalk

SafeTalk is a **private, anonymous-to-the-psychologist case-based messaging platform** intended to make it easier for university students to discuss concerns with appropriately authorized professionals. It is inspired by **SDG 3: Good Health and Well-being**.

A student signs in, starts a conversation about a particular concern, and gives that conversation a title. The system assigns the conversation a unique MongoDB case ID and places it in the pending case queue. An approved psychologist can examine the case and accept responsibility. Once accepted, the student and that psychologist can exchange private messages, mark the case finished, and reopen it when appropriate.

This is **not a public social network or open discussion feed**. A case's messages are private to its student author and its assigned psychologist, subject to a narrowly defined reported-case investigation exception for administrators. Its participants can exchange multiple messages in the same case.

### Main capabilities

| Area | Capability |
|---|---|
| Identity | Student/psychologist password registration; login by username or email; optional Google sign-in |
| Privacy | Student identity represented to psychologists by a persistent anonymous alias |
| Cases | Create, accept, message, finish, reopen, trash, restore |
| Chat | Multiple popup windows, minimize/close, typing indicator, Sent/Seen labels |
| Alerts | Notifications of case acceptance, replies, status changes, and verification |
| Professionals | Qualification document upload, admin review, verification status, public expert listing |
| Feedback | Student star rating and optional public written review of an assigned professional |
| Oversight | Admin management of professional status, reports, and case metadata |
| Storage | MongoDB Atlas for application records; optional private Vercel Blob for selected uploads |

---

## 2. Who uses SafeTalk?

### Student

A student registers, creates cases, talks privately with an assigned psychologist, manages their own case history, edits profile details, and can report a conversation or review a psychologist.

### Psychologist

A psychologist registers through a **separate, publicly reachable but unadvertised** portal. Registration does **not** automatically grant counseling privileges. An administrator must assign either `temporary` or `verified` status before the psychologist can access the case queue or provide counseling.

### Administrator

An administrator uses an independently seeded account. Admins manage psychologist verification, see case *metadata* and reported-case investigations, and record resolutions. Admins cannot ordinarily read an unreported conversation's content through their admin interface.

### Quick role comparison

| Action | Student | Approved psychologist | Admin |
|---|:---:|:---:|:---:|
| Create a support case | Yes | No | No |
| See own case's conversation | Yes | If assigned; can inspect pending requests | Only when associated with a report |
| Accept a pending case | No | Yes | No |
| Send messages in an ongoing assigned case | Yes | Yes | No |
| Mark case finished / reopen | Yes | Assigned psychologist | No |
| Move own case to Trash / restore | Yes | No | No |
| Submit a case report | Yes | Assigned psychologist | No |
| Submit psychologist review | Yes | No | No |
| Approve/suspend psychologists | No | No | Yes |
| Read all case metadata | No | Approved psychologists can view queue metadata | Yes |

---

## 3. Website links and navigation

### Public and portal addresses

| Destination | Web address |
|---|---|
| Public homepage | https://safetalk-eta.vercel.app/ |
| Student dashboard | https://safetalk-eta.vercel.app/student.html |
| Psychologist registration/login | https://safetalk-eta.vercel.app/psychologist.html |
| Admin login | https://safetalk-eta.vercel.app/admin.html |
| API health check | https://safetalk-eta.vercel.app/api/health |

> The psychologist and admin URLs may be typed directly into the browser. Their absence from the homepage is for simplicity, **not security**. All restricted API operations must verify the user's authenticated role.

### Homepage sections

- **SafeTalk hero:** introduction and *Start Talking* call to action.
- **Log in:** opens the student login form; once logged in the navigation offers Dashboard.
- **About / How it works:** explains the private support concept.
- **Our experts:** displays currently `temporary` or `verified` professionals, with their profiles, optional photos, rating and published feedback.

If you are unauthenticated and press **Start Talking**, you will be asked to create a student account. If already authenticated, you are directed to the dashboard for your role.

---

## 4. Student guide: account creation and login

### 4.1 Register using email and password

1. Open the **homepage**.
2. Click **Log in**, then switch to **Sign up / Create account**.
3. Complete the required information: **First name, Last name, Email address, Username, Password**.
4. Optionally provide **Institution**, **Date of birth**, and **Gender**.
5. As you type a username, the application checks availability against the database. A username must be **3–24 characters**, start with a **lowercase letter**, and contain only lowercase letters, numbers, or underscores. It cannot be shared with another account.
6. Use a password of at least **10 characters** (the prototype's current registration rule). Choose a strong, unique password.
7. Submit the registration form. On success, SafeTalk creates the student account and opens a login session.
8. You are directed to your student dashboard.

**Example username:** `student_2026`  
**Invalid examples:** `1student` (starts with digit), `student-name` (hyphen), or an already-registered username.

**If registration says the email/username exists:** The account may have been saved in an earlier attempt even if session creation failed. Try logging in rather than creating repeated accounts.

### 4.2 Login with username/email and password

1. Click **Log in** on the homepage or open the student portal.
2. Enter your **username or registered email** and password.
3. Submit. If credentials match, you are directed to your dashboard.
4. Use **Log out** to end your browser session.

The application uses an HTTP-only authentication cookie with a seven-day maximum session duration; sessions may expire earlier if credentials or configuration change.

### 4.3 Continue with Google

**Only available after the project administrator configures Google OAuth (`GOOGLE_CLIENT_ID`).**

1. Open student sign-in and choose the Google sign-in option when visible.
2. Select the Google account you wish to use.
3. Google verifies the identity; SafeTalk checks the Google ID token on the server.
4. If this is a new Google account, SafeTalk creates a student profile with a system-assigned anonymous alias. You may choose a username later in **My profile**.
5. If you previously registered manually with the **same email**, the system **does not automatically merge/link** the accounts. First log in using your username/password, open **My profile**, and use the Google account linking option. After linking, future Google logins can open that same account.

**Why explicit linking matters:** It helps prevent one sign-in method from silently taking control of another account. A production version also needs verified ownership of manually registered email addresses.

### 4.4 Login troubleshooting

- **Invalid login details:** Confirm username/email and password; the login form accepts either username or email.
- **Google sign-in not visible:** OAuth is not configured, not loaded, or your browser is blocking it.
- **Session expired:** Sign in again.
- **Username taken:** Choose a different username.
- **Forgot password:** The current prototype **does not include a secure password-reset workflow**; do not assume account recovery is available.

---

## 5. Student guide: profile and anonymity

### Open your profile

On the student dashboard, choose **My profile**. From there you can edit:

- First name and last name.
- Username (if you wish to set or change it).
- Institution, date of birth, and gender.
- Optional biography field, where offered.
- Profile image, if private upload storage has been configured.
- Google account link, if Google sign-in is enabled.

Click **Save profile** after editing ordinary fields. Upload the profile image separately using its file selector.

### How anonymous identity works

On registration, the system assigns a student alias such as `Anonymous-123456`. A psychologist sees this alias on the case, **not** the student's actual name, email, profile picture, or user account ID through the case interface. The alias stays the same for the student's subsequent cases, allowing a psychologist to recognize previous contacts.

**Privacy implication:** A stable alias means different cases by the same student can be linked, potentially across professionals. Students should be explicitly informed of this before real deployment; a per-case alias would offer stronger separation.

**Anonymity has limits:** SafeTalk stores account-to-case associations in MongoDB, and people with sufficiently privileged database infrastructure access could inspect those records. The project is **not end-to-end encrypted** and should not promise absolute anonymity.

---

## 6. Student guide: create and manage cases

### 6.1 Start a new case

1. Sign in to your student account.
2. On the dashboard, click **＋ Start Talking**.
3. Enter a **Case title** (3–140 characters). Example: `Feeling overwhelmed by exams`.
4. In the message field, describe what you feel comfortable sharing (5–10,000 characters for the initial submission).
5. Read the emergency-care notice and click **Submit privately**.
6. SafeTalk creates a unique case ID, saves your opening message, and places the case in **Pending**.
7. The conversation window can open immediately, but **the case must be accepted by an approved psychologist before normal back-and-forth messaging begins**.

There is no explicit limit on the number of cases a student can create in this prototype, although practical abuse-prevention limits should be designed before public launch.

### 6.2 Dashboard tabs

| Tab | What it contains |
|---|---|
| **Pending** | Your submitted cases not yet accepted by a psychologist |
| **Ongoing** | Cases accepted and currently open for messaging |
| **Solved** | Cases previously marked finished; may be reopened |
| **Trash** | Cases you've moved to trash, pending deletion |

Each case card displays its title, status and relevant actions. An unread indicator may appear when new notifications have arrived for that case.

### 6.3 View a conversation

Use the case card's **Preview / Open** action to display the conversation in a small popup window at the bottom right. This window shows the case title, other participant, chat history, message status and available actions.

You can open **up to three chat windows** at one time. Opening another after three are open closes the oldest window in the browser interface; this **does not delete the case or its messages**.

### 6.4 If no psychologist has accepted yet

The pending case remains in the unassigned queue. You can review its original content, but there is no guarantee a professional will accept quickly. Do not rely on pending cases for urgent help.

---

## 7. Student guide: private messaging

### Send a reply

1. Open an **Ongoing** case.
2. Type in the message box.
3. Click **Send**.
4. The backend checks that you are the case owner and that the case is ongoing, then stores the message in MongoDB Atlas.
5. The assigned psychologist receives an in-app notification of the reply.

Text replies support up to **10,000 characters**. The current build does not support image/PDF attachments **inside the conversation**.

### Chat window controls

- **Minimize (−):** collapse the window without deleting its messages or case.
- **Close (×):** remove the popup from the screen; reopen it from its dashboard card later.
- **Send:** save a new message.
- **Finish:** mark the ongoing case as solved after confirmation.
- **Reopen:** reactivate a solved case.
- **Report:** report the conversation for administrative review.

### Sent and Seen

- **Sent:** the message has been successfully saved; the recipient has not yet marked it read.
- **Seen:** the opposite participant has opened/seen the message, and the server records a read timestamp.

The current prototype **does not implement a reliable separate “Delivered” acknowledgement**. Do not interpret *Sent* as proof that the other person is online.

### Typing indicator

While the other person types into an active conversation, you may see **Someone is typing…**. A short-lived typing record is written in MongoDB, and the client periodically checks it. This is an approximation, not instantaneous WebSocket broadcasting; the indicator can appear or disappear with a delay.

### Refresh and unread notifications

The browser checks for updates about every **6 seconds when the page is visible**. New messages and status changes appear after the refresh. The dashboard can show unread notification counts; opening a conversation marks that case's counterpart messages and notifications read. The notification panel lists recent activity.

**Privacy tip:** Browser tabs and device notifications may reveal that an account is active. Consider who can see your screen, especially on a shared device.

---

## 8. Student guide: finish, reopen, trash and restore

### Finish a conversation

1. Open an **Ongoing** case.
2. Click **Finish**.
3. Confirm the action.
4. The case moves to **Solved**, and the other participant is notified.

**Important:** In the current backend, **either the student or the assigned psychologist** can finish an ongoing case.

### Reopen a solved case

1. Go to **Solved** and open the case.
2. Click **Reopen**.
3. The case moves back to **Ongoing** and the other participant is notified.
4. Continue the conversation.

The reopen count is retained; there is no hard-coded limit on reopening. Reopening requires the originally assigned psychologist to remain approved and available. If the psychologist has been suspended/rejected or otherwise lost authorization, the current build returns an error; there is **no reassignment interface** yet.

### Move to trash

1. Select one of your case cards.
2. Click **Delete / Trash**.
3. Read the confirmation dialog and confirm.
4. The case moves to **Trash** and is excluded from normal active-case views.

### Restore from trash

1. Go to the **Trash** tab.
2. Find the conversation.
3. Click **Restore** while it is still eligible.
4. The conversation returns to its previous pending/ongoing/solved category.

### Permanent deletion after 30 days

A trashed case receives a deletion deadline **30 days after trashing**. A scheduled cleanup endpoint is designed to delete expired cases and associated messages, notifications, reports and reviews. **Deletion depends on the scheduled job actually running**; the time should not be promised as an exact 30-day guarantee. Administrators/developers should monitor cleanup success and establish a documented retention policy before handling real sensitive data.

---

## 9. Student guide: report and review

### Report a conversation

1. Open a conversation.
2. Click **Report**.
3. Describe the concern (10–1,500 characters).
4. Submit the report.
5. An admin can inspect that reported conversation and record an investigation outcome.

**Privacy warning:** Filing a report **grants administrators a route to view the associated messages**, which they otherwise cannot see through the admin API. Only report what you wish to escalate through this process. Formal consent and disclosure rules still need development.

### Rate or review a psychologist

1. Open the **Solved** cases section.
2. Find a case accepted by a psychologist and choose **★ Review**.
3. Select **1–5 stars**.
4. Optionally type feedback (up to 1,500 characters).
5. Submit; the review is associated with that case and psychologist.

A case has one review record, which can be updated by submitting again. Reviews are used in the **Our experts** public listing; the psychologist's aggregate rating and comments can be shown there.

> **Current limitation:** Written reviews are displayed publicly without a moderation queue in this prototype. Do not post personal disclosures, names, case contents, or other sensitive data in a review. The requested green/yellow/red review-text color coding was a design requirement, but **should not be treated as a confirmed finished implementation** without inspecting/testing the current frontend. Public-review moderation is a prerequisite to real deployment.

---

## 10. Psychologist guide: registration, verification and counseling

### 10.1 Access the psychologist portal

Open:

**https://safetalk-eta.vercel.app/psychologist.html**

The homepage is intentionally student-focused; there is no visible psychologist login button there. The psychologist URL is nevertheless public and can be shared with eligible professionals.

### 10.2 Register as a psychologist

1. Open the **psychologist portal**.
2. If prompted for login, choose **Sign up / Create account**.
3. Enter **First name, Last name, Email, Username and Password**.
4. Complete optional demographic/profile fields as desired.
5. Submit registration. Your account receives verification status **`new`**, which **does not yet permit counseling**.
6. Open **My profile** or **Verification & profile**.
7. Add your specialty and professional biography where relevant.
8. Upload the required qualification/verification certificate under the **Certificate** field.
9. Await a decision from an admin.

Google sign-in is potentially available for psychologists if `GOOGLE_CLIENT_ID` is configured, but a newly created psychologist account still requires admin verification. Google login does not prove professional qualifications.

### 10.3 Submit professional verification documents

In **My profile / Verification & profile**:

1. Choose **Certificate for admin review**.
2. Select an eligible file: **PNG, JPEG, WebP or PDF**, maximum **4 MB**.
3. Upload the document.
4. If private Blob storage has been configured, the backend stores the file privately and marks the profile for administrative review.
5. Check **verification status** and any note from the reviewer.

**Configuration dependency:** Certificate and avatar upload work only if a private Vercel Blob store/token is configured. Without it, the API returns a storage-not-configured error. Uploaded files do not go into MongoDB as image bytes; MongoDB stores the private file reference.

### 10.4 Verification statuses

| Internal status | Plain-language meaning | Can counsel? |
|---|---|:---:|
| `new` | Newly registered / submitted for review | No |
| `temporary` | Temporarily approved by admin | **Yes** |
| `verified` | Approved by admin | **Yes** |
| `hold` | Review paused pending more checking | No |
| `rejected` | Verification declined / not verified | No |
| `suspended` | Access revoked because of administrative decision | No |

Only `temporary` and `verified` accounts may view the psychologist case queue, accept new cases or participate in the professional role. The system controls this on the backend, not merely by hiding tabs.

**Professional safety note:** Admin labeling alone does not constitute rigorous real-world credential verification. Independent checks of professional registration, licensing, identity, jurisdiction, and suitability are required before a genuine counseling service launches.

### 10.5 When approved

The psychologist dashboard reveals **Pending**, **My cases**, **All ongoing**, and **All solved** tabs. You can read pending case requests and choose whether to accept one. Only the assigned psychologist can send replies to an ongoing case.

---

## 11. Psychologist guide: dashboard and case actions

### Dashboard tabs

| Tab | What it shows |
|---|---|
| **Pending** | Unassigned student cases available for an approved psychologist to review |
| **My cases** | Cases assigned specifically to you, including currently ongoing and solved cases |
| **All ongoing** | Metadata for ongoing cases across the platform |
| **All solved** | Metadata for solved cases across the platform |

**Distinction:** Listing other professionals' ongoing or solved cases does **not** grant permission to read those conversations. Detailed message access is restricted to assigned cases and unassigned pending cases eligible for acceptance.

### Review a pending case

1. Select **Pending**.
2. Read each displayed case's **title, anonymous student alias, and preview**.
3. Open a case to read its submitted concern.
4. If you can appropriately handle it, click **✓ Accept case**.
5. If not, click **Ignore / ×** to close the popup without accepting. The case stays in **Pending** so another approved psychologist may review it.

Acceptance is handled atomically by MongoDB: if someone else accepts the case first, a later attempt fails rather than assigning the case twice.

### After accepting

- The case moves from **Pending** to **Ongoing**.
- Your account becomes the assigned psychologist.
- The student receives a notification such as *Your case “...” has been received by [psychologist name]*.
- You and the student can exchange messages inside that case.
- The student sees your professional name and, if configured, professional avatar/verification identity.

### Respond to the student

1. Go to **My cases** or open the assigned case.
2. Type a response in its chat popup.
3. Click **Send**.
4. Your response is stored in MongoDB; the student's account gets a notification.
5. Use **Sent / Seen** and typing indicators as approximate UI aids, **not** as clinical availability guarantees.

### Finish / reopen a case

- Use **Finish** in an ongoing case to move it to **Solved**; the student is notified.
- Use **Reopen** in a solved case to return it to **Ongoing**; the student is notified.
- The student can also finish or reopen their own assigned case when the relevant conditions are met.
- Reopen attempts fail when the assigned psychologist is no longer authorized; assignment transfer is not implemented.

### Reporting

An assigned psychologist can use **Report** on a conversation to submit concerns for admin investigation. The report opens restricted access to that reported case's messages for administrators reviewing it.

### Suspended, held, or unverified accounts

A psychologist with `new`, `hold`, `rejected`, or `suspended` status sees a prominent status explanation and does not receive access to normal counseling queues. Existing case metadata may remain in the database; loss of professional access stops further counseling through the psychologist APIs. Any affected student needs a human-operated support/transfer process before real-world deployment.

---

## 12. Admin guide: login and management

### Admin portal

**https://safetalk-eta.vercel.app/admin.html**

Admin accounts are **not** registered from a public form. The development project provides a protected seed script to create two administrators in the Atlas database.

### How developers initially create admin accounts

In your local `.env` file (never in GitHub), set:

```env
ADMIN_ONE_ID=safetalkadmin01
ADMIN_ONE_PASSWORD=REPLACE_WITH_A_UNIQUE_STRONG_PASSWORD
ADMIN_TWO_ID=safetalkadmin02
ADMIN_TWO_PASSWORD=REPLACE_WITH_ANOTHER_UNIQUE_STRONG_PASSWORD
```

The seed script requires sufficiently long values and will reject insecure configuration; use **at least 12 characters for both IDs and passwords** in this development build. Run:

```powershell
npm run seed:admins
```

This creates/updates the admin records in MongoDB Atlas. Their passwords are stored as password hashes. Since the Vercel deployment points to the same database, you **do not seed a second set of accounts on Vercel**.

**Never put actual passwords or a full MongoDB connection string into documentation.** Re-running the seed script can change configured admin credentials. Before a real launch, implement MFA and strong privileged-account audit controls.

### Admin login

1. Open `/admin.html`.
2. Enter your seeded **Admin ID** and password.
3. After authentication, access the admin dashboard.
4. Use **Log out** when finished.

### Admin dashboard tabs

| Tab | Purpose |
|---|---|
| **Overview** | Counts of pending/ongoing/solved cases and case metadata |
| **Psychologists** | Review professional accounts, certificates and verification decisions |
| **Reported cases** | Open user-submitted reports and inspect reported conversations |
| **Resolved issues** | Previously resolved reports and investigation notes |
| **My resolutions** | Reports resolved by the currently logged-in administrator; edit resolution notes |

The overview displays case ID, title, status, assigned professional, message count and reopening count. **It does not expose ordinary unreported message content.**

---

## 13. Admin guide: verification and reported cases

### 13.1 Verify a psychologist

1. Log in to the **Admin portal**.
2. Choose **Psychologists**.
3. Find the relevant professional by name/email and current status.
4. If a certificate was uploaded, click **View certificate** to inspect it.
5. Choose the appropriate status action: **verified**, **temporary**, **hold**, **rejected**, or **suspended**.
6. Enter a decision note when prompted and save.
7. The change is recorded; the psychologist receives an account notification.

The six statuses `new`, `temporary`, `verified`, `hold`, `rejected`, and `suspended` appear in the admin's status summaries. The current dashboard groups all professionals in one list with status controls, rather than having a separate page for each status.

### Suggested meanings of verification decisions

- **Verified:** Qualifications and suitability have been independently checked and approved.
- **Temporary:** Conditional approval for the prototype; still permits counseling in the software.
- **Hold:** More information or review is required; counseling disabled.
- **Rejected:** Application was not accepted; counseling disabled.
- **Suspended:** Existing approval revoked; counseling disabled.

Use consistent, documented criteria; avoid allowing anyone to counsel solely because a document looks plausible. In a true mental-health platform, temporary authorization can still create serious safety exposure and requires documented supervision.

### 13.2 Process a reported case

1. Open **Reported cases**.
2. Read the submitted report reason and associated case ID.
3. Click **Review reported conversation** when investigation requires message access.
4. Read only what is necessary to assess the allegation; this access is audit logged.
5. Click **Record resolution** and write the investigation outcome and action taken (10–2,000 characters).
6. Save. The report moves from **Open** to **Resolved**.
7. Find the result under **Resolved issues** or **My resolutions**. The latter allows editing the resolution record.

**Important distinction:** Marking a **report** resolved does **not automatically finish or delete the underlying student counseling case**. These are separate statuses.

### Admin visibility and oversight

- Admins see case **metadata** for pending/ongoing/solved cases.
- Admins can see professional account details and verification documents.
- Admins can see **reported** conversation messages using the investigation endpoint.
- Admins should not be able to retrieve **unreported** conversation messages through ordinary admin routes.
- The system records verification changes, reported-case access and resolution events in an `audits` collection.
- Admin access is powerful: role checking, audit log integrity, MFA and access reviews are high priority before public release.

---

## 14. Case lifecycle and notifications

### Standard workflow

```text
Student creates a case
        |
        v
     PENDING
  (unassigned)
        |
        | Approved psychologist accepts
        v
     ONGOING <------------------+
        |                       |
        | Student/psychologist  | Either participant
        | sends messages       | reopens solved case
        |                       |
        | Either participant    |
        | clicks Finish        |
        v                       |
      SOLVED ------------------+

Student may move any owned case to TRASH
        |
        +--> Restore within retention window
        |
        +--> Scheduled permanent cleanup after 30 days
```

### Notifications table

| Event | Who receives an update? | Result |
|---|---|---|
| New case created | Enters pending psychologist queue | Case pending |
| Psychologist accepts | Student | Case becomes ongoing; psychologist identified |
| Student sends reply | Assigned psychologist | New reply notification |
| Psychologist sends reply | Student | New reply notification |
| Case marked finished | Other participant | Case becomes solved |
| Case reopened | Other participant | Case becomes ongoing; reopen count increments |
| Professional verification changed | Psychologist | Profile/dashboard status changes |
| Conversation opened/read | Corresponding message sender | Read timestamp updates, Seen indicator may appear |
| Report filed | Admin dashboard contains open report | Investigation possible |

**Notification counting:** The UI counts unread **notification records** associated with a case. It is not a guaranteed one-to-one count of unseen text messages in all situations. Viewing a case clears associated unread notifications and marks counterpart messages read.

### Why the same case ID matters

A case has one persistent identifier. Every reply stores the case ID. Changing the case status from pending → ongoing → solved → reopened does **not** create a new case or erase its existing conversation history. The `reopenCount` keeps track of reuse of the same case.

---

## 15. Permissions, privacy and confidentiality

### What psychologists can see

Psychologists are shown the student's **system-generated anonymous alias**, case title, and allowed case content, but not the student's full account details through the case API. An **approved** professional may read an **unassigned pending** case to decide whether to accept it. Once a case is assigned, only its assigned professional can read/reply to that case through the conversation endpoint.

### What admins can see

Admins see platform management information. For unreported cases, admin APIs expose case **metadata only**. A **reported** conversation can be opened by an admin with the proper role, and that access is recorded in the audit collection.

### What other students can see

A student may retrieve only their **own** cases and associated messages. User-supplied case IDs are checked against authenticated ownership; a case ID by itself is not authorization.

### What remains accessible to infrastructure operators

MongoDB database administrators and other privileged infrastructure administrators may have access to underlying stored records. This prototype does not provide end-to-end encryption. Do not promise absolute secrecy or anonymity.

### Safety and privacy requirements before real deployment

1. Publish understandable informed-consent, privacy, retention and disclosure policies.
2. Establish emergency/crisis response and referral procedures with qualified professionals.
3. Verify professional licenses/registration independently, not only by inspecting uploaded PDFs.
4. Add email verification, password recovery, MFA for privileged roles, abuse prevention and a security assessment.
5. Protect backups, restrict Atlas database privileges, log relevant privileged access, and monitor incidents.
6. Moderate public psychologist reviews to prevent unintentional disclosure of student mental-health information.
7. Evaluate whether a **stable cross-case anonymous alias** is truly appropriate.
8. Test accessibility, mobile layouts, and handling of unreliable connectivity.
9. Define procedures for suspended professionals with unresolved assigned cases.
10. Use a separate production database, not `safetalk_dev`, when processing real data.

---

## 16. Pictures, certificates, and attachments

### Profile image

Students and psychologists can select **PNG, JPEG or WebP** profile images, maximum **4 MB**, from **My profile**. Upload availability depends on configuring **private Vercel Blob storage**. Students' private avatars are protected by their authenticated profile-access route; professional avatars may appear in public expert listings.

### Psychologist certificates

Psychologists may submit **PNG, JPEG, WebP or PDF**, maximum **4 MB**, for credential review. Certificates are intended to remain private; only admins should retrieve them through the restricted certificate endpoint.

### Case attachments

**Not implemented in the supplied development build.** In-chat PDFs, document uploads, and image attachments were discussed as future features; existing message records currently store text, not attachments.

### File storage design

```text
Browser uploads file -> SafeTalk backend validates it -> Private Vercel Blob
                                                      |
                                                      v
                                      MongoDB stores a private reference
```

Uploaded files are not stored as giant Base64 strings in the database. Do not expose private blob tokens or credential URLs in frontend JavaScript.

**Before real deployment:** add malware scanning, authorization and access-control tests, safe file preview behavior, and deletion/retention handling for files.

---

## 17. Technical architecture and database

### Request path

```text
Student / Psychologist / Admin browser
                  |
                  v
          Vercel-hosted frontend
                  |
                  v
    Express API (Vercel Function)
        |                |
        v                v
  MongoDB Atlas      Private Blob
  application data   optional uploads
```

### Stack

| Component | Current technology |
|---|---|
| UI | HTML, CSS, vanilla JavaScript |
| API/backend | Node.js + Express |
| ODM | Mongoose |
| Database | MongoDB Atlas |
| Authentication | bcryptjs password hashes + signed JWT in HTTP-only cookie; optional Google Identity Services |
| File storage | Optional Vercel Blob (private) |
| Hosting | Vercel |
| Source control | GitHub repository `fahadalhasan73/safeTalk` |
| Background cleanup | Vercel Cron invoking a protected API endpoint |
| Chat updates | Periodic HTTP polling; temporary MongoDB typing records |

### Collections

| Collection | Role |
|---|---|
| `users` | Students, psychologists, admins, account details, role, alias, verification |
| `cases` | Title, student owner, assigned professional, status, counts, timestamps, trash information |
| `messages` | Case-linked message content, sender role, date, read time |
| `notifications` | User-targeted new reply/status alerts and seen flag |
| `reports` | Case complaint, reporting user, status, resolution, resolving admin |
| `reviews` | Student star rating and optional feedback about assigned psychologist |
| `presences` | Short-lived typing-indicator records |
| `audits` | Privileged action log, such as verification changes and reported-case access |

MongoDB collection names are generally pluralized by Mongoose. The main project database used during development was `safetalk_dev`.

### Folder map

```text
SafeTalk/
├── public/
│   ├── index.html           # Homepage
│   ├── student.html         # Student dashboard
│   ├── psychologist.html    # Professional portal
│   ├── admin.html           # Administrator portal
│   ├── styles.css           # Design system
│   └── app.js               # Frontend interactions
├── api/
│   └── index.js             # Vercel API entrypoint
├── src/
│   ├── app.js               # Express APIs, access checks
│   ├── db.js                # Mongoose connection
│   └── models.js            # Database schemas
├── scripts/
│   └── seed-admins.js       # Admin account bootstrap
├── server.js                # Local development server
├── vercel.json              # Vercel rewrites + cron
├── package.json             # Scripts/dependencies
├── .env.example             # Safe configuration template
├── .gitignore               # Prevent secret commits
├── README.md
└── documentation.md         # This guide
```

### Selected API routes (technical reference)

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Backend/database health check |
| `/api/auth/username` | GET | Check username availability |
| `/api/auth/register` | POST | Create student/psychologist account |
| `/api/auth/login` | POST | Password sign-in |
| `/api/auth/google` | POST | Google login or explicit account linking |
| `/api/auth/logout` | POST | Log out |
| `/api/auth/me` | GET | Current logged-in user |
| `/api/profile` | PATCH | Edit profile |
| `/api/profile/file/:kind` | POST | Upload avatar/certificate |
| `/api/experts` | GET | Public approved professionals/reviews |
| `/api/cases` | POST | Student creates case |
| `/api/cases/mine` | GET | Student case list |
| `/api/cases/queue` | GET | Approved professional case queues |
| `/api/cases/:id/messages` | GET / POST | Read/send conversation messages |
| `/api/cases/:id/accept` | POST | Accept pending case |
| `/api/cases/:id/read` | POST | Mark counterpart messages read |
| `/api/cases/:id/typing` | GET / POST | Approximate typing presence |
| `/api/cases/:id/finish` | POST | Mark case solved |
| `/api/cases/:id/reopen` | POST | Reopen solved case |
| `/api/cases/:id/trash` | POST | Trash own case |
| `/api/cases/:id/restore` | POST | Restore own trashed case |
| `/api/cases/:id/report` | POST | Report conversation |
| `/api/cases/:id/review` | POST | Review assigned professional |
| `/api/notifications` | GET | View notifications |
| `/api/admin/overview` | GET | Case metadata, verification, reports |
| `/api/admin/psychologists/:id/status` | POST | Change verification status |
| `/api/admin/reports/:id/messages` | GET | Review a reported conversation |
| `/api/admin/reports/:id/resolve` | POST | Record report resolution |
| `/api/cron/cleanup` | GET | Authenticated scheduled trash cleanup |

These routes require the role/session checks described earlier. Do not attempt to call protected endpoints with an unauthenticated account or expose private keys.

---

## 18. Running locally and deploying

### Local setup (developer)

**Prerequisites:** Node.js 20+, npm, Atlas cluster, correct database URI, a copy of the SafeTalk project.

```powershell
npm install
Copy-Item .env.example .env
```

Edit `.env` using your actual private values. Example **with placeholders only**:

```env
MONGODB_URI=mongodb+srv://USER:URL_ENCODED_PASSWORD@HOST.mongodb.net/safetalk_dev
JWT_SECRET=REPLACE_WITH_A_RANDOM_SECRET_LONGER_THAN_32_CHARACTERS
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID=
BLOB_READ_WRITE_TOKEN=
CRON_SECRET=
```

Generate a fresh secret with:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Start the server:

```powershell
npm run dev
```

Open `http://localhost:5000/` and check `http://localhost:5000/api/health`. A functioning connection returns JSON similar to:

```json
{"ok":true,"database":"connected"}
```

**Note:** `node --watch` stays active and restarts the server when files change. `Ctrl+C` stops it. Open a second terminal for Git/npm commands.

### Seeding admins

Put the two private admin IDs/passwords in `.env` and run:

```powershell
npm run seed:admins
```

Admin accounts reside in MongoDB Atlas; if local and Vercel use the same Atlas database, there is no separate Vercel seeding step. For security, do not use the development database for production health cases.

### GitHub workflow

Repository: **https://github.com/fahadalhasan73/safeTalk**

```powershell
git status
git add .
git diff --cached --name-only
git commit -m "Update SafeTalk documentation and features"
git push origin main
```

Ensure `.env`, secrets and `node_modules/` are **not staged**. Never force-push an unfamiliar remote history.

### Vercel configuration

- Use the existing Vercel project connected to `fahadalhasan73/safeTalk` and production branch `main`.
- Framework preset: **Other**. API code in `api/index.js` and static files in `public/`.
- Set **Project Settings → Environment Variables** for Production, including `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, and `CRON_SECRET` when scheduled cleanup is enabled.
- Add `GOOGLE_CLIENT_ID` only after configuring Google OAuth origins.
- Add Blob credentials/private store only after creating the Blob store.
- **Redeploy after adding/changing Vercel environment variables.** Existing deployments do not automatically acquire new values.
- Ensure Atlas IP/network rules permit backend connectivity. Avoid allow-all exposure for real sensitive data; use restricted networking where feasible.
- Test the `/api/health` response and fictional student/admin/psychologist workflows after every significant deployment.

### Scheduled cleanup

`vercel.json` requests a cron trigger on `/api/cron/cleanup` at `0 3 * * *` (UTC scheduling semantics depend on Vercel). The endpoint requires `Authorization: Bearer <CRON_SECRET>`. Check Vercel plan support and logs to verify the job actually runs; otherwise 30-day deleted-case cleanup will not occur.

---

## 19. Troubleshooting

| Symptom | Likely cause | What to do |
|---|---|---|
| Homepage does not load locally | Server not started, wrong port, wrong folder | Run `npm run dev` from project root; open `http://localhost:5000/` |
| Terminal seems “stuck” after server starts | Express process is actively listening | Normal; use another terminal, or `Ctrl+C` to stop |
| `MONGODB_URI is missing` | `.env` or Vercel variable not available | Check key spelling; local `.env`; add Production variable to Vercel, then redeploy |
| `Could not connect to any servers in your MongoDB Atlas cluster` | Atlas network access, DNS, or endpoint issue | Check Atlas IP access list, URI hostname, connection status; use logs to diagnose |
| `JWT_SECRET must be at least 32 characters` | Missing/short JWT secret | Generate a strong random secret, set `.env`/Vercel, restart/redeploy |
| Registration saved to database but login failed | Account saved before session-signing error | Repair JWT configuration and sign in with the account; don't register a duplicate |
| `Missing secure ADMIN_ONE_ID/PASSWORD` | Admin seed vars absent or too short | Set valid private ID/password values (12+ chars) and rerun seed script |
| Password login works locally but not online | Different Atlas DB or Vercel environment configuration | Check live API health, Vercel logs and DB URI without exposing secrets |
| Google button missing | `GOOGLE_CLIENT_ID` not configured | Complete Google OAuth setup and redeploy |
| Google account with existing email cannot log in | Account not explicitly linked | Log in with password, then link Google from profile |
| Image/certificate upload fails | Private Blob not configured, wrong type or file too large | Configure Blob and token; use supported type under 4 MB |
| Psychologist sees “verification required” | Status is `new`, `hold`, `rejected`, or `suspended` | Submit certificate; await authorized admin decision |
| Case cannot be accepted | Another psychologist already accepted or authorization missing | Refresh pending queue; check status/verification |
| Solved case cannot be reopened | Assigned psychologist no longer authorized | Requires staff intervention/reassignment feature not yet implemented |
| Notifications seem delayed | Polling cycle or tab hidden | Keep tab visible; allow a few seconds and refresh |
| Typing indicator isn't instantaneous | Polling + 5-second presence record | Expected prototype behavior; real-time infrastructure is not implemented |
| Deleted case remains after 30 days | Cron not executing or scheduled later | Check cron configuration, Vercel plan and logs |
| Vercel shows **Ready**, but `/api/health` fails | Build succeeded, runtime configuration failed | Check Vercel runtime Logs for actual server-side error |

**When asking for troubleshooting help:** Share the URL path, what you clicked, the error text, and redacted logs. **Never send** actual passwords, JWT secrets, credential-bearing MongoDB URIs or private upload tokens.

---

## 20. Demo walkthrough and onboarding checklists

### Student onboarding checklist

- [ ] Open the public homepage.
- [ ] Register with fictional first/last name, email, username and a safe test password.
- [ ] Log out and log in with username/password.
- [ ] Open **My profile**, update one optional detail, and save.
- [ ] Click **Start Talking** and create a fictional case with a title/message.
- [ ] Find it under **Pending** and open the popup.
- [ ] After psychologist acceptance, find it under **Ongoing**.
- [ ] Send a reply, check notifications, and inspect Sent/Seen behavior.
- [ ] Mark case **Finished**, then **Reopen** it.
- [ ] Test **Trash**, then **Restore**.
- [ ] Submit a fictional report/review only if everyone participating knows these are test records.

### Psychologist onboarding checklist

- [ ] Open `/psychologist.html`.
- [ ] Register a fictional professional account.
- [ ] Open **Verification & profile** and update specialty/biography.
- [ ] Upload a fictional test qualification file if Blob storage is configured.
- [ ] Verify that unapproved accounts **cannot** see counseling queues.
- [ ] Ask an admin to set **temporary** or **verified** status for the test account.
- [ ] Open **Pending**, inspect a test case and click **✓ Accept case**.
- [ ] See the case appear in **My cases**.
- [ ] Exchange replies with the test student.
- [ ] Test **Finish** and **Reopen**, and confirm notifications.
- [ ] Confirm that **Ignore / ×** does not consume an unassigned case.

### Admin onboarding checklist

- [ ] Verify admin account was seeded safely; open `/admin.html`.
- [ ] Sign in using the admin ID and password.
- [ ] Review **Overview** case counts/metadata.
- [ ] Open **Psychologists**, inspect submitted test certificate and set a verification status.
- [ ] Confirm the test psychologist's access changes accordingly.
- [ ] Open **Reported cases** and read a fictional report.
- [ ] Use **Review reported conversation** only for this reported test case.
- [ ] Write and save a test resolution; inspect **Resolved issues** and **My resolutions**.
- [ ] Verify ordinary unreported messages cannot be accessed through the admin dashboard.

### Suggested demonstration scenario (fictional)

1. **Student A** registers and creates `Difficulty managing assignment deadlines`.
2. **Psychologist B** registers and uploads a mock training certificate.
3. **Admin C** approves the test psychologist as `temporary`.
4. **Psychologist B** accepts Student A's pending case.
5. Student A sees the acceptance notification and starts messaging.
6. Psychologist B replies; show unread badge, Sent/Seen and typing indicator.
7. Student A marks the case finished, then reopens it.
8. Show the admin's case **metadata** without revealing the private message contents.
9. Student A files a fictional report; Admin C then opens the reported case and records a resolution.
10. Student A moves the case to trash and restores it to demonstrate retention workflow.

**Use clearly synthetic identities and messages in demonstrations.**

---

## 21. Implemented features versus limitations

This table describes the development ZIP and code that were supplied for the project. A successfully loading Vercel page is **not evidence that every behavior has passed an end-to-end live test**.

| Feature | Current development-build status |
|---|---|
| Student manual registration/login | Implemented in source; test end to end |
| Username uniqueness/availability | Implemented via database query |
| Google student/psychologist login | Implemented conditionally; **requires OAuth configuration** |
| Google linking to existing password account | Supported via explicit profile linking; not automatic email merge |
| Optional student/profile details | Implemented |
| Avatar upload | Conditional on private Blob storage configuration |
| Psychologist verification-certificate upload | Conditional on private Blob storage configuration |
| Psychologist approval/suspension | Implemented in admin APIs/UI |
| Unassigned pending queue/atomic acceptance | Implemented |
| Student anonymous alias | Implemented; persists across cases |
| Private case messages | Implemented with server role/ownership checks |
| Messenger-style popup windows | Implemented, up to three simultaneous windows |
| Typing indicators | Implemented using polling/temporary DB records, not instantaneous WebSockets |
| Read receipts | Implemented **Sent/Seen**; separate delivery confirmation absent |
| Case notifications/unread indicators | Implemented using periodic refresh |
| Finish and unlimited reopen | Implemented while assigned professional remains authorized |
| Trash/restore | Implemented |
| Permanent delete after 30 days | **Dependent on scheduled cron execution** |
| Case reports and admin investigation | Implemented; reported-message access is audit logged |
| Public psychologist ratings/reviews | Implemented; **no public-review moderation** |
| Multiple admin accounts | Supported through secured seed script |
| File/PDF attachments **in chat** | **Not implemented** |
| Forgot password/email verification | **Not implemented** |
| Password change, account deletion, reassignment | **Not implemented** |
| MFA, crisis triage, clinical governance, independent privacy/security review | **Not implemented / required before real launch** |
| Real-time WebSocket delivery | **Not implemented**; currently polls |
| Colored feedback text based on star count | Requested in original requirements; **not verified as implemented** |

---

## 22. Glossary and FAQ

### Glossary

- **Case:** One topic-based private support conversation, identified by a unique case ID.
- **Pending:** A new case not yet assigned to a psychologist.
- **Ongoing:** An accepted case with an active student–psychologist exchange.
- **Solved:** An ongoing case marked finished, potentially reopenable.
- **Anonymous alias:** System-created stable pseudonym shown to psychologists instead of the student's identity.
- **Verified / Temporary:** Professional verification levels permitting counseling in the prototype.
- **Trash:** A student-owned case awaiting deletion or restoration.
- **Read receipt:** Timestamp indicating the other participant's message has been marked read.
- **MongoDB Atlas:** Cloud-hosted database used to persist SafeTalk data.
- **Vercel:** Platform hosting the public frontend and server-side API functions.
- **Vercel Blob:** Optional private storage for avatars and verification files.

### Frequently asked questions

**Q: Can I use SafeTalk without registering?**  
A: Anyone may read the public homepage and expert listings; submitting a private case requires a signed-in student account.

**Q: Can a psychologist see my real name?**  
A: The case interface shows a stable anonymous alias, not your registered name/email. This is **application-level pseudonymity**, not guaranteed absolute anonymity.

**Q: Can another student read my case?**  
A: The backend restricts case reads by student ownership. No public case feed is supplied.

**Q: Will my first case automatically go to a particular psychologist?**  
A: No. It starts pending; an approved psychologist chooses to accept it.

**Q: Can two psychologists accept the same pending case?**  
A: The acceptance database operation is designed to assign it atomically to one professional.

**Q: What if my psychologist ignores my case?**  
A: Closing an unaccepted pending case leaves it in the shared pending queue.

**Q: Can I have several topics at once?**  
A: Yes. Each topic is a distinct case with its own title and ID. The UI supports three open chat popups at once.

**Q: Does closing the chat window delete messages?**  
A: No. Closing or minimizing changes only the interface. Messages remain under their case ID.

**Q: Can a solved case be reopened?**  
A: Yes, by the student or assigned psychologist while the professional remains authorized.

**Q: When do trashed messages disappear forever?**  
A: They are eligible for cleanup after 30 days; actual removal depends on the scheduled cleanup job running.

**Q: Can admins inspect every chat?**  
A: Not through the standard admin API. They see metadata and may inspect chats linked to a filed report. Privileged database operators still have broader infrastructure access.

**Q: Can I upload PDF files to a conversation?**  
A: Not yet. The prototype supports optional professional certificate uploads and profile pictures; in-chat files need future development.

**Q: Is this an emergency counseling hotline?**  
A: No. Replies are asynchronous, and SafeTalk should not be used when immediate emergency assistance is required.

**Q: Why are some features unavailable on the public Vercel site?**  
A: Google OAuth, private Blob storage, correct environment variables, successful backend connectivity and cron configuration are separate deployment steps. Review runtime logs and this guide's troubleshooting section.

---

## Final guidance for facilitators

Explain the three separate roles first, then demonstrate the normal case lifecycle: **Student creates → psychologist accepts → private conversation → finish/reopen → optional report/review**. Emphasize the difference between **anonymous-to-professionals** and **absolutely anonymous**, and between **software status labels** and true independently verified clinical credentials. Keep walkthroughs fictional until the platform has undergone security, privacy, legal and clinical review.

**SafeTalk principle:** *Speak without fear. Be heard without judgment.*
