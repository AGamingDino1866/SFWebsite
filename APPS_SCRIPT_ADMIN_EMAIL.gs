// Google Apps Script: Sahulat Family Admin Email
// Deploy as web app: Execute as Me (admin account), Allow access to Anyone
// Paste the deployment URL into apply.html as /api/send-admin-email

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    sendAdminEmail(payload);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error in doPost: " + error);
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendAdminEmail(payload) {
  const adminEmail = "sahulatfamilypk@gmail.com";
  const studentName = payload.student_name || "Unknown";
  const applicationId = payload.application_id || "N/A";

  // Build comprehensive HTML email
  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #2c2c85;">
        <div style="background: linear-gradient(135deg, rgba(44,44,133,.95), rgba(44,44,133,.68)); color: white; padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">New Application Received</h1>
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
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">Mother's Name</td>
              <td style="padding: 12px;">${escapeHtml(payload.mother_name || "Not provided")}</td>
            </tr>
            <tr style="background: rgba(44,44,133,.04);">
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">Father's Employment</td>
              <td style="padding: 12px;">${escapeHtml(payload.father_employment || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">Siblings</td>
              <td style="padding: 12px;">${escapeHtml(payload.sibling_count || "Not provided")}</td>
            </tr>
            <tr style="background: rgba(44,44,133,.04);">
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">Family Degree Holder</td>
              <td style="padding: 12px;">${escapeHtml(payload.family_degree || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">Disability/Health Condition</td>
              <td style="padding: 12px;">${escapeHtml(payload.disability || "Not provided")}</td>
            </tr>
            <tr style="background: rgba(44,44,133,.04);">
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">Internet Access</td>
              <td style="padding: 12px;">${escapeHtml(payload.internet_access || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #2c2c85;">Contact Preference</td>
              <td style="padding: 12px;">${escapeHtml(payload.contact_preference || "Not provided")}</td>
            </tr>
          </table>

          <h2 style="color: #2c2c85; margin-top: 30px; font-size: 20px; border-top: 2px solid rgba(44,44,133,.14); padding-top: 20px;">Financial Need</h2>
          <div style="background: rgba(44,44,133,.04); padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap; color: #565680; margin-bottom: 24px;">${escapeHtml(payload.financial_need || "Not provided")}</div>

          <h2 style="color: #2c2c85; margin-top: 30px; font-size: 20px; border-top: 2px solid rgba(44,44,133,.14); padding-top: 20px;">Career Aspirations</h2>
          <div style="background: rgba(44,44,133,.04); padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap; color: #565680; margin-bottom: 24px;">${escapeHtml(payload.career_aspirations || "Not provided")}</div>

          <h2 style="color: #2c2c85; margin-top: 30px; font-size: 20px; border-top: 2px solid rgba(44,44,133,.14); padding-top: 20px;">Character & Contribution</h2>
          <div style="background: rgba(44,44,133,.04); padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap; color: #565680; margin-bottom: 24px;">${escapeHtml(payload.character_contribution || "Not provided")}</div>

          <div style="background: #e8f5f1; border-left: 4px solid #2c2c85; padding: 16px; margin-top: 30px; border-radius: 4px;">
            <p style="margin: 0; color: #2c2c85;"><strong>Next Steps:</strong></p>
            <ul style="margin: 8px 0 0; padding-left: 20px; color: #565680;">
              <li>Review application completeness</li>
              <li>Verify documents (if available)</li>
              <li>Update status in Admin Dashboard</li>
              <li>Send follow-up email to student if needed</li>
            </ul>
          </div>

          <div style="border-top: 1px solid rgba(44,44,133,.14); margin-top: 30px; padding-top: 20px; color: #565680; font-size: 12px;">
            <p style="margin: 0;">Submitted: ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}</p>
            <p style="margin: 8px 0 0;"><a href="https://sahulatafamilytrust.pages.dev/admin.html" style="color: #2c2c85; text-decoration: none;">Open Admin Dashboard</a></p>
          </div>

        </div>

        <div style="background: #2c2c85; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 12px 12px;">
          <p style="margin: 0;">Sahulat Family Scholarship Program</p>
          <p style="margin: 8px 0 0; opacity: 0.8;">Education is the gateway to opportunity</p>
        </div>
      </body>
    </html>
  `;

  const options = {
    htmlBody: htmlBody,
    from: "sahulatfamilypk@gmail.com",
    replyTo: payload.email || "sahulatfamilypk@gmail.com"
  };

  GmailApp.sendEmail(adminEmail, `[Sahulat] New Application: ${studentName}`, "", options);
  Logger.log("Admin email sent for application: " + applicationId);
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

// For testing: delete this after deployment
function testEmail() {
  const testPayload = {
    application_id: "SF2026-TEST1",
    student_name: "Test Student",
    email: "test@example.com",
    city: "Karachi",
    grade: "Class 10",
    school: "Test School",
    mother_name: "Mother Name",
    father_employment: "Employed",
    sibling_count: "2",
    family_degree: "No",
    disability: "No",
    internet_access: "Sometimes unreliable",
    contact_preference: "WhatsApp",
    financial_need: "My family faces financial hardship because of medical expenses.",
    career_aspirations: "I want to become an engineer.",
    character_contribution: "I am hardworking and committed to my studies."
  };
  sendAdminEmail(testPayload);
  Logger.log("Test email sent!");
}
