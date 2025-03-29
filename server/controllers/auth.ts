import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/database';
import { sendVerificationEmail } from '../config/email';

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email],
    });

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password and create verification token
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    // Create user
    const userId = uuidv4();
    await db.execute({
      sql: 'INSERT INTO users (id, name, email, password, verification_token) VALUES (?, ?, ?, ?, ?)',
      args: [userId, name, email, hashedPassword, verificationToken],
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Generate JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '24h' });

    res.status(201).json({
      user: {
        id: userId,
        name,
        email,
        isVerified: false,
      },
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email],
    });

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password as string);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '24h' });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.is_verified,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function verifyEmail(req: Request, res: Response) {
  try {
    const { token } = req.params;

    // Find user by verification token
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE verification_token = ?',
      args: [token],
    });

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }

    // Update user verification status
    await db.execute({
      sql: 'UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = ?',
      args: [token],
    });

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}