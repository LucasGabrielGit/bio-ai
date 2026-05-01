import type { FastifyRequest, FastifyReply } from "fastify";
import type { ZodSchema } from "zod";

export interface ValidationOptions {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

export const createValidationMiddleware = (schemas: ValidationOptions) => {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    try {
      if (schemas.body && request.body) {
        request.body = schemas.body.parse(request.body);
      }
      if (schemas.params && request.params) {
        request.params = schemas.params.parse(request.params);
      }
      if (schemas.query && request.query) {
        request.query = schemas.query.parse(request.query);
      }
    } catch (error) {
      throw error;
    }
  };
};
export const sanitizeStrings = (obj: any): any => {
  if (typeof obj === "string") {
    return obj.trim().replace(/[<>]/g, "");
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeStrings);
  }

  if (obj && typeof obj === "object") {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeStrings(value);
    }
    return sanitized;
  }

  return obj;
};
export const sanitizationMiddleware = async (request: FastifyRequest, _reply: FastifyReply) => {
  if (request.body) {
    request.body = sanitizeStrings(request.body);
  }

  if (request.query) {
    request.query = sanitizeStrings(request.query);
  }
};