import React from "react";
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Focus from "../component/Focus";
import Note from "../component/Note";
import Todo from "../component/Todo";
import Schedule from "../component/Schedule";
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default ({navigation})=>{
    return(
        <Tab.Navigator
        screenOptions={({route})=>({
            tabBarIcon: ({ focused })=>{
                let focusColor;
                let noteColor;
                let todoColor;
                let calendarColor;

                if(route.name === '집중'){
                    focusColor = focused ? '#4285F4' : 'black';
                    return <MaterialIcons name="timer" size={24} color={focusColor} />
                } else if(route.name === '노트') {
                    noteColor = focused ? '#4285F4' : 'black';
                    return <SimpleLineIcons name="notebook" size={19} color={noteColor} />
                } else if(route.name === '할 일') {
                    todoColor = focused ? '#4285F4' : 'black';
                    return <MaterialCommunityIcons name="playlist-edit" size={26} color={todoColor} />
                } else {
                    calendarColor = focused ? '#4285F4' : 'black';
                    return <AntDesign name="calendar" size={24} color={calendarColor} />
                }
            },
            headerTitleAlign: 'center',
            headerTitleStyle:{
                fontFamily: 'OTWelcomeRA'
            },
            tabBarLabelStyle:{
                fontFamily:'OTWelcomeRA',
                paddingBottom: 3,
                fontSize: 11
            }
        })}
        >
            <Tab.Screen name="집중" component={Focus}/>
            <Tab.Screen 
                    options={{
                        headerRight: () => (
                            <TouchableOpacity 
                            onPress={()=>{
                                navigation.navigate('복습노트');
                            }}
                            style={{marginRight: 20}}>
                                <MaterialCommunityIcons name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                        )
                    }} name="노트" component={Note}/>
            <Tab.Screen 
            options={{
                    headerRight: () => (
                        <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate('할 일 작성');
                        }}
                        style={{marginRight: 20}}>
                            <MaterialCommunityIcons name="pencil" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                    // unmountOnBlur: true
                }
            } 
            name="할 일" 
            component={Todo}
            />
            <Tab.Screen name="일정" component={Schedule}/>
        </Tab.Navigator>
    )
}