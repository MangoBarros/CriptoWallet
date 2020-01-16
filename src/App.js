/**
 * Module dependencies.
 */

import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Navbar from "./Components/NavBar";
import UserMoney from "./Components/UserMoney";
import CurrencyValue from "./Components/CurrencyValue";
import ExchangeMoney from "./Components/ExchangeMoney";

/**
 * App.
 */

class App extends React.Component {
    /**
     * State.
     */

    state = {
        currenciesValue: null,
        isRequestingCurrencyInfo: true,

        user: null,
        wallet: null,
        isRequestingWallet: true
    };

    /**
     * componentDidMount.
     */

    async componentDidMount() {
        await this.getCoinInfo();
        await this.getWallet();
    }

    async getCoinInfo() {
        try {
            const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=eur");
            const data = await response.json();

            this.setState(prevState => ({ ...prevState, currenciesValue: data }));
        } catch (e) {
            console.log("deu CANA");
        } finally {
            this.setState(prevState => ({ ...prevState, isRequestingCurrencyInfo: false }));
        }
    }

    async getWallet() {
        try {
            const responseWallet = await fetch("http://localhost:3001/wallet/e6318b01-1a71-48e6-a02d-ebadecfc4849");
            const dataWallet = await responseWallet.json();
            const responseUser = await fetch("http://localhost:3001/users/02d6c400-71da-4b4d-9319-5929e7e5c5f2");
            const dataUser = await responseUser.json();

            this.setState(prevState => ({ ...prevState, user: dataUser }));
            this.setState(prevState => ({ ...prevState, wallet: dataWallet }));
            //console.log(this.state.wallet);
        } catch (e) {
            console.log("Deu Cana");
        } finally {
            this.setState(prevState => ({ ...prevState, isRequestingWallet: false }));
        }
    }

    render() {
        return (
            <>
                <Navbar currencyInfo={this.state.currenciesValue} />

                <div className={"container my-5"}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <CurrencyValue info={{ currenciesValue: this.state.currenciesValue, isRequesting: this.state.isRequestingCurrencyInfo }} />
                        </div>
                        <div className={"col-6"}>
                            <UserMoney userInfo={{ user: this.state.user, wallet: this.state.wallet, isRequestingWallet: this.state.isRequestingWallet }} />
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-12 my-5"}>
                            <ExchangeMoney
                                walletCoinInfo={{
                                    wallet: this.state.wallet,
                                    isWaitingW: this.state.isRequestingWallet,
                                    currenciesValue: this.state.currenciesValue,
                                    isRequestingC: this.state.isRequestingCurrencyInfo
                                }}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default App;
