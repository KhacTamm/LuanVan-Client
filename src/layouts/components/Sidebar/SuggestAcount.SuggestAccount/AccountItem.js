import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react/headless'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames/bind'
import Styles from './Suggested.module.scss'

import { Wrapper as PopperWrapper } from '~/component/Popper'
import AccountReview from './AccountReview'

const cx = classNames.bind(Styles)

function AccountItem({ data }) {
    const renderReview = (props) => {
        return (
            <div className={cx('review')} tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountReview data={data} />
                </PopperWrapper>
            </div>
        )
    }

    return (
        <div>
            <Tippy interactive delay={[600, 0]} placement="bottom" offset={[-20, 0]} render={renderReview}>
                <div className={cx('account-item')}>
                    <img className={cx('avatar')} src={data.avatar} alt={`${data.nickname}`} />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{`${data.nickname}`}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    )
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountItem
