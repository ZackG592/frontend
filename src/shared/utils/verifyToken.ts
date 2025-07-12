import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your-secret-key-here';

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, secretKey);

    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
}