import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({route, navigation}) => {
    const [notes, setNotes] = useState([]);

    async function getNotes(){
        await AsyncStorage.getItem('Notes').then((value)=>{
            const data = JSON.parse(value);
            setNotes(data);
        });
    }

    async function delNote(){
        const index = notes.findIndex((obj)=>obj.content === route.params.content && obj.title === route.params.title);
        notes.splice(index, 1);
        await AsyncStorage.setItem('Notes', JSON.stringify(notes));
        navigation.replace('메인');
    }

    useEffect(()=>{
        getNotes();
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                onPress={()=> delNote()}
                style={{marginRight: 22}}>
                    <EvilIcons name="trash" size={35} color="black" />
                </TouchableOpacity>
            )
        })
    }, [notes]);

    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <View>
                    <Text style={[styles.font, styles.title]}>{route.params.title}</Text>
                </View>
                <View style={styles.tag}>
                    <View style={[styles.dot, {backgroundColor: route.params.tagColor}]}></View>
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
        // backgroundColor: 'red',
        width: 10,
        height: 10,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: 5,
    }
})