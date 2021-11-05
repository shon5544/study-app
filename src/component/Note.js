import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import NoteList from './NoteChild/NoteList';

export default ()=>{
    const [noteList, setNoteList] = useState([]);

    async function getNotes(){
        await AsyncStorage.getItem('Notes').then((value)=> {
            if(value !== null){
                const parsedData = JSON.parse(value);
                setNoteList(parsedData);
            }
        });
    }

    async function removeNote(){
        await AsyncStorage.removeItem('Notes');
        setNoteList([]);
    }

    useEffect(()=>{
        getNotes();
    }, []);
    return(
        <>
            <NoteList noteList={noteList}/>
            <TouchableOpacity onPress={()=>removeNote()}><Text>지우기</Text></TouchableOpacity>
        </>
    )
}