import React from 'react';
import { View, StyleSheet } from 'react-native';
import UsageFocus from './UsageFocus';
import UsageNote from './UsageNote';
import UsageTodo from './UsageTodo';



export default ({navigation})=>{
    return(
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <UsageFocus style={style.topBox} navigation={navigation} />
            <UsageNote style={style.box} navigation={navigation} />
            <UsageTodo style={style.box} navigation={navigation} />
        </View>
    )
}


const style = StyleSheet.create({
    box:{
        padding: 30,
        borderBottomWidth: 1,
        borderColor: '#EBEBEB'
    },
    topBox:{
        padding: 30,
        borderWidth: 1,
        borderColor: '#EBEBEB',
    }
});