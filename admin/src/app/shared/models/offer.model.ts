import {BaseModel} from "./base.model";

export class OfferModel extends BaseModel {
    offer: number;
    tender: string;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
    }

}