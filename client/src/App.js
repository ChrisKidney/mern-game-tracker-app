import React from 'react';
import Axios from 'axios';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import Register from './components/Register';
import CreateForm from './components/CreateForm';
import ProtectedRoute from './components/ProtectedRoute';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import authService from './services/authService';

import './css/app.css';
import EditForm from './components/EditForm';

class App extends React.Component {
  state = {
    games: [],
    filteredGames: [],
    isAuthenticated: false,
    currentUser: ''
  };
  
  componentDidMount() {
    this.getGames();
  }

  getGames = () => {
      Axios.get(`${process.env.REACT_APP_API_ROOT_URL}/games`)
      .then(response => this.setState({ games: response.data }))
      .then(()=>{
          let sorted = this.state.games.sort((x,y) => {
          if (x.title.toUpperCase() < y.title.toUpperCase()) return -1;
          if (x.title.toUpperCase() > y.title.toUpperCase()) return 1;
          return 0;
          });
          this.setState({ games: sorted });
          this.setState({ filteredGames: sorted });
      });
  }

  handleSignIn = () => {
    this.setState({isAuthenticated: authService.isAuthenticated()});
    this.setState({currentUser: authService.getUser()});
  }

  handleSearch = (e) => {
    const search = e.target.value.toLowerCase();

    if (search) {
      this.setState({
        filteredGames: this.state.games.filter(
          game => 
          (game.title.toLowerCase().includes(search))
        )
        .sort((x,y) => {
            if (x.title.toUpperCase() < y.title.toUpperCase()) return -1;
            if (x.title.toUpperCase() > y.title.toUpperCase()) return 1;
            return 0;
            })});
    }
    else {
      this.setState({ filteredGames: this.state.games });
    }
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' element= {
            <>
              <NavBar 
                isAuthenticated={authService.isAuthenticated()} 
                currentUser={authService.getUser()} 
                logout={authService.logout} 
                handleSignIn={this.handleSignIn}
              />
              <div id="main-content">
                <Main games={this.state.filteredGames} handleAppState={this.getGames} handleSearch={this.handleSearch}/>
              </div>
              <Footer />
            </>
          }/>
          <Route path='/signin' element= {
            <>
              <NavBar 
                isAuthenticated={authService.isAuthenticated()} 
                currentUser={authService.getUser()} 
                logout={authService.logout} 
                handleSignIn={this.handleSignIn}
              />              
              <div id="main-content">
                <SignIn handleSignIn={this.handleSignIn}/>
              </div>
              <Footer />
            </>
          }/>
          <Route path='/register' element= {
            <>
              <NavBar 
                isAuthenticated={authService.isAuthenticated()} 
                currentUser={authService.getUser()} 
                logout={authService.logout} 
                handleSignIn={this.handleSignIn}
              />              
              <div id="main-content">
                <Register handleSignIn={this.handleSignIn}/>
              </div>
              <Footer />
            </>
          }/>
          <Route path='/create' element= {
            <>
              <NavBar 
                isAuthenticated={authService.isAuthenticated()} 
                currentUser={authService.getUser()} 
                logout={authService.logout} 
                handleSignIn={this.handleSignIn}
              />              
              <div id="main-content">
                <ProtectedRoute>
                    <CreateForm handleAppState={this.getGames}/>
                </ProtectedRoute>
              </div>
              <Footer />
            </>
          }/>
          <Route path='/edit/:id' element= {
            <>
              <NavBar 
                isAuthenticated={authService.isAuthenticated()} 
                currentUser={authService.getUser()} 
                logout={authService.logout} 
                handleSignIn={this.handleSignIn}
              />              
              <div id="main-content">
                <ProtectedRoute>
                    <EditForm handleAppState={this.getGames}/>
                </ProtectedRoute>
              </div>
              <Footer />
            </>
          }/>
        </Routes>
      </Router>
    );
  }
}

export default App;
