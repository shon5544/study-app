import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { addDays, format, getDate, isSameDay, startOfWeek } from 'date-fns';
// import { useEffect } from 'react';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

LocaleConfig.locales['fr'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
}
LocaleConfig.defaultLocale = 'fr';

export default ({data, date}) =>{
    // const [week, setWeek] = useState([]);
    // const [nowDate, setNowDate] = useState(date);
    const [items, setItems] = useState({});
    const [todo, setTodo] = useState({});
    const [isLoading, SetIsLoading] = useState(true);

    // const getWeekDays = (date) => {
    //     const start = startOfWeek(date, { weekStartsOn: 1 });
    //     const weekOfLength = 7;
    //     const result = [];
    //     for(let i = 0; i < weekOfLength; i++){
    //         const date = addDays(start, i);
    //         result.push({
    //             formatted: format(date, 'EEE'),
    //             date,
    //             day: getDate(date)
    //         });
    //     }

    //     return result;
    // }

    // 할 일 목록 가져오기
    useLayoutEffect(()=>{
        getTodo();
    }, []);


    const getTodo = async () => {
        await AsyncStorage.getItem('Todo').then((value)=>{
            const parsedData = JSON.parse(value);

            if(parsedData !== null && parsedData !== undefined){
                setTodo(parsedData);
            }
        })
    }

    // 로딩 상태 변경
    useEffect(()=>{
        if(todo !== {}){
            SetIsLoading(false);
        }
    }, [todo]);

    

    const loadItems = (day) => {
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            if (!items[strTime]) {
              items[strTime] = [];
              const numItems = Math.floor(Math.random() * 3 + 1);
              for (let j = 0; j < numItems; j++) {
                items[strTime].push({
                  name: 'Item for ' + strTime + ' #' + j,
                  height: Math.max(50, Math.floor(Math.random() * 150))
                });
              }
            }
          }
          const newItems = {};
          Object.keys(items).forEach(key => {
            newItems[key] = items[key];
          });
          setItems(newItems);
        }, 1000);
    }

    useEffect(()=>{
        console.log(todo);
    }, []);

    const renderItem = (item) => {
        return(
            <TouchableOpacity style={styles.contentContainer}>
                <View>
                    <Text style={styles.font}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={{flex:1}}>
            {/* {data.map((value, index)=>(
                <View key={index} style={styles.contentContainer}>
                    <Text style={styles.font}>{value}</Text>
                </View>
            ))} */}
            {/* {week.map((weekDay)=>{
                const textStyles = [styles.font];
                const touchableStyles = [styles.touchable];
                const sameDay = isSameDay(weekDay.date, nowDate);

                if(sameDay){
                    textStyles.push(styles.selectedFont);
                    touchableStyles.push(styles.selectedTouch);
                } else {
                    textStyles
                }

                return(
                    <View key={weekDay.formatted}>
                        <Text>{weekDay.formatted}</Text>
                        <TouchableOpacity
                        onPress={()=>setNowDate(weekDay.date)}
                        style={touchableStyles}
                        >
                            <Text style={textStyles}>{weekDay.day}</Text>
                        </TouchableOpacity>
                    </View>
                )
            })} */}
            {isLoading ?
            <ActivityIndicator size="large" />
            :
                <Agenda
                items={todo}
                loadItemsForMonth={loadItems}
                selected={date}
                showClosingKnob={true}
                renderItem={renderItem}
                theme={{
                    selectedDayBackgroundColor: '#4285F4',
                    dotColor: '#4285F4',
                    textDayFontFamily: 'OTWelcomeRA',
                    textMonthFontFamily: 'OTWelcomeRA',
                    textDayHeaderFontFamily: 'OTWelcomeRA',
                    textDayStyle:{
                        paddingRight: 1
                    },
                    todayTextColor: '#4285F4',
                    agendaTodayColor: '#4285F4'
                }}
                />
            }
            </View>
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
        marginTop: 20,
        marginBottom: 10,
        padding: 20,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center'
    },
    font: {
        fontFamily: 'OTWelcomeRA',
        color: '#000000'
    },
    selectedFont:{
        color: "#ffffff"
    },
    touchable:{
        padding: 10,
        borderRadius: 40
    },
    selectedTouch:{
        backgroundColor: '#4285F4'
    }
});