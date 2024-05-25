import "dotenv/config.js";
import express from "express";
import connectToMongo from "./db.js";
import cors from "cors";
// import { router as authRouter } from "./routes/auth.js";
// import { router as notesRouter } from "./routes/notes.js";

const app = express();
const port = process.env.PORT || 5000;
console.log(port);

connectToMongo();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello harry");
});

// app.use("/api/auth", authRouter);
// app.use("/api/notes", notesRouter);
app.use("/api/auth", (await import("./routes/auth.js")).default);
app.use("/api/notes", (await import("./routes/notes.js")).default);

app.listen(port, () => {
    console.log(`iNotebook-backend app listening at port ${port}`);
});
