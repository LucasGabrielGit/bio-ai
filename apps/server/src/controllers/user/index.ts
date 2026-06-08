import type { FastifyRequest, FastifyReply } from "fastify";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type CreateUserType,
  type LoginUserType,
  type UpdateUserType,
  type ForgotPasswordType,
  type ResetPasswordType,
} from "../../shcemas/user-schema";
import { db } from "../../lib/prisma/client/db";
import { CustomError } from "../../middlewares/error-handler";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../../utils/mailer";

export class UserController {
  async create(
    req: FastifyRequest<{ Body: CreateUserType }>,
    res: FastifyReply,
  ) {
    const data = createUserSchema.parse(req.body);

    const existing = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new CustomError(
        "E-mail já cadastrado",
        400,
        "EMAIL_ALREADY_EXISTS",
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        verificationToken,
      },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    const verifyUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-email?token=${verificationToken}`;
    
    await sendEmail(
      user.email,
      "Bem-vindo(a)! Confirme seu e-mail.",
      `<h1>Olá, ${user.name}!</h1><p>Obrigado por se cadastrar. Por favor, clique no link abaixo para confirmar seu e-mail:</p><a href="${verifyUrl}">${verifyUrl}</a>`
    );

    const token = await res.jwtSign(
      {
        id: user.id,
        email: user.email,
        plan: user.plan,
        name: user.name,
      },
      {
        expiresIn: "1h",
      },
    );

    req.log.info({ userId: user.id }, "Usuário criado com sucesso");

    return res.status(201).send({
      message: "Usuário criado com sucesso",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
    });
  }

  async login(req: FastifyRequest<{ Body: LoginUserType }>, res: FastifyReply) {
    const data = loginUserSchema.parse(req.body);

    const user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new CustomError(
        "E-mail ou senha inválidos",
        400,
        "INVALID_CREDENTIALS",
      );
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      String(user.password),
    );

    if (!isPasswordValid) {
      throw new CustomError(
        "E-mail ou senha inválidos",
        400,
        "INVALID_CREDENTIALS",
      );
    }

    const token = await res.jwtSign(
      {
        id: user.id,
        email: user.email,
        plan: user.plan,
        name: user.name,
      },
      {
        expiresIn: "1h",
      },
    );

    req.log.info({ userId: user.id }, "Login realizado com sucesso");

    return res.status(200).send({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        emailVerified: user.emailVerified,
      },
    });
  }

  async getUser(req: FastifyRequest, res: FastifyReply) {
    const decoded = (await req.jwtVerify()) as { id: string };

    const user = await db.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        bio: true,
        website: true,
        location: true,
        name: true,
        plan: true,
        emailVerified: true,
        bios: true,
      },
    });

    if (!user) {
      throw new CustomError("Usuário não encontrado", 404, "USER_NOT_FOUND");
    }

    return res.status(200).send({
      user,
    });
  }

  async update(
    req: FastifyRequest<{ Body: UpdateUserType }>,
    res: FastifyReply,
  ) {
    const data = updateUserSchema.parse(req.body);

    const user = await db.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      throw new CustomError("Usuário não encontrado", 404, "USER_NOT_FOUND");
    }

    if (data.email && data.email !== user.email) {
      const existing = await db.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existing) {
        throw new CustomError(
          "E-mail já cadastrado",
          400,
          "EMAIL_ALREADY_EXISTS",
        );
      }
    }

    let hashedPassword = user.password;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        bio: data.bio,
        website: data.website,
        location: data.location,
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        website: true,
        location: true,
        plan: true,
        bios: true,
      },
    });

    req.log.info({ userId: user.id }, "Usuário atualizado com sucesso");

    return res.status(200).send({
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    });
  }

  async verifyEmail(req: FastifyRequest<{ Querystring: { token: string } }>, res: FastifyReply) {
    const { token } = req.query;

    if (!token) {
      throw new CustomError("Token inválido", 400, "INVALID_TOKEN");
    }

    const user = await db.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new CustomError("Token inválido ou expirado", 400, "INVALID_TOKEN");
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
      },
    });

    return res.status(200).send({ message: "E-mail verificado com sucesso" });
  }

  async resendVerification(req: FastifyRequest, res: FastifyReply) {
    const user = await db.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new CustomError("Usuário não encontrado", 404, "USER_NOT_FOUND");
    }

    if (user.emailVerified) {
      throw new CustomError("E-mail já verificado", 400, "ALREADY_VERIFIED");
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    await db.user.update({
      where: { id: user.id },
      data: { verificationToken },
    });

    const verifyUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-email?token=${verificationToken}`;
    
    await sendEmail(
      user.email,
      "Confirme seu e-mail",
      `<h1>Olá, ${user.name}!</h1><p>Clique no link abaixo para confirmar seu e-mail:</p><a href="${verifyUrl}">${verifyUrl}</a>`
    );

    return res.status(200).send({ message: "E-mail de verificação reenviado" });
  }

  async forgotPassword(req: FastifyRequest<{ Body: ForgotPasswordType }>, res: FastifyReply) {
    const data = forgotPasswordSchema.parse(req.body);

    const user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      // Retorna sucesso mesmo se não existir para não vazar emails
      return res.status(200).send({ message: "Se o e-mail existir, você receberá um link de redefinição." });
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hora

    await db.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken,
        resetPasswordExpires,
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/redefinir-senha?token=${resetPasswordToken}`;
    
    await sendEmail(
      user.email,
      "Redefinição de Senha",
      `<h1>Olá, ${user.name}!</h1><p>Você solicitou a redefinição de senha. Clique no link abaixo para redefinir:</p><a href="${resetUrl}">${resetUrl}</a><p>Se você não solicitou, ignore este e-mail.</p>`
    );

    return res.status(200).send({ message: "Se o e-mail existir, você receberá um link de redefinição." });
  }

  async resetPassword(req: FastifyRequest<{ Body: ResetPasswordType }>, res: FastifyReply) {
    const data = resetPasswordSchema.parse(req.body);

    const user = await db.user.findFirst({
      where: {
        resetPasswordToken: data.token,
        resetPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new CustomError("Token inválido ou expirado", 400, "INVALID_TOKEN");
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return res.status(200).send({ message: "Senha redefinida com sucesso" });
  }
}
