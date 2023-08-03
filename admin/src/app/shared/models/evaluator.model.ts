import { BaseModel } from "./base.model";

export class EvaluatorModel extends BaseModel {

  proposal: string;
  rating: number;
  comment: Date;
  collaborators: string;

  constructor(attributes?: any) {
    super();
    this.setAttributes(attributes);
  }
};