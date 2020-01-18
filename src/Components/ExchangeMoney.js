import React from "react";

export default class ExchangeMoney extends React.Component {
    state = {
        selectedCoin: null,
        convertBit: null,
        convertEth: null,
        valueToConvert: 0
    };

    constructor(props) {
        super(props);

        this.changeBit = this.changeBit.bind(this);
        this.changeEth = this.changeEth.bind(this);
        this.convertMoney = this.convertMoney.bind(this);
        this.update = this.update.bind(this);
    }
    async update({ target: { value } }) {
        if (this.state.valueToConvert > 0) {
            const response = await fetch("http://localhost:3001/wallet/e6318b01-1a71-48e6-a02d-ebadecfc4849", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "PATCH",
                body: JSON.stringify({
                    eur: this.props.walletCoinInfo.wallet.eur - this.state.valueToConvert,
                    btc: this.props.walletCoinInfo.wallet.btc + this.state.convertBit,
                    eth: this.props.walletCoinInfo.wallet.eth + this.state.convertEth
                })
            });
            const data = await response.json();
            this.props.update(data);
        }
    }

    changeBit({ target: { value } }) {
        let resultado = this.state.valueToConvert / this.props.walletCoinInfo.currenciesValue.bitcoin.eur;
        this.setState(ps => ({ ...ps, selectedCoin: value, convertBit: resultado, convertEth: null }));
    }
    changeEth({ target: { value } }) {
        let resultado = this.state.valueToConvert / this.props.walletCoinInfo.currenciesValue.ethereum.eur;
        this.setState(ps => ({ ...ps, selectedCoin: value, convertEth: resultado, convertBit: null }));
    }
    convertMoney({ target: { value } }) {
        let resultado =
            value / (this.state.selectedCoin === "BTC" ? this.props.walletCoinInfo.currenciesValue.bitcoin.eur : this.props.walletCoinInfo.currenciesValue.ethereum.eur);
        this.setState(ps => ({
            ...ps,
            valueToConvert: value,
            convertBit: ps.selectedCoin === "BTC" ? resultado : ps.convertBit,
            convertEth: ps.selectedCoin === "ETH" ? resultado : ps.convertEth
        }));
    }
    render() {
        if (this.props.walletCoinInfo.isWaitingW || this.props.walletCoinInfo.isRequestingC) {
            return <div>Nada para já</div>;
        } else {
            return (
                <>
                    <h2>Buy Cripto Coins</h2>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='form-check form-check-inline'>
                                <input
                                    className='form-check-input'
                                    type='radio'
                                    id='inlineCheckbox1'
                                    value='BTC'
                                    name='coin'
                                    checked={this.state.selectedCoin === "BTC"}
                                    onChange={this.changeBit}
                                />
                                <label className='form-check-label' htmlFor='inlineCheckbox1'>
                                    Bitcoin
                                </label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input
                                    className='form-check-input'
                                    type='radio'
                                    id='inlineCheckbox2'
                                    value='ETH'
                                    name='coin'
                                    checked={this.state.selectedCoin === "ETH"}
                                    onChange={this.changeEth}
                                />
                                <label className='form-check-label' htmlFor='inlineCheckbox2'>
                                    Ethereum
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-4'>
                            <form>
                                <div className='form-group'>
                                    <input type='number' className='form-control' id='inputMoney' min='0' onChange={this.convertMoney} />
                                    <small id='emailHelp' className='form-text text-muted'>
                                        Insert how much money you want to convert
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4' id='resultMoney'>
                            <h3>{this.state.selectedCoin === "BTC" ? this.state.convertBit : this.state.convertEth}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4' id='submitBuy'>
                            <button type='button' className='btn btn-dark' disabled={this.props.walletCoinInfo.wallet.eur < this.state.valueToConvert} onClick={this.update}>
                                Make the trade
                            </button>
                        </div>
                    </div>
                </>
            );
        }
    }
}
