import { FC, forwardRef, ForwardRefRenderFunction } from "react";

export default <PropsType, RefType = null>(component: FC<PropsType>) => {
    return forwardRef(component as ForwardRefRenderFunction<RefType, PropsType>);
};
