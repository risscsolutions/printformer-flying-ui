import {ButtonWithMenu} from "../../Common/ButtonWithMenu";
import React, {ReactElement} from "react";
import {
    FormatListBulleted, FormatListNumbered, FormatListNumberedRtl
} from "@material-ui/icons";

export class BulletButton extends ButtonWithMenu {
    protected currentValue(): any {
        return 'bullet';
    }

    protected async setValue(value: string): Promise<void> {
        await this.props.editorObject.addBulletPoint(value);
    }

    protected iconForValue(value: string): ReactElement {
        switch (value) {
            case"bullet":
                return <FormatListBulleted/>;
            case"alphabetic":
                return <FormatListNumberedRtl/>;
            case "number":
                return <FormatListNumbered/>;
            default:
                throw new Error('INVALID ALIGN VALUE');
        }
    }
}
