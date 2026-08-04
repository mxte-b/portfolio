import Reveal from "../components/Reveal";
import Stagger from "../components/Stagger";
import WaypointPage from "../components/WaypointPage";
import artworks from "../data/artworks.json";
import type { Artwork, WaypointComponentProps } from "../types/general";

const MASONRY_COLUMNS = 3;

const createMasonryGroups = (values: Artwork[]) => {
    const result: Artwork[][] = [];
    for (let i = 0; i < MASONRY_COLUMNS; i++) result.push([]);

    let groupIdx = 0;
    for (const v of values) {
        result[groupIdx++].push(v);

        groupIdx %= 3;
    }

    return result;
}

const fractals = createMasonryGroups(artworks.filter(a => a.kind === "fractals") as Artwork[]);
const blender = createMasonryGroups(artworks.filter(a => a.kind === "blender") as Artwork[]);

const Artworks = ({ waypoint, onBack }: WaypointComponentProps) => {

    const renderGroup = (g: Artwork[], i: number) => {
        return (
            <ul key={`group-${i}`} className="artwork-masonry__column">
                {
                    g.map(a => 
                        <Reveal as={"li"} key={a.sourceName} className="artwork-masonry__item" height="100%">
                            <picture>
                                <source
                                    type="image/avif"
                                    srcSet={`
                                        /media/artworks/generated/${a.sourceName}-350.avif 350w,
                                        /media/artworks/generated/${a.sourceName}-700.avif 700w,
                                    `}
                                    sizes="(max-width: 768px) 50vw, 350px"
                                />
                                <source
                                    type="image/webp"
                                    srcSet={`
                                        /media/artworks/generated/${a.sourceName}-350.webp 350w,
                                        /media/artworks/generated/${a.sourceName}-700.webp 700w,
                                    `}
                                    sizes="(max-width: 768px) 50vw, 350px"
                                />
                                <img draggable={false} src={`/media/artworks/generated/${a.sourceName}-700.webp`} loading="lazy" />
                            </picture>
                            <div className="artwork-details">
                                <h4>{a.title}</h4>
                            </div>
                        </Reveal>
                    )
                }
            </ul>
        )
    }

    return (
        <WaypointPage waypoint={waypoint} label={"artworks"} onBack={onBack}>
            <div className="artwork-gallery">
                <section className="artwork-category">
                    <header>
                        <Stagger>
                            <h2 className="artwork-category__title">Fractals</h2>
                            <p className="artwork-category__description">A long-time obsession of mine, where I can explore infinite spaces with code.</p>
                        </Stagger>
                    </header>

                    <div className="artwork-masonry">
                        { fractals.map(renderGroup) }
                    </div>
                </section>

                <section className="artwork-category">
                    <header>
                        <Stagger>
                            <h2 className="artwork-category__title">Blender</h2>
                            <p className="artwork-category__description">I enjoy realizing environments I imagine, and Blender makes it all possible.</p>
                        </Stagger>
                    </header>

                    <div className="artwork-masonry">
                        { blender.map(renderGroup) }
                    </div>
                </section>
            </div>
            <Reveal>
                <footer>
                    © {new Date().getFullYear()} mxte_b. All artwork on this page is protected by copyright.
                    Redistribution, commercial use, and use for training AI models are prohibited.
                </footer>
            </Reveal>
        </WaypointPage>
    );
};

export default Artworks;