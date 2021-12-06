import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { Agenda, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoOne from './TodoOne';

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
    // const [refreshState, setRefreshState] = useState(true);

    // 렌더링 전, 할 일 목록 가져오도록 하기
    useLayoutEffect(()=>{
        getTodo();
    }, []);

    // 할 일 목록 가져오는데 성공했을시, 로딩 상태 변경
    useEffect(()=>{
        if(todo !== {}){
            SetIsLoading(false);
        }
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


    // Agneda에 넣는 함수. 그냥 베껴온거라 정확히 뭘하는지는 잘 모르겠다.
    // 대략적으로 한달의 모든 날들에 Item for 날짜 # 번호를 붙여 정리해놓는 것 같다.
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
    const pressCheck = (item) => {
        let tempTodo = todo;
        
        if(tempTodo !== undefined){
            // 전달 받은 item의 날짜
            const itemsKey = item.schedule;

            // 이름 비교를 위한 item의 이름
            const itemsId = item.id;

            // 해당 item의 Array
            const itemInParsedData = tempTodo[itemsKey];

            // array의 요소 검사 및 해당요소 변경
            for(let i = 0; i < itemInParsedData.length; i++){
                let element = itemInParsedData[i];

                if(element.id === itemsId){
                    element.isDone = !element.isDone;
                    tempTodo[itemsKey][i] = element;
                    
                    setTodo(tempTodo);
                    console.log(todo);
                }
            }
            
            saveItem(tempTodo);
        }
    }

    // 할 일 지우는 함수
    const deleteItem = (item) => {
        let tempTodo = todo;

        if(tempTodo !== undefined){
            // 전달 받은 item의 날짜
            const itemsKey = item.schedule;

            // 이름 비교를 위한 item의 이름
            const itemsId = item.id;

            // 해당 item의 Array
            const itemInParsedData = tempTodo[itemsKey];

            if(itemInParsedData.length === 1){
                delete tempTodo[itemsKey];
                saveItem(tempTodo);
            } else {
                for(let i = 0; i < itemInParsedData.length; i++){
                    let element = itemInParsedData[i];
    
                    if(element.id === itemsId){
                        tempTodo[itemsKey].splice(i, 1);

                        setTodo(tempTodo);
                        console.log(todo);
                    }
                }

                saveItem(tempTodo);
            }

        }
    }

    // 저장하는 함수. await를 한번에 두번써도 되는지 몰라서 분리함.
    const saveItem = async (parsedData) => {
        const stringifiedData = JSON.stringify(parsedData);
        await AsyncStorage.setItem('Todo', stringifiedData);
    }

    // 할 일 수정하는 함수
    const editItem = (text, item) => {
        let tempTodo = todo;

        if(tempTodo !== undefined){
            // 전달 받은 item의 날짜
            const itemsKey = item.schedule;

            // 이름 비교를 위한 item의 이름
            const itemsId = item.id;

            // 해당 item의 Array
            const itemInParsedData = tempTodo[itemsKey];

            for(let i = 0; i < itemInParsedData.length; i++){
                let element = itemInParsedData[i];

                if(element.id === itemsId){
                    let copiedItem = item;
                    copiedItem.name = text;
                    tempTodo[itemsKey][i] = copiedItem;

                    setTodo(tempTodo);
                    console.log(todo);
                }
            }

            saveItem(tempTodo);
            

        }
    }

    // 저장된 할 일을 Agenda에 렌더하는 함수
    const renderItem = (item) => {
        // const [test, setTest] = useState(false);
        return(
            <TodoOne item={item} pressCheck={pressCheck} deleteItem={deleteItem} editItem={editItem}/>
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
                // onRefresh={()=> setTodo(todo)}
                // refreshing={refreshState}
                />
            }
            </View>
    )
}

