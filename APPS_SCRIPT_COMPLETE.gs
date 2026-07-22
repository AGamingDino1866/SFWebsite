// Google Apps Script: Sahulat Family Scholarship - Complete Email System
// Handles: (1) Autoreply to incoming emails, (2) Admin notification on app submission
// Setup: See APPS_SCRIPT_SETUP.md

const SCHOLARSHIP_EMAIL = "sahulatfamilypk@gmail.com";
const REPLIED_LABEL = "Sahulat/Autoreply Sent"; // Label to track already-replied emails

// ============================================================================
// AUTOREPLY TO INCOMING EMAILS (Triggered automatically by Gmail)
// ============================================================================

function setupTrigger() {
  // Call this function ONCE to set up the trigger
  // It will auto-run whenever someone emails the scholarship mailbox
  ScriptApp.newTrigger("handleIncomingEmail")
    .onReceive()
    .create();
  Logger.log("✓ Autoreply trigger installed! New emails will get automatic responses.");
}

function handleIncomingEmail(e) {
  try {
    const message = e.message;
    const from = message.getFrom();
    const subject = message.getSubject();

    // Check if we already replied to this email thread
    if (hasAlreadyReplied(message)) {
      Logger.log("Skipping - already replied to: " + from);
      return;
    }

    // Send welcome autoreply
    const replySubject = subject.includes("Re:") ? subject : "Re: " + subject;
    const replyBody = getAutoreplyBody(from, subject);

    GmailApp.sendEmail(from, replySubject, replyBody, {
      htmlBody: replyBody,
      replyTo: SCHOLARSHIP_EMAIL
    });

    // Mark thread as replied using label
    const thread = message.getThread();
    let label = GmailApp.getUserLabelByName(REPLIED_LABEL);
    if (!label) {
      label = GmailApp.createLabel(REPLIED_LABEL);
    }
    thread.addLabel(label);

    Logger.log("✓ Autoreply sent to: " + from);
  } catch (error) {
    Logger.log("Error in handleIncomingEmail: " + error);
  }
}

function hasAlreadyReplied(message) {
  try {
    const thread = message.getThread();
    const label = GmailApp.getUserLabelByName(REPLIED_LABEL);
    if (!label) return false;
    return thread.getLabels().some(l => l.getName() === REPLIED_LABEL);
  } catch (e) {
    return false;
  }
}

function getAutoreplyBody(fromEmail, originalSubject) {
  const studentName = extractNameFromEmail(fromEmail);

  return `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2c2c85;">
        <div style="background: linear-gradient(135deg, rgba(44,44,133,.95), rgba(44,44,133,.68)); color: white; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 22px;">Welcome to Sahulat Family Scholarship!</h1>
        </div>

        <div style="background: white; padding: 28px; border: 1px solid rgba(44,44,133,.14); border-top: none;">
          <p style="color: #2c2c85; margin-top: 0; font-size: 16px;"><strong>Dear ${escapeHtml(studentName)},</strong></p>

          <p style="color: #565680; line-height: 1.7;">Thank you for reaching out to us! We received your email and really appreciate your interest in the Sahulat Family Scholarship Program.</p>

          <div style="background: #f0f0f7; padding: 18px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #2c2c85;">
            <p style="margin: 0 0 12px; color: #2c2c85; font-weight: bold;">Here's how we can help:</p>
            <ul style="margin: 8px 0; padding-left: 20px; color: #565680;">
              <li><strong>Apply for scholarship:</strong> Visit <a href="https://sahulatafamilytrust.pages.dev/apply.html" style="color: #2c2c85; text-decoration: none;">Apply Page</a> and answer 14 quick questions</li>
              <li><strong>Check application status:</strong> Go to <a href="https://sahulatafamilytrust.pages.dev/status.html" style="color: #2c2c85; text-decoration: none;">Status Page</a> and enter your Application ID</li>
              <li><strong>Read FAQs:</strong> Visit <a href="https://sahulatafamilytrust.pages.dev/faq.html" style="color: #2c2c85; text-decoration: none;">FAQ Page</a> for common questions</li>
              <li><strong>Need help writing your application?</strong> Use our <a href="https://sahulatafamilytrust.pages.dev/ask-ai.html" style="color: #2c2c85; text-decoration: none;">Ask AI assistant</a> (150 free messages/day)</li>
            </ul>
          </div>

          <h3 style="color: #2c2c85; margin-top: 24px; font-size: 15px;">Application Timeline:</h3>
          <table style="width: 100%; color: #565680; margin: 12px 0;">
            <tr>
              <td style="padding: 8px 0; width: 100px;"><strong>1-2 days</strong></td>
              <td>We confirm receipt of your application</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>1-2 weeks</strong></td>
              <td>We review and verify your documents</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>2-4 weeks</strong></td>
              <td>We send you our decision by email</td>
            </tr>
          </table>

          <p style="color: #565680; line-height: 1.7; margin-top: 20px;">If you have any specific questions or concerns, feel free to reply to this email and we'll get back to you within 24 hours.</p>

          <p style="color: #565680; margin-bottom: 0;"><strong>Best regards,</strong><br>Sahulat Family Scholarship Team</p>
        </div>

        <div style="background: #2c2c85; color: white; padding: 16px; text-align: center; font-size: 12px; border-radius: 0 0 12px 12px;">
          <p style="margin: 0;">Education is the gateway to opportunity</p>
          <p style="margin: 6px 0 0; opacity: 0.8;">sahulatfamilypk@gmail.com</p>
        </div>
      </body>
    </html>
  `;
}

function extractNameFromEmail(email) {
  // Try to extract name from email (e.g., "ali.ahmed@gmail.com" → "Ali Ahmed")
  const namePart = email.split("@")[0].replace(/[._-]/g, " ");
  return namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase() || "Friend";
}

// ============================================================================
// ADMIN NOTIFICATION ON APPLICATION SUBMISSION (Called from apply.html)
// ============================================================================

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    // Only send admin email if it's an application submission
    if (payload.application_id && payload.student_name) {
      sendAdminNotification(payload);
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error in doPost: " + error);
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendAdminNotification(payload) {
  const adminEmail = "sahulatfamilypk@gmail.com";
  const studentName = payload.student_name || "Unknown";
  const applicationId = payload.application_id || "N/A";

  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #2c2c85;">
        <div style="background: linear-gradient(135deg, rgba(44,44,133,.95), rgba(44,44,133,.68)); color: white; padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">📋 New Application Received</h1>
          <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9;">Application ID: <strong>${escapeHtml(applicationId)}</strong></p>
        </div>

        <div style="background: white; padding: 30px; border: 1px solid rgba(44,44,133,.14); border-top: none;">

          <h2 style="color: #2c2c85; margin-top: 0; font-size: 20px;">Student Information</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr style="background: rgba(44,44,133,.04);">
              <td style="padding: 12px; font-weight: bold; width: 40%; color: #2c2c85;">Name</td>
              <td style="padding: 12px;">${escapeHtml(payload.student_name || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">Email</td>
              <td style="padding: 12px;">${escapeHtml(payload.email || "Not provided")}</td>
            </tr>
            <tr style="background: rgba(44,44,133,.04);">
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">City</td>
              <td style="padding: 12px;">${escapeHtml(payload.city || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">Grade/Year</td>
              <td style="padding: 12px;">${escapeHtml(payload.grade || "Not provided")}</td>
            </tr>
            <tr style="background: rgba(44,44,133,.04);">
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">School</td>
              <td style="padding: 12px;">${escapeHtml(payload.school || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">Father's Employment</td>
              <td style="padding: 12px;">${escapeHtml(payload.father_employment || "Not provided")}</td>
            </tr>
            <tr style="background: rgba(44,44,133,.04);">
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">Contact Preference</td>
              <td style="padding: 12px;">${escapeHtml(payload.contact_preference || "Not provided")}</td>
            </tr>
          </table>

          <h2 style="color: #2c2c85; margin-top: 30px; font-size: 18px; border-top: 2px solid rgba(44,44,133,.14); padding-top: 20px;">📝 Why They Need Support</h2>
          <div style="background: rgba(44,44,133,.04); padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap; color: #565680; margin-bottom: 24px; max-height: 200px; overflow-y: auto;">${escapeHtml(payload.financial_need || "Not provided")}</div>

          <h2 style="color: #2c2c85; margin-top: 30px; font-size: 18px; border-top: 2px solid rgba(44,44,133,.14); padding-top: 20px;">🎯 Career Goals</h2>
          <div style="background: rgba(44,44,133,.04); padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap; color: #565680; margin-bottom: 24px; max-height: 200px; overflow-y: auto;">${escapeHtml(payload.career_aspirations || "Not provided")}</div>

          <h2 style="color: #2c2c85; margin-top: 30px; font-size: 18px; border-top: 2px solid rgba(44,44,133,.14); padding-top: 20px;">⭐ Why They Deserve This Scholarship</h2>
          <div style="background: rgba(44,44,133,.04); padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap; color: #565680; margin-bottom: 24px; max-height: 200px; overflow-y: auto;">${escapeHtml(payload.character_contribution || "Not provided")}</div>

          <div style="background: #e8f5f1; border-left: 4px solid #2c2c85; padding: 16px; margin-top: 30px; border-radius: 4px;">
            <p style="margin: 0; color: #2c2c85;"><strong>Next Steps:</strong></p>
            <ul style="margin: 8px 0 0; padding-left: 20px; color: #565680;">
              <li>Review in admin dashboard</li>
              <li>Verify documents if needed</li>
              <li>Update status to "Under Review"</li>
              <li>Send follow-up or approval email</li>
            </ul>
          </div>

          <div style="border-top: 1px solid rgba(44,44,133,.14); margin-top: 30px; padding-top: 20px; color: #565680; font-size: 12px;">
            <p style="margin: 0;">⏰ Submitted: ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}</p>
            <p style="margin: 12px 0 0;"><a href="https://sahulatafamilytrust.pages.dev/admin.html" style="color: #2c2c85; text-decoration: none; font-weight: bold;">→ Open Admin Dashboard</a></p>
          </div>

        </div>

        <div style="background: #2c2c85; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 12px 12px;">
          <p style="margin: 0;">Sahulat Family Scholarship Program</p>
          <p style="margin: 8px 0 0; opacity: 0.8;">Education is the gateway to opportunity</p>
        </div>
      </body>
    </html>
  `;

  GmailApp.sendEmail(adminEmail, `[Sahulat] New Application: ${studentName}`, "", { htmlBody: htmlBody });
  Logger.log("Admin notification sent for application: " + applicationId);
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================================
// TEST FUNCTIONS (Delete after testing)
// ============================================================================

function testAutoReply() {
  // Simulates an incoming email and sends test autoreply
  const testEmail = "test@example.com";
  const testSubject = "Scholarship Application Question";
  const replyBody = getAutoreplyBody(testEmail, testSubject);

  GmailApp.sendEmail(testEmail, "Re: " + testSubject, testReplyBody, { htmlBody: replyBody });
  Logger.log("✓ Test autoreply sent to: " + testEmail);
}

function testAdminNotification() {
  // Simulates a new application submission
  const testPayload = {
    application_id: "SF2026-TEST1",
    student_name: "Test Student",
    email: "student@example.com",
    city: "Karachi",
    grade: "Class 10",
    school: "Test School",
    father_employment: "Self-employed",
    contact_preference: "WhatsApp",
    financial_need: "Our family struggles because my father's business had losses. We need help to keep me in school.",
    career_aspirations: "I want to become a software engineer and help my family.",
    character_contribution: "I work hard in school and volunteer at my community center."
  };
  sendAdminNotification(testPayload);
  Logger.log("✓ Test admin notification sent!");
}
