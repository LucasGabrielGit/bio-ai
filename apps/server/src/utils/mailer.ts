import nodemailer from "nodemailer";

// Para desenvolvimento local, podemos usar Ethereal Email (https://ethereal.email/)
// Ele intercepta os emails e os exibe em uma interface web
const createTransporter = async () => {
  // Use variáveis de ambiente na produção
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Cria uma conta de teste Ethereal automaticamente para ambiente local
  const testAccount = await nodemailer.createTestAccount();
  console.log("📨 Conta de E-mail de Teste Ethereal criada:", testAccount.user);

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true para port 465
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = await createTransporter();
    
    const info = await transporter.sendMail({
      from: '"AutoBio Equipe" <noreply@autobio.app>', // Sender
      to, // Receiver
      subject, // Subject line
      html, // HTML body
    });

    console.log("💌 Mensagem enviada com sucesso: %s", info.messageId);
    
    // Se for Ethereal (teste), exibe a URL onde podemos ler o email!
    if (info.messageId && !process.env.SMTP_HOST) {
      console.log("👀 Preview do E-mail: %s", nodemailer.getTestMessageUrl(info));
    }

    return true;
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return false;
  }
};
