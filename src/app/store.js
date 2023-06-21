import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import cartReducer from './slice/cartReducer'
import checkoutReducer from './slice/checkoutReducer'
import authSlice from './slice/authSlice'
import thunk from 'redux-thunk'
import themeSlice from './slice/themeSlice'
import adminSlice from './slice/adminSlice'

const middlewareEnhancer = applyMiddleware(thunk)

export const store = configureStore({
  reducer: {
    checkout:checkoutReducer,
    cart:cartReducer,
    auth:authSlice,
    theme:themeSlice,
    admin:adminSlice
  },
})

// import cartReducer from './slice/cartReducer'
// import checkoutReducer from './slice/checkoutReducer'
// import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
// import thunk from 'redux-thunk'

// const rootReducer = combineReducers({
//   cart: cartReducer,
//   checkout: checkoutReducer
// })

// const middlewareEnhancer = applyMiddleware(thunk)

// // const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// // const composedEnhancers = composeWithDevTools(middlewareEnhancer)

// const store = createStore(rootReducer)

// export default store