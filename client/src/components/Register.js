import React from 'react';
import withNavigate from './withNavigate';
import '../css/register.css';
import authService from '../services/authService';
import joi from 'joi-browser';

class Register extends React.Component {
    state = {
        credentials: {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        },
        errors: []
    }

    valdidationSchema = {
        first_name: joi.string().required().label('First Name'),
        last_name: joi.string().required().label('Last Name'),
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
            authService.register(this.state.credentials, (err, success) => {
                if (!success) {
                    const errors = [];
                    const error = {};
                    console.log(err);
                    switch (err.status) {
                        case 400:
                            err.data.includes('Expected email to be unique') ?
                                error.message = 'Email is already associated with an account' :
                                error.message = 'Server Error - Usually due to an invalid email or password'
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

    getFirstNameErrors = () => {
        return this.state.errors.filter(error => error.field === 'first_name');
    }

    getLastNameErrors = () => {
        return this.state.errors.filter(error => error.field === 'last_name');
    }

    getEmailErrors = () => {
        return this.state.errors.filter(error => error.field === 'email');
    }

    getPasswordErrors = () => {
        return this.state.errors.filter(error => error.field === 'password');
    }

    getServerErrors = () => {
        return this.state.errors
                    .filter(error => 
                            error.field !== 'first_name' 
                            && error.field !== 'last_name'
                            && error.field !== 'email' 
                            && error.field !== 'password' 
                    );
    }

    render() {
        return ( 
            <form className="form-register" onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Please register</h1>
                <label htmlFor="inputFName" className="sr-only">First Name</label>
                <input 
                    type="text" 
                    id="first_name" 
                    name="first_name"
                    onChange={this.handleChange}
                    className="form-control top" 
                    placeholder="First name" 
                    autoFocus
                />
                {
                    this.getFirstNameErrors().length > 0 && 
                    <small>
                        <ul className="mt-2">
                            {
                                this.getFirstNameErrors()
                                    .map((error, index) => <li key={index} className="text-danger">{ error.message }</li>)
                            }
                        </ul>
                    </small>
                }
                <label htmlFor="inputLName" className="sr-only">Last Name</label>
                <input 
                    type="text" 
                    id="last_name" 
                    name="last_name"
                    onChange={this.handleChange}
                    className="form-control middle" 
                    placeholder="Last name" 
                />
                {
                    this.getLastNameErrors().length > 0 && 
                    <small>
                        <ul className="mt-2">
                            {
                                this.getLastNameErrors()
                                    .map((error, index) => <li key={index} className="text-danger">{ error.message }</li>)
                            }
                        </ul>
                    </small>
                }
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input 
                    type="text" 
                    id="email" 
                    name="email"
                    onChange={this.handleChange}
                    className="form-control middle" 
                    placeholder="Email address"  
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
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    onChange={this.handleChange}
                    className="form-control bottom" 
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
                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
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
         );
    }
}
 
export default withNavigate(Register);