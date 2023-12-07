import axios from 'axios'
import { axiosClient } from '../../services/config.services'

export const getAllBrandProduct = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:4000/publisher')
        dispatch({ type: 'GET_ALL_BRAND_PRODUCT', payload: data })
    } catch (error) {}
}

export const getBrandById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/publisher/detail/${id}`)
        dispatch({ type: 'GET_BRAND_BY_ID', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_BRAND_BY_ID_FAIL', payload: error.message })
    }
}

export const saveBrand = (brand) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        if (!brand.get('_id')) {
            const { data } = await axios.post(`http://localhost:4000/publisher/create`, brand, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })
            dispatch({ type: 'SAVE_BRAND', payload: data })
        } else {
            const { data } = await axios.put(`http://localhost:4000/publisher/update`, brand, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })

            dispatch({ type: 'SAVE_BRAND', payload: data })
        }
    } catch (error) {
        dispatch({ type: 'SAVE_BRAND_FAIL', payload: error.message })
    }
}

export const updateBrandVisible = (state, idBrand) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.put(`http://localhost:4000/publisher/update/visible/${idBrand}`, state, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'UPDATE_VISIBLE_BRAND', payload: data })
    } catch (error) {
        dispatch({ type: 'UPDATE_VISIBLE_BRAND_FAIL', payload: error.message })
    }
}

export const deleteBrandProduct = (brand) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:4000/publisher/delete/${brand._id}`)
        dispatch({ type: 'DELETE_BRAND_PRODUCT', payload: data })
    } catch (error) {}
}

export const removeBrandById = () => async (dispatch) => {
    dispatch({ type: 'REMOVE_BRAND_BY_ID' })
}

export const paginationBrandProduct = (page) => async (dispatch) => {
    try {
        const data = await axiosClient.get(`/publisher/pagination/${page}`)
        dispatch({ type: 'PAGINATION_BRAND', payload: data })
    } catch (error) {}
}

export const editCurrentPage = (page) => async (dispatch) => {
    dispatch({ type: 'EDIT_CURRENT_PAGE_BARND', payload: page })
}

export const searchBrand = (name) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/publisher/search?name=${name}`)
        dispatch({ type: 'SEARCH_BRAND', payload: data })
    } catch (error) {
        dispatch({ type: 'SEARCH_BRAND_FAIL', payload: error.message })
    }
}

export const removeSearchBrand = () => async (dispatch) => {
    dispatch({ type: 'REMOVE_SEARCH_BRAND' })
}
