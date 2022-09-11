import { useHelper } from "@react-three/drei";
import { MutableRefObject } from "react";
import { Object3D } from "three";

import useIsEditor from "./useIsEditor";

type Constructor = new (...args: any[]) => any;
type Helper = Object3D & {
    update: () => void;
};

export default <T extends Constructor>(
    object3D: MutableRefObject<Object3D | null>,
    helperConstructor: T,
    additionnalCondition = true
): MutableRefObject<Helper | undefined> => {
    const { isEditor } = useIsEditor();

    return useHelper(isEditor && additionnalCondition && object3D, helperConstructor as any); // TODO -- fix any type here
};
