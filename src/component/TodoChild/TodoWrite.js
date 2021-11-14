import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default () => {
    const [todo, setTodo] = useState('');
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [time, setTime] = useState(0);
    const [minute, setMinute] = useState(0);

    useLayoutEffect(()=>{
        const date = new Date();
        setMonth(date.getMonth + 1);
        setDay(date.getDate);
        setTime(date.getHours);
        setMinute(date.getMinutes)
    }, []);

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <TextInput style={[styles.font]} placeholder={"야"}/>
                <Text style={styles.font}>월</Text>
            </View>
            <TextInput style={[styles.input, styles.font]} placeholder={"할 일을 적어주세요!"}/>
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
        fontFamily: 'OTWelcomeRA'
    }
});