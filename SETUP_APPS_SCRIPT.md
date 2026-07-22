# Google Apps Script Setup: Admin Email Notification

## Overview
This Google Apps Script sends a comprehensive email to the admin (sahulatfamilypk@gmail.com) whenever an application is submitted. It includes all student answers in a formatted, readable email.

## Deployment Steps

### 1. Create New Google Apps Script Project
- Go to https://script.google.com
- Click "New project"
- Name it: "Sahulat Admin Emails"

### 2. Copy and Paste Code
- Delete any default code in `Code.gs`
- Copy all content from `APPS_SCRIPT_ADMIN_EMAIL.gs` in this repository
- Paste into `Code.gs` in Google Apps Script editor

### 3. Deploy as Web App
- Click **Deploy** (top right)
- Select **New deployment**
- Choose **Web app** from dropdown
- Settings:
  - Execute as: (select your admin Gmail account)
  - Who has access: **Anyone**
- Click **Deploy**
- Copy the **Deployment URL** (looks like: `https://script.google.com/macros/d/AK...xyz/usercache`)

### 4. Add Deployment URL to apply.html
Find this line in `apply.html` (search for "send-admin-email"):
```javascript
const ADMIN_EMAIL_ENDPOINT = "https://YOUR_DEPLOYMENT_URL_HERE";
```

Replace `YOUR_DEPLOYMENT_URL_HERE` with the URL you copied in step 3.

Example:
```javascript
const ADMIN_EMAIL_ENDPOINT = "https://script.google.com/macros/d/AK29jW...xyz/usercache";
```

### 5. Test the Setup
- Go to apply.html
- Sign in with your account
- Fill out the questionnaire
- Submit application
- Check admin email (sahulatfamilypk@gmail.com) for comprehensive email

## Email Contents
The admin email includes:
- Application ID
- Student name, email, city
- Academic level (grade, school)
- Family information (mother's name, father's employment, siblings)
- Accessibility needs (disability, internet access, contact preference)
- Full text responses:
  - Financial need (why they need support)
  - Career aspirations (goals and dreams)
  - Character & contribution (why they deserve the scholarship)

## Updating Later
If you need to change the email template or add new fields:

1. Go back to Google Apps Script editor
2. Modify `sendAdminEmail()` function
3. Click **Deploy** → **Update** (don't create new deployment)
4. Select the existing deployment
5. Click **Update**

No need to change the URL in apply.html when updating!

## Troubleshooting

**Email not arriving?**
- Check Gmail spam folder
- Verify deployment URL is correct in apply.html
- Check Google Apps Script Executions log for errors

**Deployment URL not working?**
- Make sure "Who has access" is set to "Anyone"
- Make sure you executed as your Gmail account (not a service account)
- Try creating a new deployment if the old one fails

**Testing without form submission:**
- In Google Apps Script editor, click **Run** on `testEmail()` function
- This sends a test email to admin email
- Check email to verify formatting
