import api from './axios';

export const getAllFiles = async () => {
    try {
        const filesList = await api.get('/');
        return filesList.data;
    } catch (error) {
        console.error('axios error:', error);
    }
    return [];
};
