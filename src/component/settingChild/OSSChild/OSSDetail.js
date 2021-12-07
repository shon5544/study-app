import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

export default ({route}) => {
    return(
        <View style={[styles.container,{flex: 1, backgroundColor: '#ffffff'}]}>
            <Text style={styles.title}>{route.params.name}</Text>
            <Text style={styles.text}>artifact : {route.params.artifact}</Text>
            <Text style={styles.text}>license : {route.params.license}</Text>
            <View>
                {route.params.authors.map((value, index)=>(
                    <Text style={styles.text} key={index}>authors : {value}</Text>
                ))}
            </View>
            <Text style={[styles.text, {color: '#4285F4'}]} onPress={()=> Linking.openURL(`${route.params.url}`)}>{route.params.url}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    title: {
        fontFamily: 'OTWelcomeRA',
        fontSize: 27,
        marginBottom: 30
    },
    text:{
        fontFamily: 'OTWelcomeRA',
        marginBottom: 20,
        fontSize: 14
    }
});