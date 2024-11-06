import express from "express";
import cors from "cors";
import pg from "pg";
import env from 'dotenv';

const port = process.env.PORT || 5000;
const app = express();
const { Pool } = pg;
env.config();
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false 
  }
});

app.post('/login', (req,res) => {
  const response = req.body;
  console.log(response);
  res.send(response);
})

app.get("/getData", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM data"); 
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving data from database");
  }
});


app.listen(port, () => {
  console.log("Server is live on " + port);
});
