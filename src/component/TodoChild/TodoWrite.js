import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default ({navigation}) => {
    const [todo, setTodo] = useState('');
    // const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [time, setTime] = useState(0);
    const [minute, setMinute] = useState(0);
    const [allTodo, setAllTodo] = useState({});
    const [date, setDate] = useState(new Date());


    // 현재 날짜 가져오기 & 할 일 리스트 가져오기
    useLayoutEffect(()=>{
        // const date = new Date();
        // setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
        setTime(date.getHours());
        setMinute(date.getMinutes());
        getTodo();

        
    }, []);

    // 클리어 함수
    // useEffect(()=>{
    //     return ()=>{
    //         init();
    //     }
    // },[]);

    // 완료 버튼 세팅
    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <>
                <TouchableOpacity onPress={()=>addTodo()} style={{marginRight: 20}}>
                    <Text style={{fontFamily: 'OTWelcomeRA', color: '#4285F4'}}>완료</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>delItems()} style={{marginRight: 20}}>
                    <Text style={{fontFamily: 'OTWelcomeRA', color: '#4285F4'}}>삭제</Text>
                </TouchableOpacity>
                </>
            )
        });

        // // 클리어 함수
        // return ()=>{
        //     init();
        // }
    }, [month, day, time, minute, todo]);

    const delItems = async () => {
        await AsyncStorage.removeItem('Todo').then(()=>{
            navigation.replace('메인');
        });
    }

    // 이전까지의 할 일 리스트 가져오기
    const getTodo = async () => {
        await AsyncStorage.getItem('Todo').then((value)=> {
            const parsedData = JSON.parse(value);

            if(parsedData !== null && parsedData !== undefined){
                setAllTodo(parsedData);
            }
        });
    }

    // const init = () => {
    //     setTodo('');
    //     // setYear(0);
    //     setMonth(0);
    //     setDay(0);
    //     setTime(0);
    //     setMinute(0);
    // }

    // 할 일 추가하기. 완료 버튼에 바인딩 됨.
    async function addTodo(){
        let year;

        // const date = new Date();

        const nowMonth = date.getMonth() + 1;
        // const nowDay = date.getDate();
        // const nowHour = date.getHours();
        // const nowMinute = date.getMinutes();

        // 만약에 새로 적은 날짜들이 현재 날짜보다 적은 모순적인 상황이라면, 내년에 할 일로 간주하고 year에 1추가
        if(month < nowMonth){
            year = date.getFullYear() + 1;
        } else {
            year = date.getFullYear();
        }

        // Agenda에 사용될 키
        const key = `${year}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day}`;
        const reservationTime = `${time >= 10 ? time : '0' + time}시 ${minute >= 10 ? minute : '0' + minute}분`;
        const value = {name: todo, time: reservationTime, isDone: false, schedule: key};

        let copiedAllTodo = allTodo;
        if (copiedAllTodo[key] === undefined){
            copiedAllTodo[key] = [value];
        } else {
            copiedAllTodo[key].push(value);
        }
        console.log(copiedAllTodo);

        await AsyncStorage.setItem('Todo', JSON.stringify(copiedAllTodo)).then(()=>{
            console.log('저장됨');
            navigation.replace('메인');
        });
    }

    useEffect(()=>{
        console.log(allTodo);
    }, [allTodo]);

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 20, alignSelf: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setMonth(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${date.getMonth()+1}`} keyboardType="numeric"/>
                    <Text style={styles.font}>월</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setDay(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${date.getDate()}`} keyboardType="numeric"/>
                    <Text style={styles.font}>일</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setTime(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${date.getHours()}`} keyboardType="numeric"/>
                    <Text style={styles.font}>시</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setMinute(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${date.getMinutes()}`} keyboardType="numeric"/>
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