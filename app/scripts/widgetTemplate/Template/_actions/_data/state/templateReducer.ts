import { createSlice } from "@reduxjs/toolkit";

import { TemplateModel } from "../../templateTypes";

export interface TemplateState {
    template: TemplateModel;
}

const initialState: TemplateState = {
    template: {
        templateId: "",
    },
};

export const templateSlice = createSlice({
    name: "template",
    initialState,
    reducers: {
        addTemplate: () => {
            console.log("add template");
        },
        removeTemplate: () => {
            console.log("remove template");
        },
        updateTemplate: () => {
            console.log("update template");
        },
    },
});

export const { addTemplate, removeTemplate, updateTemplate } = templateSlice.actions;

export default templateSlice.reducer;
