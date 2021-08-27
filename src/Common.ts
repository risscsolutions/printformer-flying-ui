import * as math from 'mathjs';
import {EditorObject} from "@rissc/printformer-editor-client/dist/Objects";
import EditorClient from "@rissc/printformer-editor-client/dist/EditorClient";
import Events from "@rissc/printformer-editor-client/dist/Events";

export type Props = {
    editor: any
}

export type ReceivesEditorObject = {
    editorObject: any
}

export function onEditorObjectSelected<T extends EditorObject>(
    editor: EditorClient,
    context: object,
    callback: (editorObject: T) => void,
    isRelevantObject?: (editorObject: EditorObject) => editorObject is T,
    onSelectionCleared?: () => void,
): void {
    editor.getEvents().on(Events.EDITOR_OBJECT_SELECTED, (editorObject: EditorObject) => {
        if (isRelevantObject && !isRelevantObject(editorObject)) return;
        const onUpdate = (updatedObject: T) => {
            if (updatedObject.is(editorObject)) callback.call(context, updatedObject)
        };
        editor.getEvents().on(Events.EDITOR_OBJECT_UPDATED, onUpdate);
        editor.getEvents().once(Events.EDITOR_OBJECT_CLEARED, () => {
            if (onSelectionCleared) onSelectionCleared.call(context)
            editor.getEvents().off(Events.EDITOR_OBJECT_UPDATED, onUpdate);
        });
        callback.call(context, editorObject as T);
    });
}

export function convert(value: number, from: string, to: string): number {
    return math.unit(value, from).toNumber(to);
}

export interface AnchorElement {
    clientWidth: number;
    clientHeight: number;
    getBoundingClientRect: () => ({
        left: number, top: number, right: number, bottom: number,
        width: number, height: number, x: number, y: number
    }),
}

export class FakeAnchorElement implements AnchorElement {
    private left: number
    private top: number
    public readonly clientWidth: number;
    public readonly clientHeight: number;

    constructor(width: number, height: number, left: number, top: number) {
        this.clientWidth = width;
        this.clientHeight = height;
        this.left = left;
        this.top = top;
    }

    public static fromEditorObject(editorObject: EditorObject): AnchorElement {
        return new FakeAnchorElement(
            editorObject.clientBoundingRect.width,
            editorObject.clientBoundingRect.height,
            editorObject.clientBoundingRect.left,
            editorObject.clientBoundingRect.top,
        )
    }

    public static center(width: number, height: number): AnchorElement {
        return new FakeAnchorElement(
            width,
            height,
            (window.innerWidth - width) / 2,
            (window.innerHeight - height) / 2
        )
    }

    public getBoundingClientRect() {
        return {
            left: this.left,
            top: this.top,
            height: this.clientHeight,
            width: this.clientWidth,
            right: this.left + this.clientWidth,
            bottom: this.top + this.clientHeight,
            x: this.left,
            y: this.top,
        }
    }
}
