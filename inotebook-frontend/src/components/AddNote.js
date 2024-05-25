import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "General" });

    const handleClick = (e) => {
        e.preventDefault();
        context.addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "General" });
        props.showAlert("Note added successfully", "success");
        // document.querySelector("#title").value = "";
        // document.querySelector("#description").value = "";
        // document.querySelector('#tag').value="";
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value });
    };

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        autoComplete="name"
                        onChange={onChange}
                        spellCheck="false"
                        value={note.title}
                        placeholder="Title must be 3 characters long atleast"
                        minLength={3}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        autoComplete="name"
                        onChange={onChange}
                        spellCheck="false"
                        value={note.description}
                        placeholder="Description must be 5 characters long atleast"
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                        Tag
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        autoComplete="name"
                        onChange={onChange}
                        spellCheck="false"
                        value={note.tag}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                    disabled={note.title.length < 3 || note.description.length < 5}>
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default AddNote;
