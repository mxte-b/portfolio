import sharp from 'sharp';
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import config from "./optimizer.json" with { type: "json" };

for (const c of Object.keys(config.targetWidths)) {
    const targetFormats   = config.targetFormats;
    const targetWidths    = config.targetWidths[c];
    const sourceDirectory = path.resolve(`./assets/images/${c}/`);
    const outputDirectory = path.resolve(`./public/images/${c}/`);
    
    await fsp.mkdir(outputDirectory, { recursive: true });

    fsp.readdir(sourceDirectory)
        .then(async files => {
            const images = files.map(f => path.join(sourceDirectory, f)).map(f => ({ path: f, image: sharp(f) }));
    
            for (const i of images) {
                for (const format of targetFormats) {
                    for (const width of targetWidths) {
                        const filename = path.basename(i.path, path.extname(i.path));
                        const outputPath = path.join(outputDirectory, `${filename}-${width}.${format}`);
    
                        if (fs.existsSync(outputPath)) {
                            console.log(`Skipped ${filename} (${format} @ ${width}) because it is already optimized.`);
                            continue;
                        }

                        i.image
                            .resize(width)
                            .withMetadata(false)
                            [format]()
                            .toFile(outputPath, () => {
                                console.log(`Converted ${filename} to ${format} @ ${width}`)
                            });
                    }
                }
            }
        })
        .catch(e => console.log(e));
}