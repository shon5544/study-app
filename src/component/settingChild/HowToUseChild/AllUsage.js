import React from 'react';
import { View, StyleSheet } from 'react-native';
import UsageFocus from './UsageFocus';
import UsageNote from './UsageNote';
import UsageTodo from './UsageTodo';



export default ()=>{
    return(
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <UsageFocus style={style.topBox} />
            <UsageNote style={style.box} />
            <UsageTodo style={style.box} />
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