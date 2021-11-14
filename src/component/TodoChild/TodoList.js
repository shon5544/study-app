import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default ({data}) =>{
    return(
        <ScrollView style={{paddingTop: 20}}>
            {data.map((value, index)=>(
                <View key={index} style={styles.contentContainer}>
                    <Text style={styles.font}>{value}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        padding: 20,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center'
    },
    font: {
        fontFamily: 'OTWelcomeRA'
    }
});