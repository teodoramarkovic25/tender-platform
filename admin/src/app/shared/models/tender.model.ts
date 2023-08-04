import { BaseModel } from "./base.model";
import {FileModel} from "./file.model";

export class TenderModel extends BaseModel {
  title: string;
  description: string;
  deadline: Date;
   documents: FileModel;
  criteria: string;
  weightage: number;

  constructor(attributes?: any) {
    super();
    this.setAttributes(attributes);
  }

}
