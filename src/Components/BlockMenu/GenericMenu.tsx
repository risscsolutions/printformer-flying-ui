import React, {Component} from "react";
import {ReceivesEditorObject} from "../../Common";
import {Button, Tooltip} from "@material-ui/core";
import {AddToPhotos, Delete} from "@material-ui/icons";
import {ColorButton} from "../Common/ColorButton";

export class GenericMenu<P extends ReceivesEditorObject, S> extends Component<P, S> {
    protected renderDelete() {
        return (
            <Tooltip title="Delete" aria-label="delete"><Button
                onClick={async () => await this.props.editorObject.delete()}><Delete/></Button></Tooltip>
        )
    }

    protected renderDuplicate() {
        return (<Tooltip title="Duplicate" aria-label="duplicate"><Button
            onClick={async () => await this.props.editorObject.duplicate()}><AddToPhotos/></Button>
        </Tooltip>);
    }

    protected renderFill() {
        return (<Tooltip title="Fill" aria-label="fill">
            <ColorButton colorType="Fill" editorObject={this.props.editorObject}/>
        </Tooltip>)
    }

    protected renderStroke() {
        return (<Tooltip title="Stroke" aria-label="stroke">
            <ColorButton colorType="Stroke" editorObject={this.props.editorObject}/>
        </Tooltip>)
    }
}
