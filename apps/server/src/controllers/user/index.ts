import type { FastifyRequest, FastifyReply } from "fastify";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  type CreateUserType,
  type LoginUserType,
  type UpdateUserType,
} from "../../shcemas/user-schema";
import { db } from "../../lib/prisma/client/db";
import { CustomError } from "../../middlewares/error-handler";
import bcrypt from "bcryptjs";

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

    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        createdAt: true,
      },
    });

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
}
