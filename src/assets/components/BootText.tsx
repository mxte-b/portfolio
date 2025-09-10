
import { useEffect, useState } from "react";
import bootSequenceSource from "../../../public/data/bootSequence.json";
import { motion, AnimatePresence } from "framer-motion";

interface BootLine {
  text: string;
  delay: number;
}

const BootText = () => {
    const [lines, setLines] = useState<string[]>([]);
    const [bootSequence, setBootSequence] = useState<BootLine[]>(bootSequenceSource);

    const getLineColor = (index: number) => {
        const start = 255;
        const end = 60;
        const t = (start - end) / Math.max(bootSequence.length - 1, 1);

        const value = Math.max(start - t * index, end);
        return `rgb(${value}, ${value}, ${value})`;
    }

    useEffect(() => {
        let i = 0;

        const next = () => {
            if (i < bootSequence.length) {
                const current = bootSequence[i];

                setLines(p => [...p, current.text]);
                i++;
                setTimeout(next, current.delay);
            }
        }

        next();
    }, []);

    return (
        <div className="boot-text">
            <AnimatePresence>
                {lines.map((l, i) => (
                    <motion.div
                        key={i}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.05, ease: "linear" }}
                        style={{ whiteSpace: "pre", color: getLineColor(i) }}
                    >
                        {l}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default BootText;