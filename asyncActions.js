const redux = require('redux');
const createStore = redux.createStore()
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

const fetchUsersSuccess = users =>{
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = errors =>{
  return {
    type: FETCH_USERS_FAILURE
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
        ...state,
        loading:false,
        users: action.payload,
        error:''
      }
      case FETCH_USERS_FAILURE:
      return {
          ...state,
          loading:false,
          users:[],
          error: action.payload
      }



    }
}

const store = createStore(reducer)
