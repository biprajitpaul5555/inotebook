import React from "react";
// import React, { useContext, useEffect } from "react";
// import noteContext from "../context/notes/noteContext";

export default function About() {
    // const nc = useContext(noteContext);
    // // If you specify the dependencies, your Effect runs after the initial render and after re-renders with changed dependencies.
    // useEffect(() => {
    //     nc.updateState();
    // }, [nc]); // Runs again if nc is different

    return (
        <div>
            {/* Hi, I am {nc.state.name} and I study in {nc.state.sem}th semester */}
            This is about page
        </div>
    );
}
