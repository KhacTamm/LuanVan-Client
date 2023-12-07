import axios from 'axios'

export const login = (user) => async (dispatch) => {
    try {
        const { data } = await axios.post('http://localhost:4000/user/login', user)
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAIL', payload: error.response.data.message })
    }
}

export const SignupUser = (user) => async (dispatch) => {
    try {
        const { data } = await axios.post('http://localhost:4000/user/register', user)
        localStorage.setItem('userInfo', JSON.stringify(data))
        dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: data })
    } catch (error) {}
}

export const SignoutUser = (user) => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: 'USER_SIGNOUT_SUCCESS' })
    document.location.href = '/login'
}

export const getAllUser = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get('http://localhost:4000/user')
        dispatch({ type: 'GET_ALL_USER', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_ALL_USER_FAIL', payload: error.message })
    }
}

export const getUserById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/user/detail/${id}`)
        dispatch({ type: 'GET_USER_BY_ID', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_USER_BY_ID_FAIL', payload: error.message })
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    const {
        getUsers: { userInfo },
    } = getState()
    try {
        const { data } = await axios.put(`http://localhost:4000/user/update/${userInfo._id}`, user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'UPDATE_USER', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: 'UPDATE_USER_FAIL', error: error.message })
    }
}

export const addAddress = (address) => async (dispatch, getState) => {
    const {
        getUsers: { userInfo },
    } = getState()
    try {
        const { data } = await axios.put(`http://localhost:4000/user/addaddress/${userInfo._id}`, address, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'ADRESS_USER', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: 'ADRESS_FAIL', error: error.message })
    }
}

export const updateAddress = (userID, addressId, address) => async (dispatch, getState) => {
    const {
        getUsers: { userInfo },
    } = getState()
    try {
        const { data } = await axios.put(`http://localhost:4000/user/updateaddress/${userID}/${addressId}`, address, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
        dispatch({ type: 'UPDATE_ADRESS_USER', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: 'UPDATE_ADRESS_USER_FAIL', error: error.message })
    }
}

export const deleteAddress = (addressId, admin) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        const { data } = await axios.delete(
            `http://localhost:4000/user/delete/address/${userInfo._id}/${addressId._id}`,
        )

        dispatch({ type: 'DELETE_ADDRESS_USER', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: 'DELETE_ADDRESS_USER_FAIL', error: error.message })
    }
}

export const setDefaultAddress = (addressId, isDefault) => async (dispatch, getState) => {
    const {
        getUsers: { userInfo },
    } = getState()
    try {
        const { data } = await axios.put(
            `http://localhost:4000/user/setdefaultaddress/${userInfo._id}/${addressId}`,
            isDefault,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            },
        )
        dispatch({ type: 'SET_DEFAULT_ADRESS_USER', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: 'SET_DEFAULT_ADRESS_USER_FAIL', error: error.message })
    }
}

// ====================================================== Admin ==========================================================

export const saveAddressUser = (userID, address, addressId) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        if (!addressId) {
            const { data } = await axios.put(`http://localhost:4000/user/addaddress/${userID}`, address, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })
            dispatch({ type: 'SAVE_ADDRESS_USER', payload: data })
        } else {
            const { data } = await axios.put(
                `http://localhost:4000/user/updateaddress/${userID}/${addressId}`,
                address,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                },
            )
            dispatch({ type: 'SAVE_ADDRESS_USER', payload: data })
        }
    } catch (error) {
        dispatch({ type: 'SAVE_ADDRESS_USER_FAIL', payload: error.message })
    }
}

export const deleteAddressAdmin = (userID, addressId) => async (dispatch, getState) => {
    try {
        const { data } = await axios.delete(`http://localhost:4000/user/delete/address/${userID}/${addressId._id}`)
        dispatch({ type: 'DELETE_ADDRESS_USER_ADMIN', payload: data })
    } catch (error) {
        dispatch({ type: 'DELETE_ADDRESS_USER_ADMIN_FAIL', error: error.message })
    }
}

export const setDefaultAddressAdmin = (userID, addressId, isDefault) => async (dispatch, getState) => {
    const {
        getUsers: { userInfo },
    } = getState()
    try {
        const { data } = await axios.put(
            `http://localhost:4000/user/setdefaultaddress/${userID}/${addressId}`,
            isDefault,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            },
        )
        dispatch({ type: 'SET_DEFAULT_ADRESS_USER_ADMIN', payload: data })
    } catch (error) {
        dispatch({ type: 'SET_DEFAULT_ADRESS_USER_ADMIN_FAIL', error: error.message })
    }
}

export const saveUser = (user, id) => async (dispatch, getState) => {
    try {
        const {
            getUsers: { userInfo },
        } = getState()
        if (!user.get('_id')) {
            const { data } = await axios.post(`http://localhost:4000/user/create`, user, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })
            dispatch({ type: 'SAVE_USER', payload: data })
        } else {
            const { data } = await axios.put(`http://localhost:4000/user/update/${id}`, user, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })

            dispatch({ type: 'SAVE_USER', payload: data })
        }
    } catch (error) {
        dispatch({ type: 'SAVE_USER_FAIL', payload: error.message })
    }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
    try {
        const { data } = await axios.delete(`http://localhost:4000/user/delete/${userId}`)
        dispatch({ type: 'DELETE_USER', payload: data })
    } catch (error) {
        dispatch({ type: 'DELETE_USER_FAIL', error: error.message })
    }
}

export const searchUser = (name) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/user/search?name=${name}`)
        dispatch({ type: 'SEARCH_USER', payload: data })
    } catch (error) {
        dispatch({ type: 'SEARCH_USER_FAIL', payload: error.message })
    }
}

export const removeSearchUser = () => async (dispatch) => {
    dispatch({ type: 'REMOVE_SEARCH_USER' })
}

export const removeUserById = () => async (dispatch) => {
    dispatch({ type: 'REMOVE_USER_BY_ID' })
}
// ====================================================== Admin ==========================================================
