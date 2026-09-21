import axios from "axios";

export interface IEmojiItem {
    id: number;
    emoji: string;
    title: string;
    keywords: string;
}

const API_URL = 'http://localhost:3000/api/emojis'

export const getEmojis = async (query?: string): Promise<IEmojiItem[]> => {
    try {
        const params = query ? { q: query }: undefined;

        const responce = await axios.get<IEmojiItem[]>(API_URL, { params });

        return responce.data;
    } catch (error) {
        console.error('error')
        throw error
    }
}