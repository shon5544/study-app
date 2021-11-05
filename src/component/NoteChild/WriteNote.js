import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({navigation})=>{
    const [title, setTitle] = useState(null);
    const [tag, setTag] = useState(null);
    const [content, setContent] = useState(null);
    const [noteData, setNoteData] = useState([]);
    

    useEffect(()=>{
        try{
            AsyncStorage.getItem('Notes').then((value)=>{
                const parsedData = JSON.parse(value);
                console.log(parsedData);
                setNoteData(parsedData);
            })
        } catch(e) {
            console.log(e);
        }
    }, []);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                <TouchableOpacity onPress={()=>{
                    noteData.push({title, tag, content});
                    AsyncStorage.setItem('Notes', JSON.stringify(noteData));
                    navigation.navigate('노트');
                }} style={{marginRight: 23}}><Text style={{fontFamily: 'OTWelcomeRA', color: '#4B89DC'}}>완료</Text></TouchableOpacity>
            )
        })
    }, []);

    return(
        <View style={styles.container}>
            <TextInput onChangeText={(value)=>{
                setTitle(value);
                console.log(title);
            }} style={[styles.font, styles.input, {borderColor: '#EBEBEB', borderBottomWidth: 1.9, borderTopWidth: 1.9}]} placeholder="제목"/>
            <TextInput onChangeText={(value)=>{
                setTag(value);
            }} style={[styles.font, styles.input, {borderColor: '#EBEBEB', borderBottomWidth: 1.9}]} placeholder="과목/카테고리"/>
            <TextInput onChangeText={(value)=>{
                setContent(value);
            }} style={[styles.font, styles.input]} placeholder="공부했던 내용을 간단하게 적으세요!" multiline/>
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