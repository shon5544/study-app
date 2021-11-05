import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default ()=>{
    return(
        <View style={styles.container}>
            <TextInput style={[styles.font, styles.input, {borderColor: '#EBEBEB', borderBottomWidth: 1.9, borderTopWidth: 1.9}]} placeholder="제목"/>
            <TextInput style={[styles.font, styles.input, {borderColor: '#EBEBEB', borderBottomWidth: 1.9}]} placeholder="과목/카테고리"/>
            <TextInput style={[styles.font, styles.input]} placeholder="공부했던 내용을 간단하게 적으세요!" multiline/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff'
    },
    font: {
        fontFamily: 'OTWelcomeRA'
    },
    input:{
        width: '100%',
        padding: 10,
        paddingLeft: 19
    }
})