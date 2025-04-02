import axios from "axios"
import type { Product, ProductFormValues } from "@/lib/types"

const API_URL = "https://fakestoreapi.com"

// Create axios instance with interceptors
const api = axios.create({
  baseURL: API_URL,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You could add auth tokens here
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle errors globally
    console.error("API Error:", error)
    return Promise.reject(error)
  },
)

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products")
    return response.data
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  create: async (product: ProductFormValues): Promise<Product> => {
    const response = await api.post("/products", product)
    return response.data
  },

  update: async (id: number, product: ProductFormValues): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`)
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get("/products/categories")
    return response.data
  },
}

