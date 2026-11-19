import axios from 'axios'
import { useUserStore } from '../store/useUserStore'

export const API_URL = 'https://api.kitek-pg.ru/api/marketplace'

export const apiInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

apiInstance.interceptors.request.use((config) => {
    const { session } = useUserStore.getState()

    if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
    }

    return config
})

const loginUser = async ({ username, password }) => {
    const res = await apiInstance.post('/auth/login', { username, password })
    return res.data
}

const registerUser = async ({ username, email, password }) => {
    const res = await apiInstance.post('/auth/register', { username, email, password })
    return res.data
}

const getItems = async () => {
    const res = await apiInstance.get('/items')
    return res.data
}

const sendItems = async (item) => {
    const res = await apiInstance.post('/items', item)
    return res.data
}

const deleteItem = async (id) => {
    const res = await apiInstance.delete(`/items/${id}`)
    return res.data
}

const getBids = async (itemId) => {
    const res = await apiInstance.get(`/items/${itemId}/bids`)
    return res.data
}

const sendBid = async (itemId, amount) => {
    const res = await apiInstance.post(`/items/${itemId}/bids`, { amount })
    return res.data
}

const getMyBids = async () => {
    const res = await apiInstance.get('/bids/my')
    return res.data
}

const getMe = async () => {
    const res = await apiInstance.get('/auth/me')
    return res.data
}

const getStats = async () => {
    const res = await apiInstance.get('/stats')
    return res.data
}

export const api = {
    loginUser,
    registerUser,
    getItems,
    sendItems,
    deleteItem,
    getBids,
    sendBid,
    getMyBids,
    getMe,
    getStats,
}