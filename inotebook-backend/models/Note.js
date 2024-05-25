import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
        minlength: [5, "Description must be 5 characters long atleast"],
    },
    tag: {
        type: String,
        default: "General",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
