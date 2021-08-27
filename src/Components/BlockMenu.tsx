import React, {Component} from "react";
import {Popper} from "@material-ui/core";
import {AnchorElement, FakeAnchorElement, onEditorObjectSelected, Props} from "../Common";
import {ShapeMenu} from "./BlockMenu/ShapeMenu";
import {AssetMenu} from "./BlockMenu/AssetMenu";
import {TextMenu} from "./BlockMenu/TextMenu";

type BlockMenuState = {
    anchorEl: AnchorElement,
    editorObject: any
}

export class BlockMenu extends Component<Props, BlockMenuState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            anchorEl: FakeAnchorElement.center(100,100),
            editorObject: null
        };

        onEditorObjectSelected(
            this.props.editor, this,
            (editorObject: any) => {
                this.setState({
                    editorObject,
                    anchorEl: FakeAnchorElement.fromEditorObject(editorObject)
                });
            },
            ///@ts-ignore
            () => true,
            () => {
                this.setState({editorObject: null});
            }
        )
    }

    public render() {
        return (
            <Popper open={!!this.state.editorObject} anchorEl={this.state.anchorEl} modifiers={{
                position: 'top',
                flip: {
                    enabled: true,
                }
            }}>
                {this.renderMenu()}
            </Popper>
        );
    }

    private renderMenu() {
        if (!this.state.editorObject) return <p>Empty</p>;

        switch (this.state.editorObject.blockType) {
            case 'SHAPE':
                return <ShapeMenu editorObject={this.state.editorObject}/>;
            case 'ASSET':
                return <AssetMenu editorObject={this.state.editorObject}/>;
            case 'TEXT':
                return <TextMenu editorObject={this.state.editorObject}/>;
            default:
                throw new Error('UNKNOWN BLOCK TYPE IN RENDER MENU');
        }
    }
}
