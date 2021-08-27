import React, {Component} from "react";
import {AnchorElement, FakeAnchorElement, onEditorObjectSelected, Props} from "../Common";
import {
    Card,
    CardContent,
    DialogContentText,
    IconButton,
    Popper,
    Typography
} from "@material-ui/core";
import {TextElementInformation} from "./ElementInformation/TextElementInformation";
import {Close} from "@material-ui/icons";
import {DraggableDialog} from "./Common/DraggableDialog";
import {AssetElementInformation} from "./ElementInformation/AssetElementInformation";
import {ShapeElementInformation} from "./ElementInformation/ShapeElementInformation";
import {KeyboardShortcut} from "@rissc/printformer-editor-client/dist/Objects";

type ElementInformationProps = Props & {}
type ElementInformationState = {
    open: boolean
    editorObject: any,
    anchorEl: AnchorElement,
}

export class ElementInformation extends Component<ElementInformationProps, ElementInformationState> {
    constructor(props: ElementInformationProps) {
        super(props);
        this.state = {
            editorObject: null,
            open: false,
            anchorEl: FakeAnchorElement.center(200, 100),
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
        this.props.editor.getKeyboardShortcutService()
            .registerShortcutWithCallBack(new KeyboardShortcut(['KeyI'], true), () => {
                this.setState({open: true});
            });
    }

    public render() {
        return (
            <Popper open={this.state.open}
                    aria-labelledby="info-title"
                    anchorEl={this.state.anchorEl}
            >
                <DraggableDialog handle="#info-title" color="primary">
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" id="info-title">
                                Element Informationen
                                <IconButton aria-label="close" onClick={() => this.setState({open: false})}>
                                    <Close/>
                                </IconButton>
                            </Typography>
                            {this.renderContent()}
                        </CardContent>
                    </Card>
                </DraggableDialog>
            </Popper>
        );
    }

    private renderContent() {
        if (!this.state.editorObject) return (<DialogContentText>Kein Element ausgewählt</DialogContentText>);

        switch (this.state.editorObject.blockType) {
            case 'TEXT':
                return <TextElementInformation editorObject={this.state.editorObject}/>;
            case 'ASSET':
                return <AssetElementInformation editorObject={this.state.editorObject}/>;
            case 'SHAPE':
                return <ShapeElementInformation editorObject={this.state.editorObject}/>;
        }
        return (<Typography>{JSON.stringify(this.state.editorObject, null, 2)}</Typography>);
    }
}
