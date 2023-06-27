import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { PizzaBlock } from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { Pagination } from '../components/Pagination'
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId, setCurentPage } from '../redux/slices/filterSlice'

export const Home = () => {
	const categoryId = useSelector(state => state.filter.categoryId)
	const sortType = useSelector(state => state.filter.sort.sortProperty)
	const currentPage = useSelector(state => state.filter.currentPage)
	const dispatch = useDispatch()

	const { searchValue } = useContext(SearchContext)

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	// const [categoryId, setCategoryId] = useState(0)

	const onChangeCategory = id => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = number => {
		dispatch(setCurentPage(number))
	}

	useEffect(() => {
		setIsLoading(true)

		const sortBy = sortType.replace('-', '')
		const order = sortType.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		axios
			.get(
				`https://628fb9b80e69410599e1a532.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
			)
			.then(res => {
				setItems(res.data)
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [categoryId, sortType, searchValue, currentPage])

	const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />)

	// Статичная фильтрация (поиск)
	// const pizzas = items
	// 	.filter(obj => {
	// 		if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
	// 			return true
	// 		}
	// 		return false
	// 	})
	// 	.map(obj => <PizzaBlock key={obj.id} {...obj} />)

	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)

	return (
		<div>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={id => onChangeCategory(id)}
				/>
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}
