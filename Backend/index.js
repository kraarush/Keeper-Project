import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv";
import {jwtDecode} from "jwt-decode";

const port = process.env.PORT || 5000;
const app = express();

const { Pool } = pg;
env.config();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/auth/login", async (req, res) => {
  const response = req.body;
  const { credential } = response;
  console.log('here ' + credential);
  const decodedToken = jwtDecode(credential);
  const { name, email } = decodedToken;

  try {
    const existingUser = await pool.query(
      "SELECT id, email, name FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];
      return res.json({ message: "User already exists", userId: user.id });
    }

    const result = await pool.query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *",
      [email, "Google", name]
    );

    const userId = result.rows[0].id;
    res.json({ message: "User created and logged in successfully", userId });
  } catch (err) {
    console.error("Error in /auth/login:", err);
    res.status(500).send("Error during login or user creation");
  }
});

app.post("/insertNote", async (req, res) => {
  const { title, content, userId } = req.body;

  console.log(title);
  console.log(content);
  console.log(userId);

  try {
    const result = await pool.query(
      "INSERT INTO data (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, userId]
    );
    res.json({ message: "Note inserted successfully", note: result.rows[0] });
  } catch (err) {
    console.error("Error in /insertNote:", err);
    res.status(500).send("Error inserting note");
  }
});

app.delete("/deleteNote/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    await pool.query("DELETE FROM data WHERE user_id = $1 AND id = $2", [
      userId,
      id,
    ]);
    res.send("Note deleted successfully");
  } catch (err) {
    console.error("Error in /deleteNote/:id:", err);
    res.status(500).send("Error deleting note");
  }
});

app.get("/getData/", async (req, res) => {
  const { userId } = req.query;

  try {
    const result = await pool.query(
      "SELECT data.id, data.title, data.content, users.name FROM data JOIN users ON data.user_id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      res.send([]);
    } else {
      res.send(result.rows);
    }
  } catch (err) {
    console.error("Error in /getData:", err);
    res.status(500).send("Error retrieving data");
  }
});

app.listen(port, () => {
  console.log("Server is live on " + port);
});
