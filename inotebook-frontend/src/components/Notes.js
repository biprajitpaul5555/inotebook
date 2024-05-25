import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) context.getNotes();
        else navigate("/login");
        // eslint-disable-next-line
    }, []);
    const refOpen = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

    const updateNote = (curNote) => {
        setNote({ id: curNote._id, title: curNote.title, description: curNote.description, tag: curNote.tag });
        refOpen.current.click();
    };
    const handleClick = () => {
        context.editNote(note.id, note.title, note.description, note.tag);
        refClose.current.click();
        props.showAlert("Note updated successfully", "success");
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value });
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* <!-- Button trigger modal --> */}
            <button
                type="button"
                ref={refOpen}
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            {/* <!-- Modal --> */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Edit Note
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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
                                        placeholder="Title must be 3 characters long atleast"
                                        value={note.title}
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
                                        placeholder="Description must be 5 characters long atleast"
                                        value={note.description}
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleClick}
                                disabled={note.title.length < 3 || note.description.length < 5}>
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">{context.notes.length === 0 && "No notes to display"}</div>
                {context.notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />;
                })}
            </div>
        </>
    );
}
