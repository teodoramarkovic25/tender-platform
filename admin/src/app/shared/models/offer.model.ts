import {BaseModel} from "./base.model";
import {TenderModel} from "./tender.model";

export class OfferModel extends BaseModel {
    offer: number;
    tender: TenderModel;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
    }

}