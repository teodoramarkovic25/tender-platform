import ApiClient from './api-client/api-client';
import {TenderModel} from "../models/tender.model";
const TENDER_ENDPOINT = '/tenders';
const getTenders = () => {
    return ApiClient.get(TENDER_ENDPOINT)
        .then(response => response.data)
}
export const getTender = async (tenderId: string): Promise<TenderModel | null> => {
    return ApiClient.get(`${TENDER_ENDPOINT}/${tenderId}`)
        .then(response => response.data)
        .then(data =>  new TenderModel(data))
}

export const createTender = async (tender: TenderModel): Promise<TenderModel | null> => {
    return ApiClient.post(TENDER_ENDPOINT, tender)
        .then(response => response.data)
        .then(data => new TenderModel(data))
}










