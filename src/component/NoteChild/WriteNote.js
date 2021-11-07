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
                if(parsedData !== null){
                    console.log(parsedData);
                    setNoteData(parsedData);
                }
            })
        } catch(e) {
            console.log(e);
        }
    }

    async function setNotes(){
        console.log(noteData);
        noteData.push({title, tag, content});
        console.log(noteData);
        await AsyncStorage.setItem('Notes', JSON.stringify(noteData));
        navigation.replace('메인');
    }

    // 이유를 알아낸 것 같다
    // 버튼 클릭시의 함수는 useLayoutEffect에서 등록됨 -> 버튼 클릭시엔 노트의 정보가 필요. 즉 버튼 함수 등록전에 노트의 정보가 있어야됨
    // -> 노트 정보를 useEffect에서 가져오니 당연히 노트정보가 제대로 올리가 없음. -> 논리 오류 발생.

    useEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                <TouchableOpacity onPress={()=>{
                    setNotes();
                }} style={{marginRight: 23}}><Text style={{fontFamily: 'OTWelcomeRA', color: '#4B89DC'}}>완료</Text></TouchableOpacity>
            )
        });
    });

    useLayoutEffect(()=>{
        getNotes();
    }, []);

    return(
        <View style={styles.container}>
            <TextInput onChangeText={(value)=>{
                setTitle(value);
                // console.log(title);
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