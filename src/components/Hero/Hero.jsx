import React from "react";
import './Hero.css';
import { getImageUrl } from "../../utils";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
    return (
        <section className="hero">
            <img src={getImageUrl("hero/idea.png")} alt="" className="imag" />
            <h2 className="title">Organise Your Digital Brain</h2>
            <p className="info">Save links from anywhere - videos, threads, articles - and access them all in one clean place.</p>

            <div className="auth-buttons">
                <Link to="/signup">
                <button className="get-started-btn">Get Started</button>
                </Link>
            </div>
        </section>
    )
}