import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:8000/userlogin', {
            email,
            password,
        })

        const { accessToken, user } = response.data
        cookies.set('accessToken', accessToken)
        setSession(accessToken)
        cookies.set('adminrole', user.adminrole)
        localStorage.setItem('role', response.data.userLogin.role)
        cookies.set('_id', response.data.userLogin._id)

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    // const register = async (email, username, password) => {
    //     const response = await axios.post('/api/auth/register', {
    //         email,
    //         username,
    //         password,
    //     })

    //     const { accessToken, user } = response.data

    //     setSession(accessToken)

    //     dispatch({
    //         type: 'REGISTER',
    //         payload: {
    //             user,
    //         },
    //     })
    // }

    const logout = async () => {
        const id = cookies.get('_id')
        const response = await axios.post(
            `http://localhost:8000/userlogout/${id}`
        )
        // console.log(response)
        setSession(null)
        cookies.remove('accessToken')
        // cookies.remove('adminrole')
        // localStorage.removeItem('role')
        // cookies.remove('_id')
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ;(async () => {
            try {
                const accessToken = cookies.get('accessToken')
                const id = cookies.get('_id')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    const response = await axios.get(
                        `http://localhost:8000/adminlist/${id}`
                    )
                    const { user } = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                // register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
