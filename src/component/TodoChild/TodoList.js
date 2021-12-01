import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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

export default ({date}) =>{
    const [items, setItems] = useState({});
    const [todo, setTodo] = useState({});
    const [isLoading, SetIsLoading] = useState(true);

    // 렌더링 전, 할 일 목록 가져오도록 하기
    useLayoutEffect(()=>{
        getTodo();
    }, []);

    // 할 일 목록 가져오기
    const getTodo = async () => {
        await AsyncStorage.getItem('Todo').then((value)=>{
            const parsedData = JSON.parse(value);

            if(parsedData !== null && parsedData !== undefined){
                setTodo(parsedData);
            }
        })
    }

    // 할 일 목록 가져오는데 성공했을시, 로딩 상태 변경
    useEffect(()=>{
        if(todo !== {}){
            SetIsLoading(false);
        }
    }, [todo]);

    // Agneda에 넣는 함수. 그냥 베껴온거라 정확히 뭘하는지는 잘 모르겠다.
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

    // 체크 박스를 눌렀을 때 isDone을 반대로 바꾸고 저장하는 함수
    const pressCheck = async (item) => {
        await AsyncStorage.getItem('Todo').then((value)=>{
            let parsedData = JSON.parse(value);
            
            if(parsedData !== undefined){
                const itemsKey = Object.keys(item);
                const itemsName = item.name;
                console.log(parsedData);
                // itemsName이 잘못됐다. 오브젝트의 키면 날짜가 올줄 알았는데 내부 오브젝트의 키인 name과 time이 온다. 다른 해결책 강구

                // console.log(item);
                // const itemInParsedData = parsedData[itemsKey];

                // for(let i = 0; i < itemInParsedData.length; i++){
                //     let element = itemInParsedData[i];

                //     if(element.name == itemsName){
                //         element.isDone = !element.isDone;
                //         parsedData[itemsKey] = element
                //     }
                // }

                // saveItem(parsedData);
            }
            
        });
    }

    // 저장하는 함수. await를 한번에 두번써도 되는지 몰라서 분리함.
    const saveItem = async (parsedData) => {
        const stringifyData = JSON.stringify(parsedData);
        await AsyncStorage.setItem('Todo', stringifyData);
    }

    // 저장된 할 일을 Agenda에 렌더하는 함수
    const renderItem = (item) => {
        return(
            <View style={styles.contentContainer}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.font, styles.time]}>{item.time}</Text>
                    {!item.isDone ?
                        <TouchableOpacity onPress={()=> pressCheck(item)} style={styles.checkBox}>
                            <AntDesign name="checkcircleo" size={24} color="black" />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={()=> pressCheck(item)} style={styles.checkBox}>
                            <AntDesign name="checkcircle" size={24} color="black" />
                        </TouchableOpacity>
                    }
                </View>
                <View>
                    <Text style={styles.font}>{item.name}</Text>
                </View>
            </View>
        )
    }

    return(
        <View style={{flex:1}}>
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
    },
    time:{
        fontSize: 18,
        marginBottom: 16,
        opacity: 0.5,
    },
    checkBox:{
        position: 'absolute',
        right: 5
    }
});