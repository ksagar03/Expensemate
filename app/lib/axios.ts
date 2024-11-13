import axios from "axios";


export const fetchCategories = async () => {
    const response = await axios.get('/api/categories')
    return response.data.categories
}

export const addCategory = async (newCategory: string) => {
    const response = await axios.post('/api/categories', {newCategory})
    return response.data.category
}