import ResponsiveImage from "../components/ResponsiveImage";
import Reveal from "../components/Reveal";
import Stagger from "../components/Stagger";
import WaypointPage from "../components/WaypointPage";
import artworks from "../data/artworks.json";
import useMasonryBreakpoint from "../hooks/useMasonryBreakpoint";
import type { Artwork, MasonryGrouping, WaypointComponentProps } from "../types/general";

const MASONRY_COLUMNS_LARGE     = 3;
const MASONRY_COLUMNS_MEDIUM    = 2;
const MASONRY_COLUMNS_SMALL     = 1;

const createMasonryGroups = (artworks: Artwork[]): MasonryGrouping => {
    const result: MasonryGrouping = {
        large: Array.from({ length: MASONRY_COLUMNS_LARGE }, () => []),
        medium: Array.from({ length: MASONRY_COLUMNS_MEDIUM }, () => []),
        small: Array.from({ length: MASONRY_COLUMNS_SMALL }, () => []),
    };

    // Keep track of each group index
    let [lgIdx, mdIdx, smIdx] = [0, 0, 0];

    for (const v of artworks) {
        result.large[lgIdx++].push(v);
        result.medium[mdIdx++].push(v);
        result.small[smIdx++].push(v);

        lgIdx %= MASONRY_COLUMNS_LARGE;
        mdIdx %= MASONRY_COLUMNS_MEDIUM;
        smIdx %= MASONRY_COLUMNS_SMALL;
    }

    return result;
}

const fractals = createMasonryGroups(artworks.filter(a => a.kind === "fractals") as Artwork[]);
const blender = createMasonryGroups(artworks.filter(a => a.kind === "blender") as Artwork[]);

const Artworks = ({ waypoint, onBack }: WaypointComponentProps) => {

    const breakpoint = useMasonryBreakpoint();

    /**
     * Renders an artwork group.
     * @param g The artwork group to render.
     * @param i The index of the artwork group.
     */
    const renderGroup = (g: Artwork[], i: number) => {
        return (
            <ul key={`group-${i}`} className="artwork-masonry__column">
                {
                    g.map(a => 
                        <Reveal as={"li"} key={a.sourceName} id={a.sourceName} className="artwork-masonry__item" height="100%" width="100%">
                            <ResponsiveImage category="artworks" sourceName={a.sourceName} />
                            <div className="artwork-details">
                                <h4 className="artwork-details__title">{a.title}</h4>
                                <p className="artwork-details__year">{a.year}</p>
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
                        { fractals[breakpoint].map(renderGroup) }
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
                        { blender[breakpoint].map(renderGroup) }
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