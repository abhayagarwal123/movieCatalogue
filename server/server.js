import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';
import { keyRouter } from './routes/keys.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/keys", keyRouter);

// Serve frontend
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});


mongoose.connect("mongodb+srv://abhayagarwal70371:0112553aA@cluster0.gifjked.mongodb.net/movies?retryWrites=true&w=majority");

app.listen(PORT, () => {
  console.log("Listening on " + PORT + "...");
});
