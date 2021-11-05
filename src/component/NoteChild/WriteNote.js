import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({navigation})=>{
    const [title, setTitle] = useState(null);
    const [tag, setTag] = useState(null);
    const [content, setContent] = useState(null);
    const [noteData, setNoteData] = useState([]);

    // 노트를 쓰고 저장할때 제목, 태그, 내용에 null 값이 들어가는 오류
    // setNoteData가 바로 작동을 안하는듯 parsedData는 정상 출력되지만 noteData는 결국 초기값 그대로.
    async function getNotes(){
        try{
            await AsyncStorage.getItem('Notes').then((value)=>{
                const parsedData = JSON.parse(value);
                console.log(parsedData);
                setNoteData(parsedData);
            })
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        getNotes();
    }, []);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                <TouchableOpacity onPress={()=>{
                    console.log(noteData);
                    noteData.push({title, tag, content});
                    console.log(noteData);
                    AsyncStorage.setItem('Notes', JSON.stringify(noteData));
                    navigation.replace('메인');
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