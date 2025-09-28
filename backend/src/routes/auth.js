import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../database.js";

const router = express.Router();

//register route
router.post("/register", async (req, res) => {
  try {
    const { email, password, display_name } = req.body;

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //insert into DB
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, display_name)
       VALUES ($1, $2, $3)
       RETURNING id, email, display_name, created_at`,
      [email, hashedPassword, display_name || null]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error in /auth/register:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //find user by email
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    //compare hashed password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    //create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
      },
    });
  } catch (err) {
    console.error("Error in /auth/login:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;