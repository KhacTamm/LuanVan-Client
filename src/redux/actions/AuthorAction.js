import axios from 'axios'
import { axiosClient } from '../../services/config.services'

export const saveAuthor = (author) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        if (!author.get('_id')) {
            const { data } = await axios.post('http://localhost:4000/author/create', author, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })
            dispatch({ type: 'SAVE_AUTHOR', payload: data })
        } else {
            const { data } = await axios.put(`http://localhost:4000/author/update`, author, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })

            dispatch({ type: 'SAVE_AUTHOR', payload: data })
        }
    } catch (error) {
        dispatch({ type: 'SAVE_AUTHOR_FAIL', payload: error.message })
    }
}

export const updateAuthorVisible = (state, ID) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.put(`http://localhost:4000/author/update/visible/${ID}`, state, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'UPDATE_VISIBLE_AUTHOR', payload: data })
    } catch (error) {
        dispatch({ type: 'UPDATE_VISIBLE_AUTHOR_FAIL', payload: error.message })
    }
}

export const getAllAuthor = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/author`)
        dispatch({ type: 'GET_ALL_AUTHOR', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_ALL_AUTHOR_FAIL', payload: error.message })
    }
}

export const getAuthorById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/author/detail/${id}`)
        dispatch({ type: 'GET_AUTHOR_BY_ID', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_AUTHOR_BY_ID_FAIL', payload: error.message })
    }
}

export const deleteAuthor = (author) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.delete(`http://localhost:4000/author/delete/${author._id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'DELETE_AUTHOR_PRODUCT', payload: data })
    } catch (error) {}
}

export const removeAuthorById = (id) => async (dispatch) => {
    dispatch({ type: 'REMOVE_AUTHOR_BY_ID' })
}

export const paginationAuthor = (page, perPage) => async (dispatch) => {
    try {
        if (!perPage) {
            perPage = 4
        }
        const data = await axiosClient.get(`/author/pagination/${page}/${perPage}`)
        dispatch({ type: 'PAGINATION_AUTHOR', payload: data })
    } catch (error) {}
}

export const editCurrentPage = (page) => async (dispatch) => {
    dispatch({ type: 'EDIT_AUTHOUR_CURRENT_PAGE', payload: page })
}

export const searchAuthor = (name) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/author/search?name=${name}`)
        dispatch({ type: 'SEARCH_AUTHOR', payload: data })
    } catch (error) {
        dispatch({ type: 'SEARCH_AUTHOR_FAIL', payload: error.message })
    }
}

export const removeSearchAuthor = () => async (dispatch) => {
    dispatch({ type: 'REMOVE_SEARCH_AUTHOUR' })
}
