import {GenericElementInformation} from "./GenericElementInformation";
import {Divider, List, ListItem} from "@material-ui/core";
import React from "react";

export class AssetElementInformation extends GenericElementInformation {
    public render() {
        return (
            <List dense={true} disablePadding={true}>
                {this.renderGenericPropertiesList()}
                <Divider/>
                {this.renderAssetInformation()}
            </List>
        );
    }

    protected renderAssetInformation() {
        if (!this.props.editorObject.isFilled) {
            return <ListItem>Block ist leer</ListItem>
        }
        return <ListItem>
            DPI: {this.props.editorObject.dpi}
        </ListItem>
    }
}
