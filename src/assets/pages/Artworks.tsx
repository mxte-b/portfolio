import { b } from "framer-motion/client";
import WaypointPage from "../components/WaypointPage";
import artworks from "../data/artworks.json";
import type { Artwork, WaypointComponentProps } from "../types/general";

const fractals = artworks.filter(a => a.kind === "fractals").map(a => a as Artwork);
const blender = artworks.filter(a => a.kind === "blender").map(a => a as Artwork);

const Artworks = ({ waypoint, onBack }: WaypointComponentProps) => {
    return (
        <WaypointPage waypoint={waypoint} label={"artworks"} onBack={onBack}>
            <section className="artwork-category">
                <header>
                    <h2 className="artwork-category__title">Fractals</h2>
                    <p className="artwork-category__description">A long-time obsession of mine, where I can explore infinite spaces with code.</p>
                </header>

                <ul className="artwork-grid">
                    {
                        fractals.map(a => 
                            <li className="artwork-grid__item">
                                {a.sourceName}
                            </li>
                        )
                    }
                </ul>
            </section>

            <section className="artwork-category">
                <header>
                    <h2 className="artwork-category__title">Blender</h2>
                    <p className="artwork-category__description">I enjoy realizing environments I imagine, and Blender makes it all possible.</p>
                </header>

                <ul className="artwork-grid">
                    {
                        blender.map(a => 
                            <li className="artwork-grid__item">
                                {a.sourceName}
                            </li>
                        )
                    }
                </ul>
            </section>

            <footer>
                © {new Date().getFullYear()} mxte_b. All artwork on this page is protected by copyright. 
                Redistribution, commercial use, and use for training AI models are prohibited.
            </footer>
        </WaypointPage>
    );
};

export default Artworks;