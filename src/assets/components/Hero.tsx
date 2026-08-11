import useRouter from "../hooks/useRouter";

const Hero = () => {
    const { navigate } = useRouter();

    return (
        <>
            <div>Hero</div>
            <button onClick={() => navigate("default")}>Home</button>
        </>
    )
}

export default Hero