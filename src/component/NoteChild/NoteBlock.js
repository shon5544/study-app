import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export default ({item, index})=>{
    return(
        <View style={styles.block} key={index}>
            <Text style={[styles.text, styles.title]}>{item.title.length > 8 ? item.title.slice(0,8) + '..' : item.title}</Text>
            <Text style={[styles.text, styles.tag]}>{item.tag}</Text>
            <Text style={[styles.text]}>{item.content.length > 150 ? item.content.slice(0,150) + '..' : item.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'OTWelcomeRA'
    },
    block:{
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginBottom: 10,
        marginRight: 10
    },
    title:{
        fontSize: 20,
        marginBottom: 7
    },
    tag:{
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.20,
        // shadowRadius: 1.41,

        // elevation: 2,
        width: 90,
        borderColor: '#ebebeb',
        borderWidth: 1,
        textAlign: 'center',
        marginBottom: 15
    },
});