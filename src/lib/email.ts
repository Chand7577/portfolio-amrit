import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, subject, message } = data;

  const html = `
    <div style="font-family:'Space Grotesk',sans-serif;max-width:600px;margin:0 auto;background:#0d1117;color:#f0f6fc;padding:32px;border-radius:12px;border:1px solid #1e2a3a">
      <h2 style="color:#06b6d4;margin:0 0 24px">📬 New Portfolio Message</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <tr><td style="padding:8px 0;color:#8b949e;width:80px">From</td><td style="padding:8px 0;font-weight:500">${name}</td></tr>
        <tr><td style="padding:8px 0;color:#8b949e">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#06b6d4">${email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#8b949e">Subject</td><td style="padding:8px 0">${subject}</td></tr>
      </table>
      <div style="background:#050810;border-radius:8px;padding:20px;border:1px solid #1e2a3a">
        <p style="margin:0;white-space:pre-wrap;line-height:1.6">${message}</p>
      </div>
      <p style="margin:24px 0 0;color:#484f58;font-size:12px">Sent from amritchand.dev portfolio contact form.</p>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL || "amrit@example.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
