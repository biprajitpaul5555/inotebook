import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
// import React, { useEffect } from "react";

export default function Navbar() {
    let location = useLocation();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    // console.log(location.pathname); //works
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]); // also works
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand" to="/">
                        iNotebook
                    </Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                    {!localStorage.getItem("token") ? (
                        <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">
                                Login
                            </Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">
                                Signup
                            </Link>
                        </form>
                    ) : (
                        <button className="btn btn-primary" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
