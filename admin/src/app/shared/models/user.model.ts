import {BaseModel} from "./base.model";
import {CompanyModel} from "./company.model";

export class UserModel extends BaseModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isEmailVerified: string;
    company: CompanyModel;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
    }

}