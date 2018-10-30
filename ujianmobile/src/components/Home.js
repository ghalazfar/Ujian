import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import Post from './Post';
import { getPostsList } from '../actions';

class Home extends Component {
    componentWillMount() {
        this.props.getPostsList()
    }        

    renderPost = () => {
        var imagelist = _.map(this.props.imagelist, (val) => {
            return {...val}
        }).reverse()
        var imageJSX = imagelist.map( (imageData) => {
            return <Post caption={imageData.caption} imageurl={imageData.imageurl} email={imageData.email}/>
            })
        return (
            imageJSX
        )
    }

    render() {
        return (
            <ScrollView>
                {this.renderPost()}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const { imagelist } = state
    return { imagelist };
};

export default connect(mapStateToProps, { getPostsList })(Home);
