import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import * as Font from 'expo-font';
import Tabs from './Tabs';
import Rest from '../component/stackScreen/Rest';

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
                    <Stack.Screen name="휴식" component={Rest}/>
                </Stack.Navigator>

             : <View></View>}
        </>
    )
}