import {GenericElementInformation} from "./GenericElementInformation";
import {Divider, List, ListItem} from "@material-ui/core";
import React from "react";

export class TextElementInformation extends GenericElementInformation {
    public render() {
        return (
            <List dense={true} disablePadding={true}>
                {this.renderGenericPropertiesList()}
                <Divider/>
                <ListItem>
                    Schrift: {this.props.editorObject.font}
                </ListItem>
                <ListItem>
                    Schriftgröße: {this.props.editorObject.size.toFixed(2)}pt
                </ListItem>
                <ListItem>
                    Schriftfarbe: {this.props.editorObject.color.name}
                </ListItem>
            </List>
        );
    }
}
