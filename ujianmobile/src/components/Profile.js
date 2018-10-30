import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { postImageForm, imageDataPost, logoutUser } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class Profile extends Component {
    onCaptionChange = (text) => {
        this.props.postImageForm('caption', text);
    }
    
    onImageChange = (text) => {
        this.props.postImageForm('imageurl', text);
    }

    onPostButtonPress = () => {
        this.props.imageDataPost(this.props.caption, this.props.imageurl)
    }

    onLogoutPress = () => {        
        this.props.screenProps.rootNavigation.navigate('Login');
        this.props.logoutUser()
    }

    render() {
        return (
            <View>
                <Header
                    placement="left"
                    centerComponent={{ 
                        text: this.props.emailUser, 
                        style: { color: '#fff' } 
                    }}
                    rightComponent={{ 
                        icon: 'home', 
                        color: '#fff', 
                        onPress: this.onLogoutPress
                    }}
                />
                <Card>
                    <CardSection>
                        <Input 
                            label="Caption" 
                            placeholder="The Caption"
                            value={this.props.caption}
                            onChangeText={this.onCaptionChange} 
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                            label="Image" 
                            placeholder="Image Url..." 
                            value={this.props.imageurl}
                            onChangeText={this.onImageChange}
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onPostButtonPress}>
                            Post
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { caption, imageurl } = state.post;
    var emailUser = ''
    if (state.auth.user!==null){
        const { email } = state.auth.user.user;
        emailUser = email
    }
    return { caption, imageurl, emailUser };
};

export default connect(mapStateToProps, { postImageForm, imageDataPost, logoutUser })(Profile);
