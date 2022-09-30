import useForwardedRef from "@app/Common/hooks/useForwardedRef";
import { useIsEditor } from "@app/Editor/_actions/hooks";
import { RigidBody, RigidBodyApi, RigidBodyProps } from "@react-three/rapier";
import { forwardRef, ReactNode } from "react";

type Props = RigidBodyProps & {
    hasPhysic?: boolean;
    children: ReactNode;
};

const GameRigidbody = forwardRef<RigidBodyApi, Props>(({ children, ...rigidbodyProps }, ref) => {
    const rigidBodyRef = useForwardedRef(ref);
    const { isEditor } = useIsEditor();

    if (!isEditor) {
        return (
            <RigidBody ref={rigidBodyRef} {...rigidbodyProps}>
                {children}
            </RigidBody>
        );
    }

    return <>{children}</>;
});

GameRigidbody.displayName = "GameRigidbody";

export default GameRigidbody;
