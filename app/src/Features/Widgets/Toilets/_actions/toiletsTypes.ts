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

export type ToiletsChunkToilets = [ToiletModel, ToiletModel, ToiletModel];

export type ToiletsChunkModel = {
    id: string;
    canBeDeleted: boolean;
    toilets: ToiletsChunkToilets;
};

export type ToiletModel = {
    id: string;
    toiletsChunkId: string;
    positionY: number;
    isVisible: boolean;
};
