import "dotenv/config.js";
import express from "express";
import connectToMongo from "./db.js";
import cors from "cors";
// import { router as authRouter } from "./routes/auth.js";
// import { router as notesRouter } from "./routes/notes.js";

const app = express();
const port = process.env.PORT || 5000;
let whitelist = ["http://localhost:3000","http://localhost:5173", "http://127.0.0.1:5500"];
if (process.env.NODE_ENV === 'production') {
    whitelist.push(process.env.FRONTEND_URL);
}
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin || origin === "null") {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
};

connectToMongo();
app.use(cors(corsOptions));
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
