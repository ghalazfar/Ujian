import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { API } from '../supports/api-url/API.js'
import { onMovieSelect } from '../actions';

class Schedule extends Component {
    state = {
        movies: [],
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

    renderSeat = () => {
        const { shift } = this.state.movies        
        const { kursi } = shift[0]
        console.log(kursi)
        return kursi.map((seat) =>            
            this.checkIfBooked(seat)
        )
    }

    checkIfBooked = (seat) => {
        if(seat.booked == false) {
            return (
                <div class="checkbox">
                    <label><input ref={seat.id} type="checkbox" value="free" onClick={() => this.onCheckBoxClick(kursi.id)} />{kursi.id}</label>
                </div>
            )
        }
    }

    renderSchedule = () => {
        return (
            <div className="container-fluid">
            <div className="row">
                <div className="col-xs-3">                
                    <img style={{ margin: "auto"}} className="img-responsive" src={this.state.movies.img} alt="" />               
                </div>
                <div className="col-xs-9" align="left">                
                    <h1>{this.state.movies.title}</h1> 
                    <h4>{this.state.movies.desc}</h4>           
                </div>
            </div>
            <div className="row">
                <Button className="col-xs-2" onClick={this.renderSeat}>Shift 1</Button>
                <Button className="col-xs-2" onClick={this.renderSeat}>Shift 2</Button>
                <Button className="col-xs-2" onClick={this.renderSeat}>Shift 3</Button>
            </div>
            </div>
        )
    }

    render(){        
        console.log(this.state)
        return (
            <div className="container-fluid">
                {this.renderSchedule()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { selectedMovie: state.movie };
  }
export default connect(mapStateToProps)(Schedule);