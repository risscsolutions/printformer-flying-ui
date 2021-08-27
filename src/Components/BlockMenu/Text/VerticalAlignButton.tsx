import {ButtonWithMenu} from "../../Common/ButtonWithMenu";
import React, {ReactElement} from "react";
import {VerticalAlignBottom, VerticalAlignCenter, VerticalAlignTop} from "@material-ui/icons";

export class VerticalAlignButton extends ButtonWithMenu {
    protected currentValue(): any {
        return this.props.editorObject?.verticalAlign || 'top';
    }

    protected async setValue(value: string): Promise<void> {
        await this.props.editorObject.setFontVerticalAlign(value);
    }

    protected iconForValue(value: string): ReactElement {
        switch (value) {
            case"top":
                return <VerticalAlignTop/>;
            case"center":
                return <VerticalAlignCenter/>;
            case "bottom":
                return <VerticalAlignBottom/>;
            default:
                throw new Error('INVALID ALIGN VALUE');
        }
    }
}
