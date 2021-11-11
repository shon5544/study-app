import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import NoteList from './NoteChild/NoteList';

export default ({navigation})=>{
    const [noteList, setNoteList] = useState([]);
    const [tagList, setTagList] = useState([]);
    

    async function getNotes(){
        await AsyncStorage.getItem('Notes').then((value)=> {
            if(value !== null){
                const parsedData = JSON.parse(value);
                setNoteList(parsedData);
            }
        });
    }


    async function getTags(){
        await AsyncStorage.getItem('Tag').then((value)=>{
            if(value !== null && value !== undefined){
                const parsedData = JSON.parse(value);
                // console.log(parsedData);
                setTagList(parsedData);
                // return parsedData;
            }
        })
        // console.log(tagList);
    }

    

    // async function removeNote(){
    //     await AsyncStorage.removeItem('Notes');
    //     await AsyncStorage.removeItem('Tag');
    //     setNoteList([]);
    //     // setTagList([]);
    // }

    useEffect(()=>{
        getNotes();
        // getTags();
    }, []);
    
    useLayoutEffect(()=>{
        getTags();
    },[]);
    return(
        <>
            <NoteList noteList={noteList} tagList={tagList} navigation={navigation}/>
            {/* <TouchableOpacity onPress={()=>removeNote()}><Text>지우기</Text></TouchableOpacity> */}
        </>
    )
}