/**
 * Module dependencies.
 */

import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Navbar from "./Components/NavBar";
import UserMoney from "./Components/UserMoney";
import CurrencyValue from "./Components/CurrencyValue";
import ExchangeMoney from "./Components/ExchangeMoney";
import LogIn from "./Components/LogIn";

/**
 * App.
 */

class App extends React.Component {
    /**
     * State.
     */

    state = {
        currenciesValue: null,
        user: null,
        wallet: null,
        hasErrorOnFetchingWallet: false,

        isLogin: false,

        isRequestingWallet: false,
        isRequestingCurrencyInfo: true,
        isRequestingUser: true
    };

    /**
     * componentDidMount.
     */

    async componentDidMount() {
        await this.getCoinInfo();

        //await this.getUsers();
    }
    componentDidUpdate() {
        if (!this.state.hasErrorOnFetchingWallet && !this.state.isRequestingWallet && !this.state.wallet && this.state.user) {
            this.getWallet();
        }
    }

    async getCoinInfo() {
        try {
            const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=eur");
            const data = await response.json();

            this.setState(prevState => ({ ...prevState, currenciesValue: data }));
        } catch (e) {
            console.log("Error in conversion values");
        } finally {
            this.setState(prevState => ({ ...prevState, isRequestingCurrencyInfo: false }));
        }
    }

    changeData(data) {
        this.setState(ps => ({ ...ps, wallet: data }));
    }

    changeDataUser(data) {
        //console.log(data);
        this.setState(ps => ({ ...ps, user: data, isLogin: true, isRequestingUser: false }));
    }

    async getWallet() {
        this.setState(prevState => ({ ...prevState, isRequestingWallet: true }));
        try {
            const responseWallet = await fetch("http://localhost:3001/users/" + this.state.user.id + "/wallet");
            const dataWallet = await responseWallet.json();

            this.setState(prevState => ({ ...prevState, wallet: dataWallet, hasErrorOnFetchingWallet: false }));

            //console.log(this.state.wallet);
        } catch (e) {
            this.setState(prevState => ({ ...prevState, hasErrorOnFetchingWallet: true }));
        } finally {
            this.setState(prevState => ({ ...prevState, isRequestingWallet: false }));
        }
    }

    render() {
        return (
            <>
                <Navbar currencyInfo={this.state.currenciesValue} />

                {!this.state.isLogin ? (
                    <div className={"container my-5"}>
                        <LogIn updateUser={data => this.changeDataUser(data)} />
                    </div>
                ) : (
                    <div className={"container my-5"}>
                        <div className={"row"}>
                            <div className={"col-6"}>
                                <CurrencyValue info={{ currenciesValue: this.state.currenciesValue, isRequesting: this.state.isRequestingCurrencyInfo }} />
                            </div>
                            <div className={"col-6"}>
                                <UserMoney
                                    userInfo={{
                                        user: this.state.user,
                                        wallet: this.state.wallet,
                                        isRequestingWallet: this.state.isRequestingWallet,
                                        isRequestingUser: this.state.isRequestingUser
                                    }}
                                />
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-12 my-5"}>
                                <ExchangeMoney
                                    update={data => this.changeData(data)}
                                    walletCoinInfo={{
                                        hasErrorOnFetchingWallet: this.state.hasErrorOnFetchingWallet,
                                        wallet: this.state.wallet,
                                        isWaitingW: this.state.isRequestingWallet,
                                        currenciesValue: this.state.currenciesValue,
                                        isRequestingC: this.state.isRequestingCurrencyInfo
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default App;
