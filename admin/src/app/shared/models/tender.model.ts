import { BaseModel } from "./base.model";


export class TenderModel extends BaseModel {
  title: string;
  description: string;
  deadline: Date;
  documents: File;
  criteria: string;
  weightage: number;
}