import React from 'react';
import '../css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';
import { NavLink } from "react-router-dom";

const Main = (props) => {
    return ( 
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search by game title" onKeyUp={props.handleSearch} onKeyDown={props.handleSearch} onChange={props.handleSearch} />
            </div>
          </div>
        </section>
        <div className="album py-4 bg-light">
          <div className="container">
            <div className="d-flex justify-content-center">
              <NavLink to="/create" className="btn btn-dark w-50 mb-4">Add Game</NavLink>
            </div>
            <div className="row">
              {props.games.map ((game) => {
                 return <Card key={game.title} game={props.games.length > 0 && game} handleAppState={props.handleAppState}/>
              })}
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default Main;