import React, {ChangeEvent} from "react";
import {Tooltip, Button, ButtonGroup, List, ListItem} from "@material-ui/core";
import {AddPhotoAlternate, MoreVert, ZoomOutMap} from "@material-ui/icons";
import {GenericMenu} from "./GenericMenu";
import {ReceivesEditorObject} from "../../Common";

type AssetMenuState = {
    openSecondRow: boolean
}

export class AssetMenu extends GenericMenu<ReceivesEditorObject, AssetMenuState> {
    constructor(props: ReceivesEditorObject) {
        super(props);
        this.state = {openSecondRow: false}
    }

    public render() {
        return (
            <List dense={true} disablePadding={true}>
                <ListItem>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        {this.renderDelete()}
                        {this.renderDuplicate()}
                        <Tooltip title="Set Asset" aria-label="set asset">
                            <Button>
                                <AddPhotoAlternate/>
                                <input
                                    style={{
                                        appearance: "none",
                                        outline: "none",
                                        border: "0 none",
                                        background: "transparent",
                                        position: "absolute",
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        display: "block",
                                        bottom: 0,
                                        opacity: 0,
                                        height: "100%",
                                        width: "100%",
                                        cursor: "pointer",
                                    }}
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => await this.setFile(e)}/>
                            </Button>
                        </Tooltip>
                        <Button onClick={() => this.props.editorObject.fitAsset()}>
                            <ZoomOutMap/>
                        </Button>
                        <Tooltip title="More" aria-label="more">
                            <Button onClick={() => this.setState({
                                openSecondRow: !this.state.openSecondRow
                            })}>
                                <MoreVert/>
                            </Button>
                        </Tooltip>
                    </ButtonGroup>
                </ListItem>
                {this.state.openSecondRow &&
                <ListItem>
                    <ButtonGroup variant="contained" color="primary"
                                 aria-label="contained primary button group">
                        {this.renderFill()}
                        {this.renderStroke()}
                    </ButtonGroup>
                </ListItem>}
            </List>
        );
    }

    private async setFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files[0];

        await this.props.editorObject.replaceWithFile(file);
    }
}
