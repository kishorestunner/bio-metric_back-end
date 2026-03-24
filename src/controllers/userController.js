const pool = require("../db/db");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, biometricData } = req.body;

    await pool.query(
      `INSERT INTO users (name, email, pid_data, hmac, skey)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        name,
        email,
        biometricData.pidData,
        biometricData.hmac,
        biometricData.skey,
      ]
    );

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// VERIFY USER
exports.verifyUser = async (req, res) => {
  try {
    const { pidData } = req.body;

    const result = await pool.query("SELECT * FROM users");

    const user = result.rows.find(u => u.pid_data === pidData);

    if (!user) {
      return res.status(401).json({ message: "Not matched" });
    }

    res.json({ message: "Login success", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};