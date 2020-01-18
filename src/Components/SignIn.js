import React from "react";
export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "", isRequesting: true };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async handleSubmit(event) {
        await this.makeRequest();
    }
    async makeRequestLog() {
        try {
            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: this.state.valueName,
                    email: this.state.valueEmail
                })
            });

            const res = await response.json();

            this.props.updateUser(res);
        } catch (e) {
            console.log("por alguma razao isto nao ta a dar");
        } finally {
            this.setState(prevState => ({ ...prevState, isRequesting: false }));
        }
    }

    render() {
        return (
            <div className='row'>
                <div className='col-6'>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='exampleInputEmail1'>Email address</label>
                        <input type='email' className='form-control' value={this.state.value} onChange={this.handleChange} />
                        <small id='emailHelp' className='form-text text-muted'>
                            We'll never share your email with anyone else.
                        </small>

                        <input type='submit' className='btn btn-primary' value='Submit' />
                    </form>
                </div>
            </div>
        );
    }
}