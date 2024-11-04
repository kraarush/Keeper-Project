import express from "express";
import cors from "cors";
import dummyData from "./data.js";

const port = 5000;
const app = express();
app.use(cors());

app.get("/getData", (req, res) => {
  try {
    res.send(dummyData);
  } catch(err) {
    console.log(err);
  }
});

app.listen(port, () => {
    console.log("Server is live on " + port);
});