import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    currentCart:{},
    letterCart:{}
  },
}

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart:(state,action)=>{
      state.value = action.payload
    },
    add: (state, action) => {
      if(state.value['letterCart'][action.payload[0]]){
        state.value['currentCart'][action.payload[0]] = [action.payload[1],action.payload[2],1]
        delete state.value['letterCart'][action.payload[0]]
      }
      else if(!state.value['currentCart'][action.payload[0]]){
        state.value['currentCart'][action.payload[0]] = [action.payload[1],action.payload[2],1]
      }
      else{
        state.value['currentCart'][action.payload[0]][2] += 1
      }
    },
    increment: (state,action) => {
      state.value['currentCart'][action.payload][2] += 1
    },
    decrement: (state,action) => {
      state.value['currentCart'][action.payload][2] -= 1
      if((state.value['currentCart'][action.payload][2]) <= 0){
        delete state.value['currentCart'][action.payload]
      }
    },
    saveLatter: (state,action) => {
      state.value['letterCart'][action.payload] = [state.value['currentCart'][action.payload][0],state.value['currentCart'][action.payload][1]]
      delete state.value['currentCart'][action.payload]
    },
    remove: (state,action) => {
      delete state.value['currentCart'][action.payload]
    },
    moveToCart: (state,action) => {
      state.value['currentCart'][action.payload] = [state.value['letterCart'][action.payload][0],state.value['letterCart'][action.payload][1],1]
      delete state.value['letterCart'][action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCart, add, increment, decrement, saveLatter, remove, moveToCart } = counterSlice.actions

export default counterSlice.reducer