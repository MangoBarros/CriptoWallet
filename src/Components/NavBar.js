import React from "react";

export default class NavBar extends React.Component {
    componentDidUpdate(np, ns) {
        //console.log(np, ns);
    }
    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <a className='navbar-brand' href='#'>
                    CriptoWallet
                </a>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
            </nav>
        );
    }
}
