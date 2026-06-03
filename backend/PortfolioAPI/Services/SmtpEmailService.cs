using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.Extensions.Options;
using PortfolioAPI.Models;

namespace PortfolioAPI.Services;

/// <summary>
/// Sends emails via Gmail SMTP using MailKit.
/// Requires a Gmail App Password (not the regular login password).
/// </summary>
public class SmtpEmailService : IEmailService
{
    private readonly EmailSettings _settings;
    private readonly ILogger<SmtpEmailService> _logger;

    public SmtpEmailService(IOptions<EmailSettings> settings, ILogger<SmtpEmailService> logger)
    {
        _settings = settings.Value;
        _logger   = logger;
    }

    public async Task SendContactEmailAsync(string senderName, string senderEmail, string message)
    {
        // ── Build the email message ──────────────────────────────────────────
        var email = new MimeMessage();
        email.From.Add(new MailboxAddress(_settings.SenderName, _settings.SenderEmail));
        email.To.Add(MailboxAddress.Parse(_settings.RecipientEmail));
        email.ReplyTo.Add(new MailboxAddress(senderName, senderEmail));

        email.Subject = $"📬 Portfolio Contact: {senderName}";

        // HTML body — nicely formatted
        var bodyBuilder = new BodyBuilder
        {
            HtmlBody = $"""
                <!DOCTYPE html>
                <html>
                <body style="font-family:Poppins,Arial,sans-serif;background:#050816;color:#fff;padding:32px;">
                  <div style="max-width:540px;margin:0 auto;background:#0d1224;border-radius:16px;
                              border:1px solid rgba(145,94,255,0.3);padding:32px;">
                    <h2 style="background:linear-gradient(90deg,#915EFF,#00FFFF);
                               -webkit-background-clip:text;-webkit-text-fill-color:transparent;
                               margin-bottom:24px;">New Portfolio Message</h2>

                    <table style="width:100%;border-collapse:collapse;">
                      <tr>
                        <td style="padding:10px 0;color:rgba(255,255,255,0.5);width:100px;">From</td>
                        <td style="padding:10px 0;font-weight:600;">{senderName}</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;color:rgba(255,255,255,0.5);">Email</td>
                        <td style="padding:10px 0;">
                          <a href="mailto:{senderEmail}" style="color:#00FFFF;">{senderEmail}</a>
                        </td>
                      </tr>
                    </table>

                    <hr style="border:none;border-top:1px solid rgba(145,94,255,0.2);margin:20px 0;" />

                    <h3 style="color:rgba(255,255,255,0.7);margin-bottom:12px;">Message</h3>
                    <p style="color:rgba(255,255,255,0.85);line-height:1.7;
                              background:rgba(145,94,255,0.06);padding:16px;
                              border-radius:10px;border-left:3px solid #915EFF;">
                      {System.Web.HttpUtility.HtmlEncode(message).Replace("\n", "<br/>")}
                    </p>

                    <p style="margin-top:28px;color:rgba(255,255,255,0.3);font-size:12px;">
                      Sent from Umar Farid's Portfolio Website · {DateTime.UtcNow:dd MMM yyyy, HH:mm} UTC
                    </p>
                  </div>
                </body>
                </html>
                """,

            TextBody = $"""
                New Portfolio Contact Message
                ==============================
                From    : {senderName}
                Email   : {senderEmail}
                Sent    : {DateTime.UtcNow:dd MMM yyyy HH:mm} UTC

                Message:
                {message}
                """
        };

        email.Body = bodyBuilder.ToMessageBody();

        // ── Send via Gmail SMTP ───────────────────────────────────────────────
        using var smtp = new SmtpClient();
        try
        {
            await smtp.ConnectAsync(_settings.SmtpHost, _settings.SmtpPort, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_settings.SenderEmail, _settings.AppPassword);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);

            _logger.LogInformation("Email sent to {Recipient} from {Sender}", _settings.RecipientEmail, senderEmail);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email from {Sender}", senderEmail);
            throw; // Let controller handle the response
        }
    }
}
