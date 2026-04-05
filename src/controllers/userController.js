const pool = require("../db/db");

// SAVE USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, template_data, quality } = req.body;

    if (!template_data) {
      return res.status(400).json({ error: "Fingerprint missing" });
    }

    const result = await pool.query(
      "INSERT INTO users (name,email,template_data,quality) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, template_data, quality || 0]
    );

    res.json(result.rows[0]);

  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "Email exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// GET USER
exports.getUser = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);

  } catch {
    res.status(500).json({ error: "Error" });
  }
};