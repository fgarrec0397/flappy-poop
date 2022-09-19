import { GLTFResult } from "@app/Common/commonTypes";

export type ToiletModelGLTFResult = GLTFResult<{
    nodes: {
        Cylinder001: THREE.Mesh;
        Box001: THREE.Mesh;
        Box002: THREE.Mesh;
    };
    materials: {
        ["Material #25"]: THREE.MeshStandardMaterial;
        ["Material #25"]: THREE.MeshStandardMaterial;
        ["Material #25"]: THREE.MeshStandardMaterial;
    };
}>;

export type ToiletsChunkModel = {
    id: string;
    canBeDeleted: boolean;
    toiletsChunk: [ToiletModel, ToiletModel, ToiletModel];
};

export type ToiletModel = {
    positionY: number;
    isVisible: boolean;
};
