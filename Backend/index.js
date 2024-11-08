import express from "express";
import cors from "cors";
import pg from "pg";
import env from 'dotenv';

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

const { Pool } = pg;
env.config();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false 
  }
});

app.post('/auth/login',(req, res) => {
  console.log(req.body);
  res.send("request came succ");
});

app.post('/login', (req, res) => {
  const response = req.body;
  console.log('abracadabra');
  console.log(response);
  res.send('Successfully logged in');
});


app.get("/test", async(req,res) => {
  console.log("req came");
  res.send("hello! from backend");
})


app.get("/getData", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM data"); 
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving data from database: " + err);
  }
});

app.listen(port, () => {
  console.log("Server is live on " + port);
});
