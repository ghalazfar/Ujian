import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap'
import { API } from '../supports/api-url/API.js'
import { onMovieSelect } from '../actions';

class HomePage extends Component {
    state = {
        movies: [],
    }

    componentWillMount() {
        const { selectedMovie } = this.props.selectedMovie
        axios.get(API + '/movies')
            .then(response => {
            this.setState({ movies: response.data })
        })        
    }

    renderMovieList = () => {
        return this.state.movies.map((movie) =>
            <Carousel.Item >                
                <Link to="/schedule">
                <img onClick={() => this.props.onMovieSelect(movie.id)} style={{ width: "900px", height: "500px" }} src={movie.img} alt="" />
                <Carousel.Caption>
                    <h3>{movie.title}</h3>
                </Carousel.Caption>
                </Link>                
            </Carousel.Item>
        )
    }

    render(){
        const { selectedMovie } = this.props.selectedMovie
        if (selectedMovie == 0) {
            return (
                <div className="container-fluid">
                    <Carousel interval="3500" className="col-xs-8 col-xs-push-2" >
                    {this.renderMovieList()}
                    </Carousel>
                </div>
            )
        }
        return <Redirect to={`/schedule?id=${selectedMovie}`}/>
    }
}

const mapStateToProps = (state) => {
    return { selectedMovie: state.movie };
}

export default connect(mapStateToProps, { onMovieSelect })(HomePage);