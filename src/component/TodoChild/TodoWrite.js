import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default ({navigation}) => {
    const [todo, setTodo] = useState('');
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [time, setTime] = useState(0);
    const [minute, setMinute] = useState(0);

    useLayoutEffect(()=>{
        const date = new Date();
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
        setTime(date.getHours());
        setMinute(date.getMinutes());
        // console.log(date.getMonth() + 1);
    }, []);

    useEffect(()=>{
        return ()=>{
            setTodo('');
            setMonth(0);
            setDay(0);
            setTime(0);
            setMinute(0);
        }
    },[]);

    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 20}}>
                    <Text style={{fontFamily: 'OTWelcomeRA', color: '#4285F4'}}>완료</Text>
                </TouchableOpacity>
            )
        });
    }, []);

    async function addTodo(){
        let year;

        const date = new Date();

        const nowMonth = date.getMonth() + 1;
        const nowDay = date.getDate();
        const nowTime = date.getTime();
        const nowMinute = date.getMinutes();

        if(month < nowMonth || day < nowDay || time < nowTime || minute < nowMinute){
            year = date.getFullYear() + 1;
        } else {
            year = date.getFullYear();
        }

        const todoData = {
            todo,
            month,
            day,
            time,
            minute,
            year
        }
        await AsyncStorage.setItem('Todo', JSON.stringify(todoData)).then(()=>{
            console.log('저장됨');
        });
    }

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 20, alignSelf: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setMonth(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${month}`} keyboardType="numeric"/>
                    <Text style={styles.font}>월</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setDay(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${day}`} keyboardType="numeric"/>
                    <Text style={styles.font}>일</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setTime(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${time}`} keyboardType="numeric"/>
                    <Text style={styles.font}>시</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setMinute(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${minute}`} keyboardType="numeric"/>
                    <Text style={styles.font}>분</Text>
                </View>
            </View>
            <TextInput 
            onChangeText={(value)=>{
                setTodo(value);
            }}
            style={[styles.input, styles.font]} placeholder={"할 일을 적어주세요!"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    input: {
        padding: 20
    },
    font: {
        fontFamily: 'OTWelcomeRA',
        fontSize: 17
    }
});