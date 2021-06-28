import { resolve } from 'path'
import handlebars from 'handlebars';
import fs from 'fs';


const emailPath = resolve(__dirname, "..", "..", "views", "emails", "errorMail.hbs");
const templateFileContent = fs.readFileSync(emailPath).toString('utf-8');

const mailTemplateParseClient = handlebars.compile(templateFileContent);

interface JobError {
  code: string
  error: string
}

const CreateMessage = ({code, error}: JobError) => {

  const date = new Date;
  
  const html = mailTemplateParseClient({ 
    code, 
    error, 
    date,
    baseUrl: process.env.URL
  })

  const msg = {
    to: process.env.SMTP_EMAIL_TO!,
    from: `Mozeconomia <${process.env.SMTP_EMAIL_FROM}>`,
    subject: `ERROR Code ${code}`,
    text: `
      ${error} 

      Data e hora: ${date}
    `,
    html: html
  }
  
  return msg;
}

export default CreateMessage;