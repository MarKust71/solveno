import api from './axios';

export const getAllFiles = async () => {
    try {
        // const filesList = await api.get('/');
        // console.log('lista plików:', filesList.data);
        return await api.get('/');
    } catch (error) {
        console.log('axios error:', error.message);
    }
    return [];
};
