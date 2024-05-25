import NoteContext from "./noteContext"; // can import noteContext as NoteContext because of default export
import { useState } from "react";

const NoteState = (props) => {
    // const s1 = {
    //     name: "Bipra",
    //     sem: 6,
    // };
    // const [state, setState] = useState(s1);
    // const updateState = () => {
    //     setTimeout(() => {
    //         setState({
    //             name: "Biprajit",
    //             sem: 7,
    //         });
    //     }, 10000);
    // };
    const notesInitial = [
        {
            _id: "6624ba969533bc2564d6932a",
            title: "myTitle",
            description: "myDescription",
            tag: "General",
            user: "66240b694d9d52c9c69b213e",
            date: "2024-04-21T07:04:54.724Z",
            __v: 0,
        },
        {
            _id: "662667a606a697b966473d51",
            title: "myTitle2",
            description: "myDescription2",
            tag: "General",
            user: "66240b694d9d52c9c69b213e",
            date: "2024-04-22T13:35:34.685Z",
            __v: 0,
        },
    ];
    const [notes, setNotes] = useState(notesInitial);

    // Get all Notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "auth-token":
                //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNDBiNjk0ZDlkNTJjOWM2OWIyMTNlIn0sImlhdCI6MTcxMzYzODQxM30.XwPXTn-JKt341aeJ32dSkmbQZLBHrqdot0KrMAZp7W8",
                "auth-token": localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        setNotes(json);
    };

    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "auth-token":
                //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNDBiNjk0ZDlkNTJjOWM2OWIyMTNlIn0sImlhdCI6MTcxMzYzODQxM30.XwPXTn-JKt341aeJ32dSkmbQZLBHrqdot0KrMAZp7W8",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();

        // const note = {
        //     _id: "61322f119553781a8ca8d0e08" + Math.random(),
        //     user: "6131dc5e3e4037cd4734a0664",
        //     title: title,
        //     description: description,
        //     tag: tag,
        //     date: "2021-09-03T14:20:09.668Z",
        //     __v: 0,
        // };
        setNotes(notes.concat(note));
    };

    // Delete a Note
    const deleteNote = async (id) => {
        // TODO: API Call
        await fetch(`${process.env.REACT_APP_BASE_URL}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // "auth-token":
                //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNDBiNjk0ZDlkNTJjOWM2OWIyMTNlIn0sImlhdCI6MTcxMzYzODQxM30.XwPXTn-JKt341aeJ32dSkmbQZLBHrqdot0KrMAZp7W8",
                "auth-token": localStorage.getItem("token"),
            },
        });

        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        await fetch(`${process.env.REACT_APP_BASE_URL}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // "auth-token":
                //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNDBiNjk0ZDlkNTJjOWM2OWIyMTNlIn0sImlhdCI6MTcxMzYzODQxM30.XwPXTn-JKt341aeJ32dSkmbQZLBHrqdot0KrMAZp7W8",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag }),
        });

        // Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes)); //It's a way of cloning an object, so that you get a complete copy that is unique but has the same properties as the cloned object.
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    };

    // return <NoteContext.Provider value={{ state, updateState }}>{props.children}</NoteContext.Provider>;
    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
