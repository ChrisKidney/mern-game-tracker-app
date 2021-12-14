import React from 'react';
import withNavigate from './withNavigate';
import '../css/signin.css';
import authService from '../services/authService';
import joi from 'joi-browser';

class SignIn extends React.Component {
    state = {
        credentials:{
            email: '',
            password: ''
        },
        errors: []
    }
    
    valdidationSchema = {
        email: joi.string().email().required().label('Email Address'),
        password: joi.string().required().label('Password')
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const result = joi.validate(this.state.credentials, 
                                    this.valdidationSchema,
                                    { abortEarly: false });

        const errors = [];

        if (result.error) {
            result.error.details.forEach(detail => {
                const validationError = {};

                validationError.message = detail.message;
                validationError.field = detail.path[0];
                errors.push(validationError);
            });
        }

        this.setState({ errors: errors });

        if (errors.length === 0) {
            authService.login(this.state.credentials, (err, success) => {
                if (!success) {
                    const errors = [];
                    const error = {};
                    switch (err.status) {
                        case 404:
                            error.message = "The email you entered did not match an account"
                            break;
                        case 403:
                            error.message = "The password you entered was incorrect"
                            break;
                        case 400:
                            error.message = "Server Error - Usually due to an invalid email or password"
                            break;
                        default:
                            break;
                    }

                    errors.push(error);
                    this.setState({ errors });
                    return;
                }
                this.props.handleSignIn();
                this.props.navigate('/');
            });
        }
    }

    handleChange = (e) => {
        const credentials = { ...this.state.credentials }
        credentials[e.target.name] = e.target.value;
        this.setState({ credentials });
    }

    getEmailErrors = () => {
        return this.state.errors.filter(error => error.field === 'email');
    }

    getPasswordErrors = () => {
        return this.state.errors.filter(error => error.field === 'password');
    }

    getServerErrors = () => {
        return this.state.errors.filter(error => error.field !== 'email' && error.field !== 'password');
    }

    render() {
        return ( 
            <>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        onChange={this.handleChange}
                        className="form-control top" 
                        placeholder="Email address" 
                        autoFocus 
                    />
                    {
                        this.getEmailErrors().length > 0 && 
                        <small>
                            <ul className="mt-2">
                                {
                                    this.getEmailErrors()
                                        .map((error, index) => <li key={index} className="text-danger">{ error.message }</li>)
                                }
                            </ul>
                        </small>
                    }
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        onChange={this.handleChange} 
                        className="form-control" 
                        placeholder="Password" 
                    />
                    {
                        this.getPasswordErrors().length > 0 && 
                        <small>
                            <ul className="mt-2">
                                {
                                    this.getPasswordErrors()
                                        .map((error, index) => <li key={index} className="text-danger">{ error.message }</li>)
                                }
                            </ul>
                        </small>
                    }
                    <button className="btn btn-lg btn-primary w-100" type="submit">Sign in</button>
                    {
                        this.getServerErrors().length > 0 && 
                        <small>
                            <ul className="mt-2">
                                {
                                    this.getServerErrors()
                                        .map((error, index) => <li key={index} className="text-danger">{ error.message }</li>)
                                }
                            </ul>
                        </small>
                    }
                </form>
            </>
         );
    }
}
 
export default withNavigate(SignIn);