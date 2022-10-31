import "./index.css";
import "antd/dist/antd.css";

import AppProvider from "@app/Core/_actions/_data/providers/AppProvider";
import Core from "@app/Core/Core";
import FeaturesProvider from "@features/Core/_actions/_data/providers/FeaturesProvider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root") as Element | DocumentFragment;

const root = createRoot(container);

root.render(
    <StrictMode>
        <AppProvider>
            <FeaturesProvider>
                <Core />
            </FeaturesProvider>
        </AppProvider>
    </StrictMode>
);
