import usegameControllerService from "../_data/hooks/usegameControllerService";

export default () => {
    const { add } = usegameControllerService();

    const makeThisWidgetAlive = () => {
        add("Your widget behaviour here!");
    };

    return { makeThisWidgetAlive };
};
