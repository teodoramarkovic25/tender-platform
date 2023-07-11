import ApiClient from './api-client/api-client';
import {UserModel} from "../models/user.model";
const USERS_ENDPOINT = '/users';
const getUsers = () => {
    return ApiClient.get(USERS_ENDPOINT)
        .then(response => response.data)
}
export const getUser = (userId: string): Promise<UserModel | null> => {
    return ApiClient.get(`${USERS_ENDPOINT}/${userId}`)
        .then(response => response.data)
        .then(data =>  new UserModel(data))
}












