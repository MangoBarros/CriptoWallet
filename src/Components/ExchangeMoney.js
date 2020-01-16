import React from "react";

export default class ExchangeMoney extends React.Component {
    state = {
        selectedCoin: null,
        convertBit: null,
        convertEth: null
    };

    constructor(props) {
        super(props);

        this.changeBit = this.changeBit.bind(this);
        this.changeEth = this.changeEth.bind(this);
        this.convertMoney = this.convertMoney.bind(this);
    }

    changeBit({ target: { value } }) {
        this.setState(ps => ({ ...ps, selectedCoin: value }));
    }
    changeEth({ target: { value } }) {
        this.setState(ps => ({ ...ps, selectedCoin: value }));
    }
    convertMoney({ target: { value } }) {
        if (this.state.selectedCoin === "BTC") {
            let resultado = value / this.props.walletCoinInfo.currenciesValue.bitcoin.eur;
            this.setState(ps => ({ ...ps, convertBit: resultado }));
            this.setState(ps => ({ ...ps, convertEth: null }));
        } else if (this.state.selectedCoin === "ETH") {
            let resultado = value / this.props.walletCoinInfo.currenciesValue.ethereum.eur;
            this.setState(ps => ({ ...ps, convertEth: resultado }));
            this.setState(ps => ({ ...ps, convertBit: null }));
        } else {
            this.setState(ps => ({ ...ps, convertBit: null, convertEth: null }));
        }
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
                                    <input type='number' className='form-control' id='inputMoney' onChange={this.convertMoney} />
                                    <small id='emailHelp' className='form-text text-muted'>
                                        Insert how much money you want to convert
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4' id='resultMoney'>
                            <h3>{this.state.convertBit ? this.state.convertBit : this.state.convertEth}</h3>
                        </div>
                    </div>
                </>
            );
        }
    }
}
