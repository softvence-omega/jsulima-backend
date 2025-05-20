// src/@types/express.d.ts
import { UserRole } from '@prisma/client'; // or define your own role enum if you have one

declare global {
  namespace Express {
    interface User {
      id: string;
      sub: string;
      role: UserRole | string; // adjust based on what your token includes
    }

    interface Request {
      user?: User;
    }
  }
}
