import express from "express";
import Note from "../models/Note.js";
import fetchuser from "../middleware/fetchuser.js";

const router = express.Router();

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).exec();
        res.status(200).send(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

router.post("/addnote", fetchuser, async (req, res) => {
    try {
        const note = await Note.create({ ...req.body, user: req.user.id });
        res.status(201).json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: "Not Found" });
        if (!note.user.equals(req.user.id)) return res.status(401).json({ error: "Not Allowed" });
        note = await Note.findByIdAndUpdate(req.params.id, newNote, { runValidators: true, new: true });
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: "Not Found" });
        if (!note.user.equals(req.user.id)) return res.status(401).json({ error: "Not Allowed" });
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ Success: "Note has been deleted", note: note });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

// export { router };
export default router;
