// src/types/custom.ts
import { User } from "@prisma/client";

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
