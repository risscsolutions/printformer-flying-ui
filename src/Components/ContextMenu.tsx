import React, {Component} from "react";
import {Props} from "../Common";
import {Menu, MenuItem} from "@material-ui/core";
import {AddBlockMenu} from "./ContextMenu/AddBlockMenu";

type ContextMenuState = {
    mouseX: number,
    mouseY: number,
    editorObject: any
}

export class ContextMenu extends Component<Props, ContextMenuState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            mouseX: null,
            mouseY: null,
            editorObject: undefined
        };
        document.addEventListener('contextmenu', (e) => this.handleClick(e));
    }

    render() {
        return (
            <Menu
                keepMounted
                open={this.state.mouseY !== null}
                onClose={this.handleClose.bind(this)}
                anchorReference="anchorPosition"
                anchorPosition={
                    this.state.mouseY !== null && this.state.mouseX !== null
                        ? {top: this.state.mouseY, left: this.state.mouseX}
                        : undefined
                }
            >
                <MenuItem hidden={!!this.state.editorObject} onClick={this.duplicate.bind(this)}>Duplicate</MenuItem>
                <MenuItem hidden={!!this.state.editorObject} onClick={this.delete.bind(this)}>Delete</MenuItem>
                {this.renderAddBlocks()}
            </Menu>
        );
    }

    private renderAddBlocks() {
        return (
            <AddBlockMenu editor={this.props.editor} open={this.state.mouseY !== null}
                          onClose={this.handleClose.bind(this)}/>
        );
    }

    private async duplicate() {
        await this.state.editorObject.duplicate();
        this.handleClose();
    }

    private async delete() {
        await this.state.editorObject.delete();
        this.handleClose();
    }

    private handleClose() {
        this.setState({mouseX: null, mouseY: null});
    }

    private async handleClick(event: MouseEvent) {
        event.preventDefault();
        const activeObject = await this.props.editor.getActiveObject();
        if (activeObject) await activeObject.discard();

        const hoveringOver = await this.props.editor.findEditorObject({
            underCurrentPointer: true,
        });

        this.setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            editorObject: hoveringOver
        });
    }
}
