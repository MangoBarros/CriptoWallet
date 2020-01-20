import React from "react";
export default class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "", isRequesting: true, hasErrorOnLog: "" };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        await this.makeRequestLog();
    }
    async makeRequestLog() {
        try {
            const response = await fetch("http://localhost:3001/users/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: this.state.value
                })
            });

            const res = await response.json();

            this.props.updateUser(res);
        } catch (e) {
            console.log(e);
            this.setState(prevState => ({ ...prevState, hasErrorOnLog: "Esse utilizador não existe" }));
        } finally {
            this.setState(prevState => ({ ...prevState, isRequesting: false }));
        }
    }

    render() {
        return (
            <div className='row'>
                <div className='col-6'>
                    <form
                        onSubmit={e => {
                            this.handleSubmit(e);
                        }}>
                        <label htmlFor='exampleInputEmail1'>Email address</label>
                        <input type='email' className='form-control' value={this.state.value} onChange={this.handleChange} />
                        <small id='emailHelp' className='form-text text-danger my-1'>
                            {this.state.hasErrorOnLog}
                        </small>

                        <input type='submit' className='btn btn-primary' value='Submit' />
                    </form>
                </div>
            </div>
        );
    }
}
