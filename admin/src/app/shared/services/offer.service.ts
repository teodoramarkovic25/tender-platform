import ApiClient from './api-client/api-client';
import {OfferModel} from "../models/offer.model";

const OFFERS_ENDPOINT = '/offers';

export const createOffer = async (offer: OfferModel): Promise<OfferModel | null> => {
    return ApiClient.post(OFFERS_ENDPOINT, offer)
        .then(response => response.data)
        .then(data => new OfferModel(data))
}
/*
export const getOffers = () => {
    return ApiClient.get(OFFERS_ENDPOINT)
        .then(response => response.data)
}*/

export const getOffers = (): Promise<OfferModel[] | null> => {
    return ApiClient.get(OFFERS_ENDPOINT)
        .then(response => response.data)
        .then(data => data.results)
        .then(data => data.map(item => new OfferModel(item)))
}

export const getOffer = async (offerId: string): Promise<OfferModel | null> => {
    return ApiClient.get(`${OFFERS_ENDPOINT}/${offerId}`)
        .then(response => response.data)
        .then(data => new OfferModel(data))
}

export const updateOffer = async (offerId: string, updateData: any): Promise<OfferModel | null> => {
    return ApiClient.put(`${OFFERS_ENDPOINT}/${offerId}`, updateData)
        .then(response => response.data)
        .then(data => new OfferModel(data));
};
