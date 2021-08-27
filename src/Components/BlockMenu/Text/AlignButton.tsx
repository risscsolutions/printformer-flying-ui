import {ButtonWithMenu} from "../../Common/ButtonWithMenu";
import React, {ReactElement} from "react";
import {FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight} from "@material-ui/icons";

export class AlignButton extends ButtonWithMenu {
    protected currentValue(): any {
        return this.props.editorObject?.align || 'center';
    }

    protected async setValue(value: string): Promise<void> {
        await this.props.editorObject.setFontAlign(value);
    }

    protected iconForValue(value: string): ReactElement {
        switch (value) {
            case"left":
                return <FormatAlignLeft/>;
            case"center":
                return <FormatAlignCenter/>;
            case "right":
                return <FormatAlignRight/>;
            case "justify":
                return <FormatAlignJustify/>;
            default:
                throw new Error('INVALID ALIGN VALUE');
        }
    }
}
