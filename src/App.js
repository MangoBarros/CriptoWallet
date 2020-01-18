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

        isLogin: false,

        isRequestingWallet: true,
        isRequestingCurrencyInfo: true,
        isRequestingUser: true
    };

    /**
     * componentDidMount.
     */

    async componentDidMount() {
        await this.getCoinInfo();
        await this.getWallet();
        //await this.getUsers();
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

    changeData(data) {
        this.setState(ps => ({ ...ps, wallet: data }));
    }

    changeDataUser(data) {
        this.setState(ps => ({ ...ps, user: data, isLogin: true, isRequestingUser: false }));
    }

    /*  async getUsers() {
        try {
            const responseUser = await fetch("http://localhost:3001/users");
            const dataUser = await responseUser.json();

            this.setState(prevState => ({ ...prevState, dataUsers: dataUser }));

            //console.log(this.state.wallet);
        } catch (e) {
            console.log("Deu Cana");
        } finally {
            this.setState(prevState => ({ ...prevState, isRequestingUser: false }));
        }
    } */

    async getWallet() {
        try {
            const responseWallet = await fetch("http://localhost:3001/wallet/e6318b01-1a71-48e6-a02d-ebadecfc4849");
            const dataWallet = await responseWallet.json();

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

//-/users/login
