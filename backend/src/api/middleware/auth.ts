// src/api/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface AuthRequest extends Request {
  userId?: string;
  walletAddress?: string;
}

// ─────────────────────────────────────────────
// JWT HELPERS
// ─────────────────────────────────────────────
function generateToken(walletAddress: string, userId: string) {
  return jwt.sign(
    { walletAddress, userId },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );
}

// ─────────────────────────────────────────────
// MIDDLEWARE: REQUIRE TOKEN
// ─────────────────────────────────────────────
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "No token provided",
      });
    }

    const token = header.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as any;

    req.userId = decoded.userId;
    req.walletAddress = decoded.walletAddress;

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      error: "Invalid token",
    });
  }
};

// ─────────────────────────────────────────────
// MIDDLEWARE: OPTIONAL TOKEN
// ─────────────────────────────────────────────
export const optionalAuth = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;

    if (header && header.startsWith("Bearer ")) {
      const token = header.slice(7);
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as any;

      req.userId = decoded.userId;
      req.walletAddress = decoded.walletAddress;
    }

    return next();
  } catch {
    return next();
  }
};

// ─────────────────────────────────────────────
// HANDLER: LOGIN (CALL THIS IN ROUTE)
// ─────────────────────────────────────────────
export const loginHandler = async (req: Request, res: Response) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({
      success: false,
      error: "walletAddress is required",
    });
  }

  // 👉 userId can be walletAddress or DB userID
  const userId = walletAddress;

  const token = generateToken(walletAddress, userId);

  return res.json({
    success: true,
    token,
    walletAddress,
    userId,
  });
};

// ─────────────────────────────────────────────
// HANDLER: VERIFY TOKEN
// ─────────────────────────────────────────────
export const verifyTokenHandler = async (req: Request, res: Response) => {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "No token provided" });
    }

    const token = header.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    return res.json({ success: true, decoded });
  } catch {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

// ─────────────────────────────────────────────
// HANDLER: LOGOUT (frontend deletes token)
// ─────────────────────────────────────────────
export const logoutHandler = async (_req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Logged out — remove token client-side.",
  });
};
