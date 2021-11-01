import React, { useState, useEffect, useRef, useReducer } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

export default ()=>{
    const [set, setSet] = useState(1);
    const [startState, setStartState] = useState(false);
    const [time, setTime] = useState(0);
    const [minute, setMinute] = useState(25);
    const [sec, setSec] = useState(0);
    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(25*60);

    const interval = useRef();

    function plus(){
        setSet(set+1);
    }

    function minus(){
        if(set > 1){
            setSet(set-1)
        }
    }

    function timeMinus(){
        if(time > 0){
            setTime(time - 1);
        } else if (time === 0) {
            setTime(0);
        }
    }

    function minMinus(){
        if(minute > 0){
            setMinute(minute - 1);
        } else if (minute === 0) {
            timeMinus();
            setMinute(59);
        }
    }

    function secMinus(){
        if(sec > 0){
            setSec(sec - 1);
        } else if (sec === 0) {
            minMinus();
            setSec(59);
        }

        setCurrent(current + 1);
        console.log(`value : ${(current / total * 100).toFixed(1)}`);
    }

    useEffect(()=>{
        if(startState){
            interval.current = setInterval(secMinus, 1000);
        } else {
            clearInterval(interval.current);
        }

        if(time === 0 && minute === 0 && sec === 0){
            clearInterval(interval.current);
        }

        return ()=>{
            clearInterval(interval.current);
        }
    }, [sec, startState]);

    return(
        <View style={styles.container}>
            <View style={{
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
                width: 160,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 10
            }}>
                <TouchableOpacity onPress={()=> minus()} style={{paddingRight: 10, height: '100%', justifyContent:'center'}}>
                    <View>
                        <Image source={require('../img/down-arrow.png')} style={{width: 23, height: 23}}/>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.text, {fontSize: 24}]}>{set} 세트</Text>
                <TouchableOpacity onPress={()=> plus()} style={{paddingLeft: 10, height: '100%', justifyContent:'center'}}>
                    <View>
                        <Image source={require('../img/up-arrow.png')} style={{width: 23, height: 23}}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.timerContainer}>
                <ProgressCircle
                    percent={parseFloat((current / total * 100).toFixed(1))}
                    radius={90}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#EBEBEB"
                    bgColor="#fff"
                >
                    <Text style={[styles.text, {fontSize: 28}]}>{time < 10 ? '0' + time : time}:{minute < 10 ? '0' + minute : minute}:{sec < 10 ? '0' + sec : sec}</Text>
                </ProgressCircle>
            </View>
            {!startState ?
            <>
                <View style={{flexDirection: 'row', backgroundColor: '#ffffff', 
                    shadowColor: "#000",
                    shadowOffset:{
                    width: 0,
                    height: 2,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    elevation: 5,
                    width: 130,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 30
                    }}>
                    <TextInput placeholder="시간" onChangeText={(value)=> {
                        setTime(parseInt(value));
                        setTotal(total + 60*60*parseInt(value));
                    }} style={{paddingRight: 7, borderColor: '#EBEBEB', borderRightWidth: 2, textAlign:"center",  paddingLeft: 3}}/>
                    <TextInput placeholder="분" onChangeText={(value)=> {
                        setMinute(parseInt(value));
                        setTotal(total + 60*parseInt(value));
                    }} style={{paddingRight: 3, borderColor: '#EBEBEB', borderRightWidth: 2, paddingLeft: 10}}/>
                    <TextInput placeholder="초" onChangeText={(value)=> {
                        setSec(parseInt(value));
                        setTotal(total + parseInt(value));
                    }} style={{paddingLeft: 10}}/>
                </View>
                <TouchableOpacity
                onPress={()=>{
                    setStartState(!startState);
                }}
                style={{
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
                    marginTop: 20,
                    marginBottom: 30
                }}><Text style={[styles.text, {fontSize: 18}]}>시작하기</Text></TouchableOpacity>
            </>
            :<View>
                <TouchableOpacity
                onPress={()=>{
                    setStartState(!startState);
                }}
                style={{
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
                    marginTop: 26,
                    backgroundColor: '#3399FF'
                }}><Text style={[styles.text, {fontSize: 18, color: '#ffffff'}]}>일시정지</Text></TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{
                    setStartState(!startState);
                }}
                style={{
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
                    marginTop: 14,
                    marginBottom: 30,
                    backgroundColor: '#ff4848'
                }}><Text style={[styles.text, {fontSize: 18, color: '#ffffff'}]}>정지하기</Text></TouchableOpacity>
            </View>}
            
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
    }
});