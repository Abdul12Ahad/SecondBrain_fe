import React, { useState } from "react";
import './Navbar.css';
import { getImageUrl } from "../../utils";
const Navbar = () => {

    const [menuOpen, setMenuopen] = useState(false);

    return(
    <nav className="navbar">
        <div className="outer">
        <img src={getImageUrl("nav/Brain.png")} alt="" className="brain_img"/>
        <h1 className="logHead">SecondBrain</h1>
        </div>
        <div className="menu">
            <img className="menuBtn" src={menuOpen ? getImageUrl("nav/closeIcon.png") : getImageUrl("nav/menuIcon.png")} alt="menu-button"  onClick={() => setMenuopen(!menuOpen)}/>
            <ul className={`menuItems ${menuOpen ? 'menuOpen' : ''}`} onClick={() => setMenuopen(false)}>
                <li><a href="#features">Features</a></li>
                <li><a href="#preview">Preview</a></li>
                <li><a href="#About">About</a></li>
            </ul>
        </div>
    </nav>

    );
}

export default Navbar;