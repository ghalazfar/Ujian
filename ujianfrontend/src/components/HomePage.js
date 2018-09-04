import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { API } from '../supports/api-url/API.js'
import { onMovieSelect } from '../actions';

class HomePage extends Component {
    state = {
        movies: [],
    }

    componentWillMount() {
        axios.get(API + '/movies')
            .then(response => {
            this.setState({ movies: response.data })
        })        
    }

    renderMovieList = () => {
        return this.state.movies.map((movie) =>
            <div className="col-xs-3">                
                <Link to="/Schedule"><img onClick={() => this.props.onMovieSelect(movie.id)} style={{ margin: "auto"}} className="img-responsive" src={movie.img} alt="" /></Link>
                {movie.title}
            </div>
        )
    }

    render(){
        return (
            <div className="container-fluid">
                {this.renderMovieList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { selectedMovie: state.movie };
}

export default connect(mapStateToProps, { onMovieSelect })(HomePage);