import useToiletsSelector from "../_data/hooks/useToiletsSelector";

export default () => {
    const toilets = useToiletsSelector();

    return { toilets };
};
