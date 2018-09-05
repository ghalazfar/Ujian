import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { API } from '../supports/api-url/API.js'

class Schedule extends Component {
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

    setSeat = (shiftNum) => {
        const { shift } = this.state.movies
        const { kursi } = shift[shiftNum]
        const seatList = []
        for (var i in kursi){
            seatList.push(kursi[i])
        }
        this.setState({ seatList: seatList})
    }

    renderSeat = () => {
        const seatbox = this.state.seatList.map((seatIndex) =>
            this.checkIfBooked(seatIndex)
        )
        return (
            <div>
                {seatbox}
                <input type="button" className="btn btn-warning" value="Check Out" onClick={() => this.onCheckoutClick()} />
            </div>
            
        )
    }

    onCheckoutClick = () => {
        const bookSeatList = this.state.seatList
        for (var i in bookSeatList){
            if (bookSeatList[i].booked == "selected"){        
                bookSeatList[i].booked = "booked"
            }
        }
        this.setState({ seatList: bookSeatList })
        const { selectedMovie } = this.props.selectedMovie
        const { movies } = this.state
        const { id, title, desc, img, shift } = movies
        axios.put(API + '/movies/' + selectedMovie, {
            id: id,
            title: title,
            desc: desc,
            img: img,
            shift: shift
        }).then((response) => {
            this.setState({ });  
            alert("Check Out Berhasil!")
            console.log(response);      
        }).catch((err) => {
            alert("Check Out Gagal!")
            console.log(err);
        })         
    }

    checkIfBooked = (seatIndex) => {
        if(seatIndex.booked == "empty") {        
            return (
                <div className="col-xs-4">
                    <input type="button" className="btn btn-primary" value={seatIndex.nama} onClick={() => this.selectBox((seatIndex.id)-1)} />
                </div>
            )
        }
        else if(seatIndex.booked == "selected") { 
            return (
                <div class="col-xs-4">
                    <input type="button" className="btn btn-success active" value={seatIndex.nama} onClick={() => this.unselectBox((seatIndex.id)-1)}/>
                </div>
            )
        }    
        return (
            <div className="col-xs-4">
                <input type="button" className="btn btn-danger" value={seatIndex.nama} disabled />
            </div>
        )            
    }

    selectBox = (seatIndex) => {      
        const bookSeatList = this.state.seatList        
        bookSeatList[seatIndex].booked = "selected"
        this.setState({ seatList: bookSeatList })               
    }

    unselectBox = (seatIndex) => {      
        const bookSeatList = this.state.seatList        
        bookSeatList[seatIndex].booked = "empty"
        this.setState({ seatList: bookSeatList })               
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
                <Button className="col-xs-2" onClick={() => this.setSeat(0)}>Shift 1</Button>
                <Button className="col-xs-2" onClick={() => this.setSeat(1)}>Shift 2</Button>
                <Button className="col-xs-2" onClick={() => this.setSeat(2)}>Shift 3</Button>
            </div>
            <div className="row col-xs-6">
                {this.renderSeat()}
            </div>
            </div>
        )
    }

    render() {
        console.log(this.props.authGlobal.cookieCheck)
        if (this.props.authGlobal.cookieCheck === true){
            if (this.props.authGlobal.username == ""){
                return <Redirect to='/login' />
            }
            return (
                <div className="container-fluid">
                    {this.renderSchedule()}
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
export default connect(mapStateToProps)(Schedule);