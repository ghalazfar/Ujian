import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem, Button, Label } from 'react-bootstrap';
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
        this.setState({ seatList: seatList, shiftNum: shiftNum})
    }

    renderLayar = () => {
        if (this.state.shiftNum != undefined){
            return (
                <Label className="col-xs-12" style={{marginLeft: "7px", marginBottom: "50px" }}>Layar</Label>
            )
        }    
    }

    renderSeat = () => {
        const seatbox = this.state.seatList.map((seatIndex) =>
            this.checkIfBooked(seatIndex)
        )
        return (
            <div className="col-xs-5">
                {this.renderLayar()}
                <div className="row">
                    {seatbox}
                </div>
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
        const { id, title, desc, img, shift, imdb } = movies
        axios.put(API + '/movies/' + selectedMovie, {
            id: id,
            title: title,
            desc: desc,
            img: img,
            shift: shift,
            imdb: imdb
        }).then((response) => {
            this.setState({ });  
            alert("Anda telah berhasil membayar sebesar Rp."+this.state.totalCost)
            console.log(response);      
        }).catch((err) => {
            alert("Check Out Gagal!")
            console.log(err);
        })         
    }

    checkIfBooked = (seatIndex) => {
        if(seatIndex.booked == "empty") {        
            return (
                <div className="col-xs-1">
                    <input type="button" className="btn btn-primary" value=" " onClick={() => this.selectBox((seatIndex.id)-1)} />
                </div>
            )
        }
        else if(seatIndex.booked == "selected") { 
            return (
                <div class="col-xs-1">
                    <input type="button" className="btn btn-success active" value=" " onClick={() => this.unselectBox((seatIndex.id)-1)}/>
                </div>
            )
        }    
        return (
            <div className="col-xs-1">
                <input type="button" className="btn btn-danger" value=" " disabled />
            </div>
        )            
    }

    selectBox = (seatIndex) => {      
        const bookSeatList = this.state.seatList        
        bookSeatList[seatIndex].booked = "selected"
        const totalCost = this.countPrice()
        const bookedSeats = this.bookedSeats()
        this.setState({ seatList: bookSeatList, totalCost: totalCost, bookedSeats: bookedSeats })               
    }

    unselectBox = (seatIndex) => {      
        const bookSeatList = this.state.seatList        
        bookSeatList[seatIndex].booked = "empty"
        const totalCost = this.countPrice()
        const bookedSeats = this.bookedSeats()
        this.setState({ seatList: bookSeatList, totalCost: totalCost, bookedSeats: bookedSeats })       
    }

    countPrice = () => {
        const bookSeatList = this.state.seatList
        var ticketCount = 0
        for (var i in bookSeatList){
            if (bookSeatList[i].booked == "selected"){
                ticketCount++
            }
        }
        var price = 0
        if (this.state.shiftNum == 0){
            price = 25000
        }
        else if (this.state.shiftNum == 1){
            price = 35000
        }
        return(
            ticketCount*price
        ) 
    }

    bookedSeats = () => {
        const bookSeatList = this.state.seatList
        var bookedSeats = []
        for (var i in bookSeatList){
            if (bookSeatList[i].booked == "selected"){
                bookedSeats.push(bookSeatList[i].nama)
            }
        }
        return bookedSeats
    }

    renderCheckout = () => {
        if (this.state.totalCost != undefined)  { 
            return (
                <div className="col-xs-7 col-xs-push-2"> 
                    <h3>
                        Kursi: {(this.state.bookedSeats.join(', '))}
                    </h3>    
                    <h3>
                        Total Harga: Rp. {this.state.totalCost}
                    </h3>           
                    <input type="button" className="btn btn-warning" value="Check Out" onClick={() => this.onCheckoutClick()} />
                </div>
            )
        }    
    }

    renderSchedule = () => {
        return (
            <div>
                <div className="container-fluid">
                    <div className="col-xs-3">                
                        <img style={{ margin: "auto"}} className="img-responsive" src={this.state.movies.img} alt="" />               
                    </div>
                    <div className="col-xs-7" align="left">                
                        <h1>{this.state.movies.title}</h1> 
                        <h4>{this.state.movies.desc}</h4>  
                        <div className="row">
                        <Button href={this.state.movies.imdb}>IMDB</Button>
                        <DropdownButton title="Schedule">
                            <MenuItem eventKey="1" onClick={() => this.setSeat(0)}>Morning</MenuItem>
                            <MenuItem eventKey="2" onClick={() => this.setSeat(1)}>Evening</MenuItem>
                        </DropdownButton>
                        </div>         
                    </div>
                </div>            
                <div className="row col-xs-7 col-xs-push-4" style={{ paddingTop: "50px"}}>
                    {this.renderSeat()}
                </div>                    
                <div>
                    {this.renderCheckout()}
                </div>  
            </div>
        )
    }

    render() {
        if (this.props.selectedMovie.selectedMovie !== 0){
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
        return <Redirect to='/' />         
    }
}

const mapStateToProps = (state) => {
    return { authGlobal: state.auth, selectedMovie: state.movie };
  }
export default connect(mapStateToProps)(Schedule);