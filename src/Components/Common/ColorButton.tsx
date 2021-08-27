import React, {ChangeEvent, Component} from "react";
import {Button, ButtonClassKey, ButtonProps, StandardProps} from "@material-ui/core";
import convert from "color-convert";
import {omit} from "lodash";
import {BorderColor, FormatColorFill, FormatColorText} from "@material-ui/icons";

type ColorButtonType = 'Fill' | 'Font' | 'Stroke';

interface ColorButtonProps extends StandardProps<ButtonProps, ButtonClassKey> {
    editorObject: any,
    colorType: ColorButtonType
}

export class ColorButton extends Component<ColorButtonProps, any> {
    private readonly element: React.RefObject<any>;

    constructor(props: ColorButtonProps) {
        super(props);
        this.element = React.createRef();
    }

    componentDidUpdate(prevProps: Readonly<ColorButtonProps>, prevState: Readonly<any>, snapshot?: any) {
        this.element.current.querySelector('path[fill-opacity]').color = this.getCurrentColor();
    }

    public render() {
        return (
            <Button ref={this.element} {...omit(this.props, ['colorType', 'editorObject'])}>
                {this.icon()}
                <input
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
            </Button>
        );
    }

    private async setColor(e: ChangeEvent<HTMLInputElement>) {
        const color = e.target.value;

        this.element.current.querySelector('path[fill-opacity]').color = color;

        const parsedColor = {
            displayColor: color,
            colorSpace: 'RGB',
            values: convert.hex.rgb(color)
        }
        await this.props.editorObject[`set${this.props.colorType}Color`](parsedColor);
    }

    private getCurrentColor() {
        switch (this.props.colorType) {
            case 'Fill':
                return this.props.editorObject.fill?.displayColor;
            case 'Stroke':
                return this.props.editorObject.stroke?.displayColor;
            case 'Font':
                return this.props.editorObject.color?.displayColor;

        }
    }

    private icon() {
        switch (this.props.colorType) {
            case 'Fill':
                return <FormatColorFill/>;
            case 'Stroke':
                return <BorderColor/>;
            case 'Font':
                return <FormatColorText/>;
        }
    }
}
