import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productDummyData } from '@/assets/assets'
import { getAllProducts } from '@/lib/firebaseDb'

// Async thunk to fetch products from Firebase
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    const products = await getAllProducts()
    // If no products in Firebase, fall back to dummy data
    return products.length > 0 ? products : productDummyData
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: productDummyData,
        status: 'idle',
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
        },
        clearProduct: (state) => {
            state.list = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.list = action.payload
                state.status = 'succeeded'
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const { setProduct, clearProduct } = productSlice.actions

export default productSlice.reducer