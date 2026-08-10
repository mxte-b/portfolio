import config from "../../../optimizer.json";

type ImageCategory = keyof typeof config.targetWidths;

const ResponsiveImage = ({ category, sourceName, className }: { category: ImageCategory, sourceName: string, className?: string }) => {

    const getSrcSet = (format: string) => (
        config.targetWidths[category].map(w => `/images/${category}/${sourceName}-${w}.${format} ${w}w,`).join()
    )

    const getSourceElement = (format: string) => (
        <source
            key={`${sourceName}-${format}`}
            type={`image/${format}`}
            srcSet={getSrcSet(format)}
            sizes={config.sizes[category]}
        />
    )

    return (
        <picture className={`responsive-image ${className ?? ""}`.trimEnd()}>
            {
                config.targetFormats.map(getSourceElement)
            }
            <img style={{ width: "100%", height: "100%", objectFit: "cover"}} draggable={false} src={`/images/${category}/${sourceName}-${config.targetWidths[category][1]}.webp`} loading="lazy" />
        </picture>
    );
};

export default ResponsiveImage;