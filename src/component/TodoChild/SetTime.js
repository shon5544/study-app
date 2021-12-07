import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default ({styles, setMonth, date, setDay, setTime, setMinute}) => {
    return(
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
            <View style={style.setTimeBox}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setMonth(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${date.getMonth()+1 >= 10 ? date.getMonth()+1 : '0' + (date.getMonth()+1)}`} keyboardType="numeric"/>
                    <Text style={styles.font}>월</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setDay(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${date.getDate()+1 >= 10 ? date.getDate() : '0' + date.getDate()}`} keyboardType="numeric"/>
                    <Text style={styles.font}>일</Text>
                </View>
            </View>
            <View style={style.setTimeBox}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setTime(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${
                        date.getMinutes() < 30 ? 
                            date.getHours() >= 10 ? date.getHours() 
                            : '0' + date.getHours() 
                        : date.getHours() + 1 >= 10 ? date.getHours() + 1
                            : '0' + (date.getHours() + 1) 
                    }`} keyboardType="numeric"/>
                    <Text style={styles.font}>시</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                    <TextInput onChangeText={(value)=>{
                        setMinute(parseInt(value));
                    }} style={[styles.font, {marginRight: 5}]} placeholder={`${date.getMinutes() < 30 ? 30 : '0'+0}`} keyboardType="numeric"/>
                    <Text style={styles.font}>분</Text>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    setTimeBox: {
        padding: 8,
        borderRadius: 30,
        borderWidth: 1,
        flexDirection: 'row',
        marginRight: 18
    },
});