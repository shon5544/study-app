import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import * as Font from 'expo-font';
import Tabs from './Tabs';
import WriteNote from '../component/NoteChild/WriteNote';
import NoteDetail from '../component/NoteChild/NoteDetail';


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
                        }
                    }} name="복습노트" component={WriteNote}/>
                    <Stack.Screen options={{
                        headerShown: true,
                        headerTitleStyle:{
                            fontFamily: 'OTWelcomeRA'
                        }
                    }} name="자세히" component={NoteDetail}/>
                </Stack.Navigator>
             : <View></View>}
        </>
    )
}