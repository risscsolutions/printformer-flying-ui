import React, {Component} from "react";
import {List, ListItem} from "@material-ui/core";
import {ReceivesEditorObject} from "../../Common";

export abstract class GenericElementInformation extends Component<ReceivesEditorObject, any> {
    protected renderGenericPropertiesList() {
        return (
            <List dense={true} disablePadding={true}>
                <ListItem>
                    Name: {this.props.editorObject.name}
                </ListItem>
                <ListItem>
                    Typ: {this.props.editorObject.blockType}
                </ListItem>
                <ListItem>
                    Transparenz: {(this.props.editorObject.opacity * 100).toFixed(2)}%
                </ListItem>
                <ListItem>
                    Rotation: {this.props.editorObject.angle.toFixed(2)}°
                </ListItem>
                <ListItem>
                    Dimensionen: {this.props.editorObject.width.toFixed(2)}pt
                    x {this.props.editorObject.height.toFixed(2)}pt
                </ListItem>
                <ListItem>
                    Füllfarbe: {this.props.editorObject.fill?.name || '-'}
                </ListItem>
                <ListItem>
                    Konturfarbe: {this.props.editorObject.stroke?.name || '-'}
                </ListItem>
            </List>
        );
    }
}
