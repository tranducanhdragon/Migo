using AutoMapper;
using Core.Properties;
using Core.Repository;
using Core.Service.Base;
using EntityFramework.Entity;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System.Threading;
using MimeKit;

namespace Core.Service
{
    public class EmailModel
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public interface IEmailService
    {
        DataResult<EmailModel> SendEmailToGetResetPass(EmailModel model);
    }
    public class EmailService : IEmailService
    {
        [Obsolete]
        public DataResult<EmailModel> SendEmailToGetResetPass(EmailModel email)
        {
            try
            {
                string[] Scopes = { GmailService.Scope.GmailReadonly, GmailService.Scope.GmailModify };
                string ApplicationName = "Gmail API .NET Quickstart";
                UserCredential credential;
                //read credentials file
                using (FileStream stream = new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
                {
                    string credPath = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
                    credPath = Path.Combine(credPath, ".credentials/gmail-dotnet-quickstart.json");
                    credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                        GoogleClientSecrets.Load(stream).Secrets,
                        Scopes,
                        "user",
                        CancellationToken.None, 
                        new FileDataStore(credPath, true)
                    ).Result;
                }

                //create a reset password
                var resetPass = "123456";
                string plainText = "Your reset password is: " + resetPass;

                //call gmail service
                var service = new GmailService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = ApplicationName,
                });

                //var newMsg = new Google.Apis.Gmail.v1.Data.Message();
                //newMsg.Raw = Base64UrlEncode(plainText.ToString());
                //service.Users.Messages.Send(newMsg, "me").Execute();

                //using mimekit
                var mailMessage = new System.Net.Mail.MailMessage();
                mailMessage.From = new System.Net.Mail.MailAddress(email.Email);
                mailMessage.To.Add(email.To);
                mailMessage.ReplyToList.Add(email.Email);
                mailMessage.Subject = "Reset code from Migo";
                mailMessage.Body = plainText;
                mailMessage.IsBodyHtml = false;

                //Attachment file
                //foreach (System.Net.Mail.Attachment attachment in email.Attachments)
                //{
                //    mailMessage.Attachments.Add(attachment);
                //}

                var mimeMessage = MimeKit.MimeMessage.CreateFromMailMessage(mailMessage);

                var gmailMessage = new Google.Apis.Gmail.v1.Data.Message
                {
                    Raw = Encode(mimeMessage)
                };

                Google.Apis.Gmail.v1.UsersResource.MessagesResource.SendRequest request = service.Users.Messages.Send(gmailMessage, "me");

                request.Execute();

                return DataResult<EmailModel>.ResultSuccess(resetPass, Resources.Get_All_Success);
            }
            catch (Exception e)
            {
                return DataResult<EmailModel>.ResultError(e.Message, Resources.Register_Fail);
            }
        }
        public static string Base64UrlEncode(string input)
        {
            var inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
            return Convert.ToBase64String(inputBytes).Replace("+", "-").Replace("/", "_").Replace("=", "");
        }
        public static string Encode(MimeMessage mimeMessage)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                mimeMessage.WriteTo(ms);
                return Convert.ToBase64String(ms.GetBuffer())
                    .TrimEnd('=')
                    .Replace('+', '-')
                    .Replace('/', '_');
            }
        }

    }
}
