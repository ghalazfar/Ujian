import React from 'react';
import {Text, View, Image } from 'react-native';
import { Card, CardSection } from './common';

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 25
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    headerContentStyle: {
        justifyContent: 'space-around'
    },
    headerTextStyle:{
        fontSize: 18
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems:'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 700,
        flex: 1
    }
}

const Post = ({ caption, imageurl, email }) => {
    return (
        <Card>
            <CardSection>
                <View style={styles.thumbnailContainerStyle}>
                    <Image style={styles.thumbnailStyle} source={{ uri: imageurl }} />
                </View>
                <View style={styles.headerContentStyle}>
                    <Text style={styles.headerTextStyle}>{email}</Text>
                </View>                
            </CardSection>
            <CardSection>
                <Image style={styles.imageStyle} source={{ uri: imageurl }} />
            </CardSection>
            <CardSection>
                <Text>
                    {caption}
                </Text>
            </CardSection>
        </Card>
    )
}

export default Post