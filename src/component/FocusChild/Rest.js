import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

export default ({navigation, callback, playAudio})=> {
    const [minuteR, setMinuteR] = useState(5);
    const [secR, setSecR] = useState(0);
    const [circleWidth, setCircleWidth] = useState(0);

    const interval = useRef();

    function minMinusR(){
        if(minuteR > 0){
            setMinuteR(minuteR - 1);
        } else if (minuteR === 0) {
            setMinuteR(0);
        }
    }

    function secMinusR(){
        if(secR > 0){
            setSecR((secR)=> secR - 1);
            // setCurrent(current + 1);
        } else if (secR === 0) {
            minMinusR();
            setSecR(59);
        }
    }

    const onLayout = (event) => {
        const {height} = event.nativeEvent.layout;
        setCircleWidth(height);
    }

    useEffect(()=>{
        interval.current = setInterval(secMinusR, 1000);

        if(minuteR <= 0 && secR <= 0){
            // navigation.navigate('메인', {state: true});
            callback(false);
            playAudio();
        }

        return ()=>{
            clearInterval(interval.current);
        }
    }, [secR]);

    return(
        <View style={styles.container}>
            <View onLayout={onLayout} style={styles.timerContainer}>
                <ProgressCircle
                    percent={100}
                    radius={circleWidth / 2.12}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#EBEBEB"
                    bgColor="#fff"
                >
                    <Text style={[styles.text, {fontSize: 28}]}>{minuteR < 10 ? '0' + minuteR : minuteR}:{secR < 10 ? '0' + secR : secR}</Text>
                </ProgressCircle>
            </View>
            
            <TouchableOpacity
                onPress={()=>{
                    // navigation.navigate('메인', {state: true});
                    callback(false);
                    playAudio();
                }}
                style={[styles.button, {
                    marginTop: 20,
                    // marginBottom: 9
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
                marginTop: 15,
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
                        if(minuteR > 0){
                            setMinuteR((minuteR)=> minuteR - 1);
                        }
                    }}>
                        <Text style={[styles.text, {fontSize: 18}]}>-1</Text>
                </TouchableOpacity>
                <Text style={[styles.text, {fontSize: 18, paddingHorizontal: 10}]}>시간</Text>
                <TouchableOpacity
                    onPress={()=>{
                        setMinuteR((minuteR)=> minuteR + 1)
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
        width: '60%',
        aspectRatio: 1,
        borderRadius: 200,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7%',
        marginBottom: '3%'
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