import { useState, useEffect } from 'react'

import config from '~/config'
import classNames from 'classnames/bind'
import Styles from './Sidebar.module.scss'

import * as userService from '~/services/userService'

import SuggestedAccounts from './SuggestAcount.SuggestAccount/SuggestedAccounts'

import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/component/icon'
import Menu from './Menu'
import { MenuItem } from './Menu'

const cx = classNames.bind(Styles)

const INIT_PAGE = 1
const PER_PAGE = 5

function SideBar() {
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [page, setPage] = useState([INIT_PAGE])

    useEffect(() => {
        userService
            .getSuggested({ page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUsers((prevUsers) => [...prevUsers, data])
            })
            .catch((error) => {
                console.log({ error })
            })
    }, [page])

    const handleSeeAll = () => {
        setPage(2)
    }

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestedAccounts label="Suggested accounts" data={suggestedUsers} onSeeAll={handleSeeAll} />
            <SuggestedAccounts label="Following accounts" />
        </aside>
    )
}

export default SideBar
