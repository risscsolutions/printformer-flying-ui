import React, {Component, ReactElement, ReactNode} from "react";
import {
    Button,
    ButtonClassKey,
    ButtonProps,
    ListItemIcon,
    Menu,
    MenuItem,
    StandardProps,
    Tooltip
} from "@material-ui/core";
import {omit} from "lodash";

interface ButtonWithMenuProps extends StandardProps<ButtonProps, ButtonClassKey> {
    editorObject: any,
    options: Array<string>
    title: string
}

type ButtonWithMenuState = {
    anchor: HTMLElement | null,
}

export class ButtonWithMenu extends Component<ButtonWithMenuProps, ButtonWithMenuState> {
    constructor(props: ButtonWithMenuProps) {
        super(props);
        this.state = {anchor: null};
    }

    public render() {
        return (
            <Button variant="contained" {...omit(this.props, ['editorObject', 'options', 'title'])}
                    onClick={(e) => this.setAnchor(e.currentTarget)}
                    onMouseEnter={(e) => this.setAnchor(e.currentTarget)}>
                <Tooltip title={this.props.title} aria-label={this.props.title}>
                    {this.iconForValue(this.currentValue())}
                </Tooltip>
                <Menu color="primary" anchorEl={this.state.anchor} open={!!this.state.anchor}
                      onClose={() => this.setAnchor(null)}
                      MenuListProps={{onMouseLeave: () => this.setAnchor(null)}}
                >
                    {this.props.options.map((value) => {
                        return (
                            <MenuItem key={value}
                                      onClick={() => this.setValue(value).then(() => this.setAnchor(null))}>
                                <ListItemIcon>
                                    {this.iconForValue(value)}
                                </ListItemIcon>
                            </MenuItem>
                        )
                    })}
                </Menu>
            </Button>
        )
    }

    private setAnchor(anchor: HTMLElement | null) {
        this.setState({anchor});
    }

    protected currentValue(): any {
        throw new Error('NOT IMPLEMENTED');
    }

    protected async setValue(value: string): Promise<void> {
        throw new Error('NOT IMPLEMENTED');
    }

    protected iconForValue(value: string): ReactElement {
        throw new Error('NOT IMPLEMENTED')
    }
}
