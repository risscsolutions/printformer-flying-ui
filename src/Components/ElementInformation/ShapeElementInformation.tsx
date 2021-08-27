import {GenericElementInformation} from "./GenericElementInformation";

export class ShapeElementInformation extends GenericElementInformation {
    public render() {
        return this.renderGenericPropertiesList();
    }
}
