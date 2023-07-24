import {BaseModel} from "./base.model";
import {TenderModel} from "./tender.model";
import {UserModel} from "./user.model";

export class OfferModel extends BaseModel {
    id: string;
    offer: number;
    tender: TenderModel;
    //documents:
    createdBy:UserModel;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
    }

}