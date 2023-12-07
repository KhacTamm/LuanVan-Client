import PropTypes from 'prop-types'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classNames from 'classnames/bind'
import Styles from './AccountReview.module.scss'

import Button from '~/component/Button'

const cx = classNames.bind(Styles)

function AccountReview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} src={data.avatar} alt={`${data.nickname}`} />

                <Button className={cx('follow-btn')} primary>
                    Following
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{`${data.nickname}`}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
            </div>
            <p className={cx('analytics')}>
                <strong className={cx('value')}>{data.followers_count} </strong>
                <span className={cx('label')}>Following</span>
                <strong className={cx('value')}>{data.likes_count} </strong>
                <span className={cx('label')}>Like</span>
            </p>
        </div>
    )
}

AccountReview.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountReview
