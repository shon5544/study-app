import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ({route}) => {
    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <View>
                    <Text style={[styles.font, styles.title]}>{route.params.title}</Text>
                </View>
                <View style={styles.tag}>
                    <View style={styles.dot}></View>
                    <Text style={[styles.font]}>{route.params.tag}</Text>
                </View>
                <View>
                    <Text style={[styles.font]}>{route.params.content}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    font: {
        fontFamily: 'OTWelcomeRA'
    },
    box:{
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
        marginTop: 10,

        width: '90%'
    },
    title:{
        fontSize: 23,
        marginBottom: 15
    },
    tag:{
        borderColor: '#ebebeb',
        borderWidth: 2,
        alignSelf: 'flex-start',
        padding: 10,
        fontSize: 13,
        borderRadius: 7,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    dot:{
        backgroundColor: 'red',
        width: 10,
        height: 10,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: 5,
    }
})