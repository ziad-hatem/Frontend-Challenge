import { create } from "zustand"
import { productsApi } from "@/lib/api"
import type { Product, ProductFormValues } from "@/lib/types"

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[]
  isLoading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string
  currentPage: number
  itemsPerPage: number
  applyFilters: () => void;

  // Actions
  fetchProducts: () => Promise<void>
  fetchCategories: () => Promise<void>
  addProduct: (product: ProductFormValues) => Promise<void>
  updateProduct: (id: number, product: ProductFormValues) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setCurrentPage: (page: number) => void
  setItemsPerPage: (count: number) => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  selectedCategory: "",
  currentPage: 1,
  itemsPerPage: 10,

  // Actions
  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    try {
      const products = await productsApi.getAll()
      set({
        products,
        filteredProducts: products,
        isLoading: false,
      })
      get().applyFilters()
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch products",
      })
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await productsApi.getCategories()
      set({ categories })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch categories",
      })
    }
  },

  addProduct: async (product: ProductFormValues) => {
    set({ isLoading: true, error: null })
    try {
      const newProduct = await productsApi.create(product)
      set((state) => ({
        products: [...state.products, newProduct],
        isLoading: false,
      }))
      get().applyFilters()
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to add product",
      })
    }
  },

  updateProduct: async (id: number, product: ProductFormValues) => {
    set({ isLoading: true, error: null })
    try {
      const updatedProduct = await productsApi.update(id, product)
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
        isLoading: false,
      }))
      get().applyFilters()
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to update product",
      })
    }
  },

  deleteProduct: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await productsApi.delete(id)
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        isLoading: false,
      }))
      get().applyFilters()
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to delete product",
      })
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
    get().applyFilters()
  },

  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category, currentPage: 1 })
    get().applyFilters()
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page })
  },

  setItemsPerPage: (count: number) => {
    set({ itemsPerPage: count, currentPage: 1 })
  },

  applyFilters: () => {
    const { products, searchQuery, selectedCategory } = get()

    let filtered = [...products]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    set({ filteredProducts: filtered })
  },
}))

