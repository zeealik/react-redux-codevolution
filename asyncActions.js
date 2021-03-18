const redux = require('redux');
const createStore = redux.createStore
const thunkMiddleware = require("redux-thunk").default
const applyMiddleware = redux.applyMiddleware
const axios = require('axios')

// STATE DEFINED HERE
const initialState = {
  loading: false,
  users: [],
  error: ''
}

// ACTIONS DEFINED HERE

const FETCH_USERS_REQUESTS= 'FETCH_USERS_REQUESTS';
const FETCH_USERS_SUCCESS= 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE= 'FETCH_USERS_FAILURE';

// ACTION CREATORS DEFINED HERE

const fetchUsersRequest = ()=>{
  return {
    type: FETCH_USERS_REQUESTS

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
    type: FETCH_USERS_FAILURE,
    payload: error

  }
}

// REDUCER FUNCTION GOES HERE

const reducer = (state = initialState , action)  => {
    switch (action.type) {
      case FETCH_USERS_REQUESTS:
      return{
        ...state,
        loading: true
      }
      case FETCH_USERS_SUCCESS:
      return {
        loading:false,
        users: action.payload,
        error:''
      }
      case FETCH_USERS_FAILURE:
      return {
          loading:false,
          users:[],
          error: action.payload
      }
    }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
          const users = response.data.map(user => user.id)
          dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log("this is state", store.getState)
})
store.dispatch(fetchUsers())
