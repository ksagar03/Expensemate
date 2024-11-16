import axios from "axios";


export const fetchCategories = async (searchQuery: string): Promise<string[]> => {
    const response = await axios.get('/api/categories',{params: {search: searchQuery}})
    return response.data.categories
}

export const addCategory = async (newCategory: string) => {
    const response = await axios.post('/api/categories', {newCategory})
    return response.data.category
}