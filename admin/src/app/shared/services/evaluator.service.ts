
import ApiClient from './api-client/api-client';
import {EvaluatorModel} from "../models/evaluator.model";
const EVALUATOR_ENDPOINT = '/evaluators';
const getEvaluator = () => {
    return ApiClient.get(EVALUATOR_ENDPOINT)
        .then(response => response.data)
}
export const postEvaluator = async (evaluatorId: string): Promise<EvaluatorModel | null> => {
    return ApiClient.get(`${EVALUATOR_ENDPOINT}/${evaluatorId}`)
        .then(response => response.data)
        .then(data =>  new EvaluatorModel(data))
}
export const createEvaluator = async (evaluator: EvaluatorModel): Promise<EvaluatorModel | null> => {
    return ApiClient.post(EVALUATOR_ENDPOINT, evaluator)
        .then(response => response.data)
        .then(data => new EvaluatorModel(data))
}