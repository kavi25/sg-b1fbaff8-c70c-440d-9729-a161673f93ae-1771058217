import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Sending contact email for:", { name, email });

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: "ITProBit Contact Form <noreply@itprobit.com>",
      to: "info@itprobit.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
                padding: 15px;
                background: white;
                border-left: 4px solid #667eea;
                border-radius: 5px;
              }
              .field-label {
                font-weight: bold;
                color: #667eea;
                margin-bottom: 5px;
              }
              .field-value {
                color: #333;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e0e0e0;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🎯 New Contact Form Submission</h1>
              <p>ITProBit Website - ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">👤 Name:</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">📧 Email:</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${phone ? `
              <div class="field">
                <div class="field-label">📱 Phone:</div>
                <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ` : ""}
              ${service ? `
              <div class="field">
                <div class="field-label">🎯 Service Interested In:</div>
                <div class="field-value">${service}</div>
              </div>
              ` : ""}
              <div class="field">
                <div class="field-label">💬 Message:</div>
                <div class="field-value">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the ITProBit contact form</p>
              <p>Reply directly to this email to contact ${name}</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Admin email sent:", adminEmail.data?.id);

    // Send auto-reply to customer
    const customerEmail = await resend.emails.send({
      from: "ITProBit <noreply@itprobit.com>",
      to: email,
      subject: "Thank you for contacting ITProBit",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .logo {
                font-size: 36px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
              }
              .contact-info {
                background: white;
                padding: 20px;
                border-radius: 5px;
                margin-top: 20px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e0e0e0;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">ITProBit</div>
              <h2>Thank You for Reaching Out!</h2>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              
              <p>Thank you for contacting ITProBit! We've received your message and our team will get back to you within 24 hours.</p>
              
              <p><strong>Your submission details:</strong></p>
              <div class="contact-info">
                <p><strong>Service:</strong> ${service || "General Inquiry"}</p>
                <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
              </div>
              
              <p>In the meantime, feel free to explore our services:</p>
              
              <center>
                <a href="https://netjs.itprobit.com/services" class="cta-button">View Our Services</a>
              </center>
              
              <div class="contact-info">
                <p><strong>📞 Phone:</strong> <a href="tel:+447718320149">+44 7718 320149</a></p>
                <p><strong>📧 Email:</strong> <a href="mailto:info@itprobit.com">info@itprobit.com</a></p>
                <p><strong>🌐 Website:</strong> <a href="https://netjs.itprobit.com">netjs.itprobit.com</a></p>
              </div>
              
              <p>We look forward to working with you!</p>
              
              <p>Best regards,<br><strong>The ITProBit Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ITProBit. All rights reserved.</p>
              <p>123 Tech Street, London, United Kingdom, SW1A 1AA</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Customer email sent:", customerEmail.data?.id);

    return res.status(200).json({
      success: true,
      adminEmailId: adminEmail.data?.id,
      customerEmailId: customerEmail.data?.id,
    });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return res.status(500).json({
      error: "Failed to send email",
      details: error.message,
    });
  }
}