import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Font from 'expo-font';
import Tabs from './Tabs';
import WriteNote from '../component/NoteChild/WriteNote';


const Stack = createStackNavigator()

export default ()=>{
    const [ready, setReady] = useState(false);
    async function fontReady(){
        await Font.loadAsync({'OTWelcomeRA': require('../../assets/fonts/OTWelcomeRA.ttf')});
        setReady(true);
    }

    useEffect(()=>{
        fontReady();
    }, []);
    return(
        <>
            {ready?
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="메인" component={Tabs}/>
                    <Stack.Screen options={{
                        headerShown: true,
                        headerTitleStyle: {
                            fontFamily: 'OTWelcomeRA'
                        },
                        headerRight: ()=>(
                            <TouchableOpacity style={{marginRight: 23}}><Text style={{fontFamily: 'OTWelcomeRA', color: '#4B89DC'}}>완료</Text></TouchableOpacity>
                        )
                    }} name="복습노트" component={WriteNote}/>
                </Stack.Navigator>
             : <View></View>}
        </>
    )
}