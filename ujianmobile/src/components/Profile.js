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
        this.props.logoutUser()
        this.props.screenProps.rootNavigation.navigate('Login');
    }

    render() {
        return (
            <View>
                <Header
                    placement="left"
                    centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
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
                            placeholder="Insert caption..."
                            value={this.props.caption}
                            onChangeText={this.onCaptionChange} 
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                            label="Image" 
                            placeholder="Insert image url..." 
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
    return { caption, imageurl };
};

export default connect(mapStateToProps, { postImageForm, imageDataPost, logoutUser })(Profile);
