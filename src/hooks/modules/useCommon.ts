import useStore from "@/store";

export default () => {
    const store = useStore();

    const { useScreenStore } = store

    const { setScreenMode } = useScreenStore();
    
    return {
        setScreenMode
    }
}