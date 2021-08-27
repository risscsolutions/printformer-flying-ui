import React from "react";
import {ButtonGroup} from "@material-ui/core";
import {GenericMenu} from "./GenericMenu";
import {ReceivesEditorObject} from "../../Common";

export class ShapeMenu extends GenericMenu<ReceivesEditorObject, any> {
    public render() {
        return (
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                {this.renderDelete()}
                {this.renderDuplicate()}
                {this.renderFill()}
                {this.renderStroke()}
            </ButtonGroup>
        );
    }
}
