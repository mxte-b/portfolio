import sharp from 'sharp';
import fs from "fs/promises";
import path from "path";

const targetWidths = [350, 700, 1400];
const targetFormats = ["avif", "webp"];
const sourceDirectory = path.resolve("./public/media/artworks/source/");
const outputDirectory = path.resolve("./public/media/artworks/generated/");

fs.readdir(sourceDirectory)
    .then(async files => {
        const images = files.map(f => path.join(sourceDirectory, f)).map(f => ({ path: f, image: sharp(f) }));

        for (const i of images) {
            for (const format of targetFormats) {
                for (const width of targetWidths) {
                    const filename = path.basename(i.path, path.extname(i.path));

                    i.image
                        .resize(width)
                        .withMetadata(false)
                        [format]()
                        .toFile(path.join(outputDirectory, `${filename}-${width}.${format}`), () => {
                            console.log(`Converted ${filename} to ${format} @ ${width}`)
                        });
                }
            }
        }
    })
    .catch(e => console.log(e));