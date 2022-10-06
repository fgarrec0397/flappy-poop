import usePoopService from "../_data/hooks/usePoopService";

export default () => {
    const { addPoint } = usePoopService();

    const traversedToilet = () => {
        addPoint();
    };

    return { traversedToilet };
};
