/**
 * Module dependencies.
 */

import "bootstrap/dist/css/bootstrap.css";
import React from "react";

class CurrencyValue extends React.Component {
    render() {
        //console.log(this.props.userInfo);
        if (this.props.info.isRequesting) {
            return <h2>Waiting</h2>;
        } else {
            const { bitcoin, ethereum } = this.props.info.currenciesValue;
            console.log(this.props.info.currenciesValue);

            return (
                <>
                    <h2> Currency Values</h2>
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            Btc: <span>{bitcoin.eur}</span>
                        </li>
                        <li className='list-group-item'>
                            Eth: <span>{ethereum.eur}</span>
                        </li>
                    </ul>
                </>
            );
        }
    }
}

export default CurrencyValue;
