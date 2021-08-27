import React, {ChangeEvent, Component} from "react";
import NestedMenuItem from "material-ui-nested-menu-item";
import MenuItem from "@material-ui/core/MenuItem";

export type SubMenuProps = {
    open: boolean
    onClose: Function,
    editor: any
}

export class AddBlockMenu extends Component<SubMenuProps> {
    public render() {
        return (
            <NestedMenuItem label="Add Block" parentMenuOpen={this.props.open}>
                <NestedMenuItem label="Add Shape" parentMenuOpen={this.props.open}>
                    <MenuItem onClick={this.addRect.bind(this)}>Add Rect</MenuItem>
                    <MenuItem onClick={this.addCircle.bind(this)}>Add Circle</MenuItem>
                    <MenuItem onClick={this.addTriangle.bind(this)}>Add Triangle</MenuItem>
                </NestedMenuItem>
                <MenuItem>
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
                        onChange={async (e) => await this.addAsset(e)}/>
                    Add Asset</MenuItem>
                <MenuItem onClick={this.addText.bind(this)}>Add Text</MenuItem>
                <MenuItem disabled={true} onClick={this.addBarcode.bind(this)}>Add Barcode</MenuItem>
            </NestedMenuItem>
        );
    }

    private async addRect() {
        await this.props.editor.addShapeBlock('rect');
        this.handleClose();
    }

    private async addTriangle() {
        await this.props.editor.addShapeBlock('triangle');
        this.handleClose();
    }

    private async addCircle() {
        await this.props.editor.addShapeBlock('circle');
        this.handleClose();
    }

    private async addAsset(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files[0];
        await this.props.editor.addAssetBlockFromFile(file);
    }

    private async addText() {
        await this.props.editor.addTextBlock('ArialMT', 16);
        this.handleClose();
    }

    private addBarcode() {
        return this.props.editor.addBarcodeBlock('ean13');
    }

    private handleClose() {
        this.props.onClose();
    }
}
