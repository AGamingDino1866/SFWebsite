# Google Apps Script Setup: Complete Email System

## What This Does

**Two-part email system:**

1. **Autoreply to Incoming Emails** - Anyone who emails sahulatfamilypk@gmail.com gets an automatic welcome response with links to apply, check status, get help, etc.

2. **Admin Notification on Applications** - When a student submits an application, you get a comprehensive email with all their answers (financial need, career goals, character, etc.)

Both work automatically after setup.

---

## Installation (One-Time Setup)

### Step 1: Create Google Apps Script Project

1. Go to **https://script.google.com**
2. Click **New Project**
3. Name it: "Sahulat Family Scholarship Email System"
4. Delete any default code

### Step 2: Add the Code

1. Copy the entire contents of `APPS_SCRIPT_COMPLETE.gs` from this repo
2. Paste into the `Code.gs` file in Google Apps Script editor
3. **Save the project** (Ctrl+S)

### Step 3: Deploy as Web App

This enables applications to send data to trigger admin emails.

1. Click **Deploy** (top right) → **New Deployment**
2. Select **Web App** from dropdown (icon looks like a circle with arrow)
3. Settings:
   - **Execute as:** (Select your admin Gmail account - sahulatfamilypk@gmail.com)
   - **Who has access:** "Anyone"
4. Click **Deploy**
5. Copy the **Deployment URL** (looks like: `https://script.google.com/macros/d/Ak...xyz/usercache`)
6. Save this URL - you'll need it in Step 4

### Step 4: Add Deployment URL to apply.html

1. Open `apply.html` in your editor
2. Find this line (around line 43):
   ```javascript
   const ADMIN_EMAIL_ENDPOINT = "https://script.google.com/macros/d/REPLACE_WITH_YOUR_APPS_SCRIPT_URL/usercache";
   ```
3. Replace `REPLACE_WITH_YOUR_APPS_SCRIPT_URL` with your actual URL from Step 3
4. Example:
   ```javascript
   const ADMIN_EMAIL_ENDPOINT = "https://script.google.com/macros/d/AK29jW8x...xyz/usercache";
   ```
5. Save `apply.html`
6. Commit and push to main

### Step 5: Install Autoreply Trigger

This makes the script auto-run whenever someone emails the scholarship mailbox.

1. Go back to Google Apps Script editor (script.google.com)
2. Find the `setupTrigger` function in the code
3. Click **Run** (play button)
   - First time, Google asks for permissions → Click "Review permissions" → "Allow"
   - You'll see: "✓ Autoreply trigger installed!"
4. **Check that trigger was created:**
   - Go to **Triggers** (left sidebar, looks like a clock)
   - You should see `handleIncomingEmail` listed
   - Event: "On Receive" (Gmail receives email)

### Step 6: Test Both Systems

#### Test Autoreply (Incoming Email Response)

1. Send an email to **sahulatfamilypk@gmail.com** from any email address
2. You should get an autoreply within 30 seconds
3. Check spam folder if you don't see it
4. The autoreply includes:
   - Welcome message
   - Links to Apply, Status Check, FAQ, Ask AI
   - Timeline (1-2 days to review, 2-4 weeks to decision)

#### Test Admin Notification (Application Submission)

1. Go to https://sahulatafamilytrust.pages.dev/apply.html
2. Sign in with a Google account
3. Answer all 14 questions
4. Submit application
5. Check admin inbox (sahulatfamilypk@gmail.com)
6. You should see an email with the subject: `[Sahulat] New Application: [Student Name]`
7. Email includes all student details + all their essay answers

---

## How It Works

### Autoreply Flow

```
Someone emails sahulatfamilypk@gmail.com
                     ↓
Gmail triggers: handleIncomingEmail()
                     ↓
Script checks if already replied (using "Sahulat/Autoreply Sent" label)
                     ↓
If not replied yet:
  - Send welcome email with instructions
  - Label email thread as "Replied"
  - Log the action
                     ↓
Next email from same person: Check shows "already replied" → Skip
```

### Admin Notification Flow

```
Student fills out apply.html form (all 14 questions)
                     ↓
Clicks "Submit Application"
                     ↓
Data saved to Firestore ✓
                     ↓
POST sent to Apps Script deployment URL
                     ↓
Apps Script doPost() function receives payload
                     ↓
sendAdminNotification() formats beautiful HTML email
                     ↓
Admin receives email at sahulatfamilypk@gmail.com
```

---

## Managing the System

### View/Disable Autoreply Trigger

1. Open Google Apps Script: **script.google.com**
2. Click **Triggers** (left sidebar)
3. See `handleIncomingEmail` trigger
4. To disable: Click three dots → Delete
5. To re-enable: Run `setupTrigger()` function again

### Stop Sending Admin Emails

If you temporarily don't want admin notifications:
1. Edit line in `apply.html`
2. Comment out: `const ADMIN_EMAIL_ENDPOINT = ...`
3. Or set it to: `const ADMIN_EMAIL_ENDPOINT = "";`
4. Re-deploy

### Customize Autoreply Message

Edit `getAutoreplyBody()` function in Google Apps Script:
- Change welcome text
- Update links
- Modify timeline
- Save and trigger redeploys automatically

### Customize Admin Email

Edit `sendAdminNotification()` function:
- Change subject line
- Reorganize sections
- Add/remove fields
- Change styling

---

## Troubleshooting

### Autoreply not arriving

**Check:**
- Trigger exists: Go to Triggers → See `handleIncomingEmail` listed?
- Gmail spam folder (auto-replies sometimes flagged as spam)
- Script logs: Click **Executions** tab in Apps Script → Check for errors
- Email not from noreply address (Gmail blocks auto-replies to no-reply accounts)

**Fix:**
- If no trigger: Run `setupTrigger()` manually
- If in spam: Not much we can do (Gmail's filter), but usually improves over time
- Check logs for error messages

### Admin notification not arriving

**Check:**
- Deployment URL correct in apply.html?
- Student submitted form successfully? (Check Firestore in Firebase Console)
- Check Google Apps Script Executions log for POST errors
- Deployment URL accessible? (Try in browser - should show error page, not blank)

**Fix:**
- Update deployment URL in apply.html
- Re-deploy the web app if changed
- Check Firebase console to verify application was saved

### "Permission denied" when running setupTrigger()

**Normal first-time behavior:**
- Google asks for permissions
- Click "Review permissions"
- Select your admin Gmail account
- Click "Allow"

If stuck:
- Go to: https://myaccount.google.com/permissions
- Revoke "Google Apps Script" access
- Run `setupTrigger()` again

---

## Advanced

### Check Autoreply Logs

Google Apps Script logs show every autoreply sent:

1. Open Google Apps Script: script.google.com
2. Click **Executions** (left sidebar)
3. See list of function runs with timestamps
4. Click any row to see logs
5. Look for: "✓ Autoreply sent to: [email]"

### Manual Test Functions

To test without real emails/submissions:

1. Run `testAutoReply()` - Sends test autoreply to test@example.com
2. Run `testAdminNotification()` - Sends test admin email

(Delete these functions after testing - they're just for development)

### Check Email Labels

The autoreply creates a label to track replied emails:

1. Open Gmail
2. Go to Settings → Labels
3. Look for: "Sahulat/Autoreply Sent"
4. Click to see all emails already replied to
5. If needed, delete label to allow new replies to same people

---

## Support

If things aren't working:

1. Check Google Apps Script Executions log for errors
2. Verify deployment URL is correct and has "Anyone" access
3. Check Gmail spam folder
4. Run test functions to see if script works at all
5. Check Firebase console to see if application data was saved
