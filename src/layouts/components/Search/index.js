import { useEffect, useState, useRef } from 'react'

import * as searchServices from '~/services/searchService'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'

import HeadlessTippy from '@tippyjs/react/headless' // import Tippy from '@tippyjs/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Wrapper as PopperWrapper } from '~/component/Popper'
import { useDebounce } from '~/hooks'
import { SearchIcon } from '~/component/icon'
import { AccountItem } from '~/component/Popper'

const cx = classNames.bind(styles) //Giúp chung ta có thể đặt tên class như post-item

function Search() {
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleChange = (e) => {
        const searchValue = e.target.value

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }

    const debouncedValue = useDebounce(searchValue, 600)

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([])
            return
        }

        setLoading(true)

        const fetchApi = async () => {
            setLoading(true)

            const result = await searchServices.search(debouncedValue)
            setSearchResult(result)

            setLoading(false)
        }
        fetchApi()
    }, [debouncedValue])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={searchResult.length > 0 && showResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Account</h4>
                            <div className={cx('search-body')}>
                                {searchResult.map((result) => (
                                    <AccountItem key={result.id} data={result} />
                                ))}
                            </div>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search account and videos"
                        spellCheck={false}
                        onFocus={() => setShowResult(true)}
                        onChange={handleChange}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear-btn')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={handleSubmit}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    )
}

export default Search
