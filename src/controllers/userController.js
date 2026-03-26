const pool = require("../db/db");

// ✅ REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, templateData, quality } = req.body;

    await pool.query(
      `INSERT INTO users (name, email, template_data, quality)
       VALUES ($1, $2, $3, $4)`,
      [name, email, templateData, quality]
    );

    res.json({ message: "User registered successfully ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ VERIFY USER (DEMO MATCH)
exports.verifyUser = async (req, res) => {
  try {
    const { templateData } = req.body;

    const result = await pool.query("SELECT * FROM users");

    let matchedUser = null;

    for (let user of result.rows) {
      if (
        user.template_data &&
        user.template_data.substring(0, 20) === templateData.substring(0, 20)
      ) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      return res.status(401).json({ message: "Fingerprint not matched ❌" });
    }

    res.json({
      message: "Login success ✅",
      user: matchedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};