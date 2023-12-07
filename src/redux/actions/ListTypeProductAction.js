import axios from 'axios'
import { axiosClient } from '../../services/config.services'

export const getAllTypeProduct = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:4000/category')
        dispatch({ type: 'GET_ALL_TYPE_PRODUCT', payload: data })
    } catch (error) {}
}

export const getTypeById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/category/detail/${id}`)
        dispatch({ type: 'GET_TYPE_BY_ID', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_TYPE_BY_ID_FAIL', payload: error.message })
    }
}

export const removeTypeById = () => async (dispatch) => {
    dispatch({ type: 'REMOVE_TYPE_BY_ID' })
}

export const saveType = (type) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        if (!type.get('_id')) {
            const { data } = await axios.post(`http://localhost:4000/category/create`, type, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })
            dispatch({ type: 'SAVE_TYPE', payload: data })
        } else {
            const { data } = await axios.put(`http://localhost:4000/category/update`, type, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })

            dispatch({ type: 'SAVE_TYPE', payload: data })
        }
    } catch (error) {
        dispatch({ type: 'SAVE_TYPE_FAIL', payload: error.message })
    }
}

export const updateTypeVisible = (state, id) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.put(`http://localhost:4000/category/update/visible/${id}`, state, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'UPDATE_VISIBLE_TYPE', payload: data })
    } catch (error) {
        dispatch({ type: 'UPDATE_VISIBLE_TYPE_FAIL', payload: error.message })
    }
}

export const deleteTypeProduct = (type) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:4000/category/delete/${type._id}`)
        dispatch({ type: 'DELETE_TYPE_PRODUCT', payload: data })
    } catch (error) {}
}

export const paginationTypeProduct = (page) => async (dispatch) => {
    try {
        const data = await axiosClient.get(`/category/pagination/${page}`)
        dispatch({ type: 'PAGINATION_TYPE', payload: data })
    } catch (error) {}
}

export const editCurrentPage = (page) => async (dispatch) => {
    dispatch({ type: 'EDIT_CURRENT_PAGE_TYPE', payload: page })
}

export const searchType = (name) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/category/search?name=${name}`)
        dispatch({ type: 'SEARCH_TYPE', payload: data })
    } catch (error) {
        dispatch({ type: 'SEARCH_TYPE_FAIL', payload: error.message })
    }
}

export const removeSearchType = () => async (dispatch) => {
    dispatch({ type: 'REMOVE_SEARCH_TYPE' })
}
