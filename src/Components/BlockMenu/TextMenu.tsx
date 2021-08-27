import React from "react";
import {Tooltip, Button, ButtonGroup, List, ListItem} from "@material-ui/core";
import {ColorButton} from "../Common/ColorButton";
import {MoreVert} from "@material-ui/icons";
import {GenericMenu} from "./GenericMenu";
import {ReceivesEditorObject} from "../../Common";
import {AlignButton} from "./Text/AlignButton";
import {BulletButton} from "./Text/BulletButton";
import {VerticalAlignButton} from "./Text/VerticalAlignButton";

type TextMenuState = {
    openSecondRow: boolean
}

export class TextMenu extends GenericMenu<ReceivesEditorObject, TextMenuState> {
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
                        {this.renderFill()}
                        {this.renderStroke()}
                        <Tooltip title="Text Format" aria-label="text-format">
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
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Tooltip title="Color" aria-label="color">
                            <ColorButton colorType="Font" editorObject={this.props.editorObject}/>
                        </Tooltip>
                        <AlignButton editorObject={this.props.editorObject}
                                     options={["left", "center", "right", "justify"]} title="Align"/>
                        <BulletButton editorObject={this.props.editorObject}
                                      options={["bullet", "alphabetic", "number"]} title="Bullet"/>
                        <VerticalAlignButton editorObject={this.props.editorObject}
                                             options={['top', 'center', 'bottom']} title="Vertical Align"/>
                    </ButtonGroup>
                </ListItem>}
            </List>
        );
    }
}
