import React from 'react';
import withNavigate from './withNavigate';
import moment from 'moment';
import '../css/create.css';
import joi from 'joi-browser';
import dataService from '../services/dataService';

class CreateForm extends React.Component {
    state = {
        data: {
            title: '',
            developer: '',
            release_date: '',
            description: '',
            owned: false,
            completion_status: {
                beaten: false,
                completed_achievements: false,
                endless: false,
                on_hold: false,
                dropped: false
            },
            steam_app_id: '',
            steam_image: 'https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png',
            steam_reviews: {
    
            }
        },
        errors: []
    }

    valdidationSchema = {
        title: joi.string().required().label('Title'),
        developer: joi.string().required().label('Developer'),
        release_date: joi.string().required().label('Release Date'),
        description: joi.string().required().label('Description'),
        steam_app_id: joi.number().label('Steam App ID'),
        steam_image: joi.required().label('Steam App Image'),
        owned: joi.required().label('Owned'),
        completion_status: joi.required().label('Completion Status'),
        steam_reviews: joi.required().label('Steam Reviews'),
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const result = joi.validate(this.state.data, 
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
            dataService.createGame(this.state.data, (err, success) => {
                if (!success) {
                    const errors = [];
                    const error = {};
                    console.log(err);
                    switch (err.status) {
                        case 400: 
                            error.message = 'Server Error - usually due to bad data in the form'
                            break;
                        default:
                            break;
                    }

                    errors.push(error);
                    this.setState({ errors });
                    return;
                }
                this.props.handleAppState();
                this.props.navigate('/');
            })
        }
    }

    handleChange = (e) => {
        const data = { ...this.state.data }
        
        switch(e.target.name) {
            case 'steam_app_id':
                let url = `https://cdn.akamai.steamstatic.com/steam/apps/${e.target.value}/header.jpg`;
                data.steam_image =url;
                data[e.target.name] = e.target.value;
                this.setState({ data });
                break;
            case 'owned':
                data[e.target.name] = e.target.checked;
                this.setState({ data });
                break;
            case 'release_date':
                let date = moment(e.target.value).toISOString();
                data[e.target.name] = date;
                this.setState({ data });
                break;
            case 'beaten':
            case 'completed_achievements': 
            case 'endless': 
            case 'on_hold': 
            case 'dropped':
                data.completion_status = {...this.state.data.completion_status, [e.target.name]: e.target.checked};
                this.setState({ data });
                break;
            default:
                data[e.target.name] = e.target.value;
                this.setState({ data });
                break;
        }
    }

    getTitleErrors = () => {
        return this.state.errors.filter(error => error.field === 'title');
    }

    getSteamAppIdErrors = () => {
        return this.state.errors.filter(error => error.field === 'steam_app_id');
    }

    getDeveloperErrors = () => {
        return this.state.errors.filter(error => error.field === 'developer');
    }

    getDescriptionErrors = () => {
        return this.state.errors.filter(error => error.field === 'description');
    }

    getReleaseDateErrors = () => {
        return this.state.errors.filter(error => error.field === 'release_date');
    }

    render() {
        return ( 
            <form className="form-create" onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Add a New Game</h1>
                <div className="row d-flex justify-content-center mb-3">
                    <img src={this.state.data.steam_image} className="img-thumbnail steam-image" alt="..."/>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <label htmlFor="title" className="sr-only">Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title"
                            onChange={this.handleChange}
                            className="form-control mb-1" 
                            placeholder="Title" 
                            autoFocus
                        />
                        {
                            this.getTitleErrors().length > 0 && 
                            <small>
                                <ul className="mt-2">
                                    {
                                        this.getTitleErrors()
                                            .map((error, index) => <li key={index} className="text-danger">{ error.message }</li>)
                                    }
                                </ul>
                            </small>
                        }
                        <label htmlFor="steam_app_id" className="sr-only">SteamAppID</label>
                        <input 
                            type="text" 
                            id="steam_app_id" 
                            name="steam_app_id"
                            onChange={this.handleChange}
                            className="form-control mb-1" 
                            placeholder="Steam App ID" 
                            autoFocus
                            title="This can be found in the URL for any steam game: https://store.steampowered.com/app/<ID IS HERE>/gamename"
                        />
                        {
                            this.getSteamAppIdErrors().length > 0 && 
                            <small>
                                <ul className="mt-2">
                                    {
                                        this.getSteamAppIdErrors()
                                            .map((error, index) => <li key={index} className="text-danger">{ error.message }</li>)
                                    }
                                </ul>
                            </small>
                        }
                        <label htmlFor="developer" className="sr-only">Developer</label>
                        <input 
                            type="text" 
                            id="developer" 
                            name="developer"
                            onChange={this.handleChange}
                            className="form-control mb-1" 
                            placeholder="Developer" 
                            autoFocus
                        />
                        {
                            this.getDeveloperErrors().length > 0 && 
                            <small>
                                <ul className="mt-2">
                                    {
                                        this.getDeveloperErrors()
                                            .map((error, index) => <li key={index} className="text-danger">{ error.message }</li>)
                                    }
                                </ul>
                            </small>
                        }
                        <label htmlFor="description" className="sr-only">Description</label>
                        <textarea 
                            id="description" 
                            name="description"
                            rows="5"
                            onChange={this.handleChange}
                            className="form-control" 
                            placeholder="Description" 
                            autoFocus
                        />
                        {
                            this.getDescriptionErrors().length > 0 && 
                            <small>
                                <ul className="mt-2">
                                    {
                                        this.getDescriptionErrors()
                                            .map((error, index) => <li key={index} className="text-danger">{ error.message }</li>)
                                    }
                                </ul>
                            </small>
                        }
                    </div>
                    <div className="col-6">
                        <label htmlFor="release_date">Release Date</label>
                        <input 
                            type="date" 
                            id="release_date" 
                            name="release_date"
                            onChange={this.handleChange}
                            className="form-control" 
                            placeholder="Release_Date" 
                            autoFocus
                        />
                        {
                            this.getReleaseDateErrors().length > 0 && 
                            <small>
                                <ul className="mt-2">
                                    {
                                        this.getReleaseDateErrors()
                                            .map((error, index) => <li key={index} className="text-danger">{ error.message }</li>)
                                    }
                                </ul>
                            </small>
                        }
                        <div className="form-check form-switch mt-1">
                            <input 
                                type="checkbox" 
                                id="owned"
                                name="owned"
                                className="form-check-input"
                                onChange={this.handleChange}
                            />
                            <label className="form-check-label mt-1 ms-1" htmlFor="owned">Owned?</label>
                        </div>
                        <label className="form-label mt-2">Completion Status</label>
                        <div className="form-check">
                            <input 
                                type="checkbox" 
                                id="beaten" 
                                name="beaten" 
                                className="form-check-input" 
                                onChange={this.handleChange}
                            />
                            <label className="form-check-label" htmlFor="beaten">
                                Beaten
                            </label>
                        </div>

                        <div className="form-check">
                            <input 
                                type="checkbox" 
                                id="completed_achievements" 
                                name="completed_achievements" 
                                className="form-check-input" 
                                onChange={this.handleChange}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Completed Achievements
                            </label>
                        </div>

                        <div className="form-check">
                            <input 
                                type="checkbox"  
                                id="endless" 
                                name="endless" 
                                className="form-check-input" 
                                onChange={this.handleChange}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Endless
                            </label>
                        </div>

                        <div className="form-check">
                            <input 
                                type="checkbox"  
                                id="on_hold" 
                                name="on_hold" 
                                className="form-check-input" 
                                onChange={this.handleChange}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                On Hold
                            </label>
                        </div>

                        <div className="form-check">
                            <input 
                                type="checkbox"  
                                id="dropped" 
                                name="dropped" 
                                className="form-check-input" 
                                onChange={this.handleChange}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Dropped
                            </label>
                        </div>
                    </div>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Add</button>
            </form>
         );
    }
}
 
export default withNavigate(CreateForm);