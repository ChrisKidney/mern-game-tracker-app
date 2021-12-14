import React from 'react';
import moment from 'moment';
import { NavLink } from "react-router-dom";
import dataService from '../services/dataService';

 const Card = (props) => {
        const deleteHandler = () => {
            dataService.deleteGame(props.game._id, (error, success) => {
                if (!success) return console.log(error);
                props.handleAppState();
            });
        }
        return (
            <div className="col-md-4 mb-4 d-flex flex-column justify-content-between">
                <div className="card box-shadow h-100">
                    <img 
                        className="card-img-top" 
                        data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                        alt="Thumbnail [100%x225]" 
                        src={props.game.steam_image}
                        data-holder-rendered="true" />
                    <div className="card-header">
                        <strong>{props.game.title}</strong>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Developer: {props.game.developer}</p>
                        <p className="card-text">Release Date: {moment(props.game.release_date).format('DD/MM/YYYY')}</p>
                        <hr />
                        <p className="card-text card_description">{props.game.description}</p>
                        <hr />
                        <ul className="list-group mb-2">
                            <li className={props.game.owned ? 'list-group-item list-group-item-success' : 'list-group-item list-group-item-danger'}>
                                {props.game.owned ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                    </svg> 
                                    : 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path  d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                        <path  d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                    </svg>}
                                    {props.game.owned ? ' Owned'  : ' Not Owned'} 
                            </li>
                        </ul>
                        <ul className="list-group mb-5">
                            <li className="list-group-item list-group-item-info text-center">Completion Status</li>
                            {Object.keys(props.game.completion_status).map((key) => {
                                return props.game.completion_status[key] ? <li key={key} className='list-group-item'>{key.charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}</li> : null;
                            })}
                        </ul>
                    </div>  
                    <div className="d-flex justify-content-between align-items-center card-footer mt-5">
                        <div className="btn-group">
                            {/* <button type="button" className="btn btn-sm btn-outline-secondary">View</button> */}
                            {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                            <NavLink to={`/edit/${props.game._id}`} className="btn btn-sm btn-outline-secondary" id={props.game.id}>
                            Edit</NavLink>

                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={deleteHandler}>Delete</button>
                        </div>
                        <small className="text-muted">9 mins</small>
                    </div>
                </div>
            </div>
        )
}

export default Card;