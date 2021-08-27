import React, {Component} from "react";
import Draggable from "react-draggable";
import {Paper, PaperClassKey, PaperProps, StandardProps} from "@material-ui/core";
import {omit} from "lodash";

interface DraggableDialogProps extends StandardProps<PaperProps, PaperClassKey> {
    handle: string
}

export class DraggableDialog extends Component<DraggableDialogProps, any> {
    public render() {
        return (
            <Draggable handle={this.props.handle} cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...omit(this.props, ['handle'])} />
            </Draggable>
        );
    }
}
