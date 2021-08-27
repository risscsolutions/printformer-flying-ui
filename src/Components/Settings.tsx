import React, {ChangeEvent, Component} from "react";
import {Props} from "../Common";
import {
    Dialog,
    DialogContent,
    DialogTitle, FormControlLabel, IconButton, Switch,
} from "@material-ui/core";
import {ColorLens} from "@material-ui/icons";
import {KeyboardShortcut} from "@rissc/printformer-editor-client/dist/Objects";

type SettingsState = {
    open: boolean,

    gridVisible: boolean,
    backGroundColor: string,
}

export class Settings extends Component<Props, SettingsState> {
    constructor(props: Props) {
        super(props);
        this.state = {open: false, gridVisible: false, backGroundColor: ''};
        this.props.editor.getKeyboardShortcutService()
            .registerShortcutWithCallBack(new KeyboardShortcut(['Period'], true), () => {
                this.setState({open: true});
            });

        Promise.all([
            this.props.editor.getSettings().getGridSettings().getVisible(),
            this.props.editor.getSettings().getBackGroundColor(),
        ]).then(([gridVisible, backGroundColor]) => {
            this.setState({gridVisible, backGroundColor});
        })
    }

    public render() {
        return (
            <Dialog open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    aria-labelledby="setting-title">
                <DialogTitle id="setting-title">
                    Settings
                </DialogTitle>
                <DialogContent>
                    <FormControlLabel
                        value={this.state.gridVisible}
                        control={<Switch color="primary"
                                         checked={this.state.gridVisible}
                                         onChange={() => this.toggleGridVisibility()}/>}
                        label="Show Grid"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value={this.state.backGroundColor}
                        control={<IconButton>
                            <ColorLens htmlColor={this.state.backGroundColor}/>
                            <input
                                value={this.state.backGroundColor}
                                style={{
                                    appearance: "none",
                                    outline: "none",
                                    border: "0 none",
                                    cursor: "pointer",
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
                                }}
                                type="color"
                                onChange={async (e) => await this.setColor(e)}/>
                        </IconButton>}
                        label="Background Color"
                        labelPlacement="start"
                    />
                </DialogContent>
            </Dialog>
        );
    }

    protected async toggleGridVisibility() {
        const gridVisible = await this.props.editor.getSettings().getGridSettings().toggleGrid()

        this.setState({gridVisible});
    }

    protected async setColor(e: ChangeEvent<HTMLInputElement>) {
        const backGroundColor = e.target.value;
        await this.props.editor.getSettings().setBackGroundColor(backGroundColor);
        this.setState({backGroundColor})
    }
}
