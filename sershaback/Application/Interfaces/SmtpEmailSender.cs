using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
namespace Application.Interfaces
{
    public class SmtpEmailSender : IEmailSender
    {
        private readonly string _smtpHost;
        private readonly int _smtpPort;
        private readonly string _smtpUser;
        private readonly string _smtpPass;
        public SmtpEmailSender(string smtpHost, int smtpPort, string smtpUser, string smtpPass)
        {
            this._smtpPass = smtpPass;
            this._smtpUser = smtpUser;
            this._smtpPort = smtpPort;
            this._smtpHost = smtpHost;
        }

        public async Task SendEmailAsync(string email, string subject, string message){
            var smtpClient = new SmtpClient(_smtpHost)
            {
                Port = _smtpPort,
                Credentials = new NetworkCredential(_smtpUser, _smtpPass),
                EnableSsl = true,
            };
            Console.WriteLine(_smtpUser);
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpUser),
                Subject = subject,
                Body = message,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(email);
            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}