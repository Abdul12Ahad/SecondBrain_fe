import React from "react";
import "./Preview.css"
import { getImageUrl } from "../../utils";
export const Preview = () => {
    return <section className="preview">
                <h3>See how it works</h3>
                <div className="mockup-box" id="preview">
                    <img src={getImageUrl("preview/sav-struc.png")} alt="sav-struc" className="page-img" />
                    <img src={getImageUrl("preview/sav-links.png")} alt="sav-links" className="page-img"/>
                </div>
            </section>

}