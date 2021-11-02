import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

export default ({navigation})=> {
    const [minute, setMinute] = useState(5);
    const [sec, setSec] = useState(0);

    const interval = useRef();

    function minMinus(){
        if(minute > 0){
            setMinute(minute - 1);
        } else if (minute === 0) {
            setMinute(59);
        }
    }

    function secMinus(){
        if(sec > 0){
            setSec((sec)=> sec - 1);
            // setCurrent(current + 1);
        } else if (sec === 0) {
            minMinus();
            setSec(59);
        }   
    }

    useEffect(()=>{
        interval.current = setInterval(secMinus, 1000);

        if(minute <= 0 && sec <= 0){
            navigation.navigate('메인', {state: true});
        }

        return ()=>{
            clearInterval(interval.current);
        }
    }, [sec]);

    return(
        <View style={styles.container}>
            <View style={styles.timerContainer}>
                <ProgressCircle
                    percent={100}
                    radius={90}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#EBEBEB"
                    bgColor="#fff"
                >
                    <Text style={[styles.text, {fontSize: 28}]}>{minute < 10 ? '0' + minute : minute}:{sec < 10 ? '0' + sec : sec}</Text>
                </ProgressCircle>
            </View>
            
            <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('메인');
                }}
                style={[styles.button, {
                    marginTop: 20,
                    marginBottom: 30
                }]}>
                    <Text style={[styles.text, {fontSize: 18}]}>버킷하기</Text>
            </TouchableOpacity>
            <View style={{
                shadowColor: "#000",
                shadowOffset:{
                width: 0,
                height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 5,
                width: 150,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 10,
                marginTop: 30,
                backgroundColor: '#ffffff',
                flexDirection: 'row'
            }}>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 10,
                        borderColor: '#EBEBEB',
                        borderRightWidth: 2,
                    }}
                    onPress={()=>{
                        setMinute((minute)=> minute - 1);
                    }}>
                        <Text style={[styles.text, {fontSize: 18}]}>-1</Text>
                </TouchableOpacity>
                <Text style={[styles.text, {fontSize: 18, paddingHorizontal: 10}]}>시간</Text>
                <TouchableOpacity
                    onPress={()=>{
                        setMinute((minute)=> minute + 1)
                    }}
                    style={{
                        paddingHorizontal: 10,
                        borderColor: '#EBEBEB',
                        borderLeftWidth: 2
                    }}
                >
                        <Text style={[styles.text, {fontSize: 18}]}>+1</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timerContainer:{
        shadowColor: "#000",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    text:{
        fontFamily: 'OTWelcomeRA'
    },
    button:{
        flexDirection: 'row',
        backgroundColor: '#ffffff', 
        shadowColor: "#000",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5,
        width: 130,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 30,
    }
});