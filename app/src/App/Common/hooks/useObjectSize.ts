import { useCallback, useEffect, useState } from "react";
import { Mesh, Vector3 } from "three";

import { Vector3Array } from "../commonTypes";

export default (object: Mesh, scale: Vector3 | Vector3Array) => {
    const [size, setSize] = useState(new Vector3());

    const computeSizeWithScale = useCallback(
        (sizeToCompute: Vector3) => {
            if (scale.length) {
                return new Vector3(
                    sizeToCompute.x * (scale as Vector3Array)[0],
                    sizeToCompute.y * (scale as Vector3Array)[1],
                    sizeToCompute.z * (scale as Vector3Array)[2]
                );
            }

            return new Vector3(
                sizeToCompute.x * (scale as Vector3).x,
                sizeToCompute.y * (scale as Vector3).y,
                sizeToCompute.z * (scale as Vector3).z
            );
        },
        [scale]
    );

    useEffect(() => {
        if (object.geometry.boundingBox) {
            const measure = new Vector3();
            const newSize = computeSizeWithScale(object.geometry.boundingBox?.getSize(measure));

            setSize(newSize);
        }
    }, [computeSizeWithScale, object.geometry.boundingBox]);

    return size;
};
