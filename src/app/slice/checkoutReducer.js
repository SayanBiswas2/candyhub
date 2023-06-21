import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address:{},
  product:[]
}

export const caunterSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setProduct: (state,action) => {
      Object.keys(action.payload).map((val,ind)=>{
        state.product[ind] = [val,...action.payload[val]]
      })
    },
    setDetaildAddress: (state,action) => {
      state.address = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProduct, setDetaildAddress } = caunterSlice.actions

export default caunterSlice.reducer