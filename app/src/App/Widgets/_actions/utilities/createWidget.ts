import { forwardRef } from "react";

export default <RefType, PropsType>(render: React.ForwardRefRenderFunction<RefType, PropsType>) => {
    return forwardRef(render);
};
