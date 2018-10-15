import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { API } from '../supports/api-url/API.js'

class History extends Component {
    state = {
        movies: [],
        seatList: []
    }

    componentWillMount() {
        const { selectedMovie } = this.props.selectedMovie
        axios.get(API + '/movies/' + selectedMovie )
        .then((response) => {
            this.setState({ movies: response.data });        
        }).catch((err) => {
            console.log(err);
        })       
    }

    renderHistory = () => {
        return (
            <div className="container-fluid">
            under construction
            </div>
        )
    }

    render() {
        if (this.props.authGlobal.cookieCheck === true){
            if (this.props.authGlobal.username == ""){
                return <Redirect to='/login' />
            }
            return (
                <div className="container-fluid">
                    {this.renderHistory()}
                </div>
            )
        }
        return(
            <div>LOADING</div>
        )    
    }
}

const mapStateToProps = (state) => {
    return { authGlobal: state.auth, selectedMovie: state.movie };
  }
export default connect(mapStateToProps)(History);