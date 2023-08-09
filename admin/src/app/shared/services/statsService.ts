import ApiClient from './api-client/api-client';

const STATS_ENDPOINT = '/stats';

export const getStats = async ()=>{
    return ApiClient.get(`${STATS_ENDPOINT}`)
        .then(response => response.data);
}

export const getChartData = async ()=>{
    return ApiClient.get(`${STATS_ENDPOINT}/chart`)
        .then(response => response.data);
}