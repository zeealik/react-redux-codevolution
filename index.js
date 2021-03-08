const redux = require("redux");
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

// =========== DEFINE ACTIONS HERE ==============
// state declared : string constraint
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// =============== ACTION CREATORS HERE ===================

function buyCake() {
	return {
		type: BUY_CAKE,
		info: "First redux action",
	};
}
function buyIceCream() {
	return {
		type: BUY_ICECREAM,
	};
}

// ====================== DECLARE INITIAL STATES HERE =====================

// const initialState = {
// 	numOfCakes: 10,
// 	numOfIceCreams: 20,
// };

const initialCakeState = {
	numOfCakes: 10,
};
const initialIceCreamState = {
	numOfIceCreams: 20,
};

// ============================== REDUCER HERE ==================================

// const reducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case BUY_CAKE:
// 			return {
// 				...state,
// 				numOfCakes: state.numOfCakes - 1,
// 			};
// 		case BUY_ICECREAM:
// 			return {
// 				...state,
// 				numOfIceCreams: state.numOfIceCreams - 1,
// 			};
// 		default:
// 			return state;
// 	}
// };

// cakeReducer
const cakeReducer = (state = initialCakeState, action) => {
	switch (action.type) {
		case BUY_CAKE:
			return {
				...state,
				numOfCakes: state.numOfCakes - 1,
			};
		default:
			return state;
	}
};

// iceCreamReducer
const iceCreamReducer = (state = initialIceCreamState, action) => {
	switch (action.type) {
		case BUY_ICECREAM:
			return {
				...state,
				numOfIceCreams: state.numOfIceCreams - 1,
			};
		default:
			return state;
	}
};

// rootReducer
const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer,
});

// ======================== SUBSCRIBE, UNSUBSCRIBE TO STORE HERE =============================

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() => {});

// =============================== APPLY DISPATCH HERE ====================================

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
