import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		setCurentPage(state, action) {
			state.currentPage = action.payload
		},
	},
})

export const { setCategoryId, setSort, setCurentPage } = filterSlice.actions

export default filterSlice.reducer
