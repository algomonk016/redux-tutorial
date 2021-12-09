const redux = require('redux')
const axios = require('axios')
const thunkMiddleware = require('redux-thunk').default

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

// initial state
const initialState = {
    loading: false,
    users: [],
    error: ''
}

// constants
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'

// actionCreator
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}

// reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        
        case FETCH_USERS_ERROR:
            return {
                loading: false,
                error: action.payload,
                users: []
            }
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message))
            })
    }
}


// store, thunk middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => console.log('state', store.getState()))
store.dispatch(fetchUsers())