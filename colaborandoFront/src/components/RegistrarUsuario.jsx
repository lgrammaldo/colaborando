import { Component } from "react";
import LoginService from '../services/LoginService';
import logo from '../imagenes/logologin.png';
import NavBar from '../principal/NavBar';

export default class RegistrarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            successful: false,
            email: "",
            message: ""
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.validateForm = this.validateForm.bind(this);
    };


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    validateForm() {
        return this.state.username.trim() !== '' && this.state.password.trim() !== '' && this.state.email.trim() !== '';
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        if (this.validateForm()) {
            LoginService.register(this.state.username, this.state.email, this.state.password).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });

                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.repsonse.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: true,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">

                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <p>Registrar nuevo usuario</p>
                                    <img src={logo} alt="Logo" className="mb-4" />

                                    <form onSubmit={this.handleRegister}
                                        ref={c => {
                                            this.form = c;
                                        }}
                                    >
                                        {!this.state.successful && (
                                            <div>
                                                <div className="form-group">
                                                    <label htmlFor="username">Username</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="username"
                                                        value={this.state.username}
                                                        onChange={this.onChangeUsername}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.onChangeEmail}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        value={this.state.password}
                                                        onChange={this.onChangePassword}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block">Registrarse</button>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                    {this.state.message && (
                                        <div className="form-group mt-3">
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.successful}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}