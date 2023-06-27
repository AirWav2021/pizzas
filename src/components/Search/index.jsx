import React, { useCallback, useContext, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'
import { SearchContext } from '../../App'

export const Search = () => {
	const [value, setValue] = useState('')
	const { searchValue, setSearchValue } = useContext(SearchContext)
	const inputRef = useRef()

	const onClickClear = () => {
		setSearchValue('')
		setValue('')
		inputRef.current.focus()
	}

	const updateSearchValue = useCallback(
		debounce(str => {
			setSearchValue(str)
		}, 1000),
		[],
	)

	const onChangeInput = event => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.root}>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				type='text'
				name=''
				id=''
				placeholder='Поиск пиццы...'
			/>
			{searchValue && (
				<span onClick={() => onClickClear()} className={styles.close}>
					x
				</span>
			)}
		</div>
	)
}
