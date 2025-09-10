import { useEffect, useState } from "react";

const hellos = ["Hello", "Hola", "Bonjour", "こんにちは", "안녕하세요", "Hallo", "Ciao"];

const useHello = (interval = 1000) => {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex(p => (p + 1) % hellos.length);
        }, interval);

        return () => clearTimeout(id);
    }, []);

    return hellos[index];
};

export default useHello;