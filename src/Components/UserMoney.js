/**
 * Module dependencies.
 */

import "bootstrap/dist/css/bootstrap.css";
import React from "react";
//import rp  from 'request-promise';

/**
 * CryptoDetail.
 */

class UserMoney extends React.Component {
    render() {
        if (this.props.userInfo.isRequestingWallet || !this.props.userInfo.wallet || this.props.userInfo.isRequestingUser) {
            return <h2>Waiting</h2>;
        } else {
            const { name } = this.props.userInfo.user;

            const { eur, btc, eth } = this.props.userInfo.wallet;

            return (
                <>
                    <h2>{name}</h2>
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            Eur: <span>{eur}</span>
                        </li>
                        <li className='list-group-item'>
                            Btc: <span>{btc}</span>
                        </li>
                        <li className='list-group-item'>
                            Eth: <span>{eth}</span>
                        </li>
                    </ul>
                </>
            );
        }
    }
}

export default UserMoney;
