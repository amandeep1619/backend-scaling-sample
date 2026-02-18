import * as SibApiV3Sdk from '@getbrevo/brevo';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

const getBrevoApi = () => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY is missing in .env");

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);
  return apiInstance;
};

export const sendWelcomeEmail = async (email: string, name: string, activationLink: string) => {
  try {
    const templatePath = path.resolve(__dirname, '../templates/welcomeEmail.hbs');
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Email template not found at: ${templatePath}`);
    }

    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    const htmlToSend = template({
      name: name,
      activation_link: activationLink,
    });

    const apiInstance = getBrevoApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "Welcome to iNotes - Activate your account!";
    sendSmtpEmail.htmlContent = htmlToSend;
    sendSmtpEmail.sender = { 
      name: process.env.SENDER_NAME || "iNotes", 
      email: process.env.SENDER_EMAIL || "amandeep.singh@truinc.com" 
    };
    sendSmtpEmail.to = [{ email, name }];

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return result;
  } catch (error: any) {
    throw error;
  }
};