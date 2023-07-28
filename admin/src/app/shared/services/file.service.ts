import ApiClient from './api-client/api-client';
import {FileModel} from "../models/file.model";

const FILES_ENDPOINT='/uploads';

export const createFile = async (file: FileModel): Promise<FileModel | null> => {
    return ApiClient.post(FILES_ENDPOINT, file)
        .then(response => response.data)
        .then(data => new FileModel(data))
}

export const getFiles=()=>{
    return ApiClient.get(FILES_ENDPOINT)
        .then(response=>response.data)
}