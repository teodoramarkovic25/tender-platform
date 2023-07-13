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

export const getOffers = async () => {
    try {
        const response = await ApiClient.get(OFFERS_ENDPOINT);
        return response.data;
    } catch (error) {
        console.log('error');
        return [];
    }
}
export const getOffer = async (offerId: string): Promise<OfferModel | null> => {
    return ApiClient.get(`${OFFERS_ENDPOINT}/${offerId}`)
        .then(response => response.data)
        .then(data => new OfferModel(data))
}
