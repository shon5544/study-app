import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

export default ({start, restHanle, set, firstT, firstM, firstS, time, minute, sec, setHandle,timeHandle, minHandle, secHandle, fstTHandle, fstMHandle, fstSHandle, total, setTotal})=>{
    // const [set, setSet] = useState(1);
    const [startState, setStartState] = useState(false);
    const [stopState, setStopState] = useState(false);
    // const [time, setTime] = useState(0);
    // const [minute, setMinute] = useState(25);
    // const [sec, setSec] = useState(0);
    const [current, setCurrent] = useState(0);
    
    const [percent, setPercent] = useState(0);

    // const [firstT, setFirstT] = useState(time);
    // const [firstM, setFirstM] = useState(minute);
    // const [firstS, setFirstS] = useState(sec);
    const [firstStarted, setFirstStarted] = useState(true);
    const [cStop, setCStop] = useState(false);
    
    
    // const [loopState, setLoopState] = useState(true);
    // const [startPoint, setStartPoint] = useState(0);

    const interval = useRef();

    function plus(){
        setHandle((set)=>set+1);
        // setStartPoint((startPoint)=> startPoint + 1);
        // setLoopState(true);
    }

    function minus(){
        if(set > 1){
            setHandle((set)=>set-1);
            // setStartPoint((startPoint)=> startPoint - 1);
        }
        
        // console.log(set);
        // console.log(loopState);
    }

    // 2 -> 1 : setLoopState(false);

    function timeMinus(){
        if(time > 0){
            timeHandle(time - 1);
        } else if (time === 0) {
            timeHandle(0);
        }
    }

    function minMinus(){
        if(minute > 0){
            minHandle(minute - 1);
        } else if (minute === 0) {
            timeMinus();
            minHandle(59);
        }
    }

    function secMinus(){
        if(sec > 0){
            secHandle((sec)=> sec - 1);
            // setCurrent(current + 1);
        } else if (sec === 0) {
            minMinus();
            secHandle(59);
        }
        
        setCurrent((current)=>(current + 1));
        setPercent(()=>(parseFloat((current / total * 100).toFixed(1))));
        console.log(`value : ${(current / total * 100).toFixed(1)} || total : ${total}, current : ${current}`);
    }

    function init(){
        clearInterval(interval.current);
        // setStopState(false);
        timeHandle(firstT);
        minHandle(firstM);
        secHandle(firstS);
        setCurrent(0);
        setPercent(0);
    }
    
    useEffect(()=>{
        if(startState && !stopState){
            interval.current = setInterval(secMinus, 1000);
        } else if(startState && stopState) {
            clearInterval(interval.current);
        }

        if(!startState){
            // minus();
            init();
            // restHanle(true);
        }

        if(cStop){
            setCStop(false);
            minus();
            init();
            // setStartState(false);
            restHanle(true);
        }

        //startState가 핵심키
        //loopState를 만들어서 이용해보자
        if(time === 0 && minute === 0 && sec === 0){
            if(set>1){
                minus();
                init();
                setStartState(false);
                restHanle(true);
                // navigation.navigate('휴식');
            } else {
                init();
                setStartState(false);
            }
        }

        if(!firstStarted){
            setStartState(true);
        }

        return ()=>{
            clearInterval(interval.current);
        }
    }, [sec, startState, stopState]);

    useEffect(()=>{
        setStartState(start);
    }, [start]);
    

    return(
        <>
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
                                <Image source={require('../../img/down-arrow.png')} style={{width: 23, height: 23}}/>
                            </View>
                        </TouchableOpacity>
                        <Text style={[styles.text, {fontSize: 24}]}>{set} 세트</Text>
                        <TouchableOpacity onPress={()=> plus()} style={{paddingLeft: 10, height: '100%', justifyContent:'center'}}>
                            <View>
                                <Image source={require('../../img/up-arrow.png')} style={{width: 23, height: 23}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.timerContainer}>
                        <ProgressCircle
                            percent={percent}
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
                        <TextInput placeholder="시간" keyboardType='numeric' onChangeText={(value)=> {
                            timeHandle(parseInt(value));
                            fstTHandle(parseInt(value));
                        }} style={{paddingRight: 7, borderColor: '#EBEBEB', borderRightWidth: 2, textAlign:"center",  paddingLeft: 3}}/>
                        <TextInput placeholder="분" keyboardType='numeric' onChangeText={(value)=> {
                            minHandle(parseInt(value));
                            fstMHandle(parseInt(value));
                        }} style={{paddingRight: 3, borderColor: '#EBEBEB', borderRightWidth: 2, paddingLeft: 10}}/>
                        <TextInput placeholder="초" keyboardType="numeric" onChangeText={(value)=> {
                            secHandle(parseInt(value));
                            fstSHandle(parseInt(value));
                        }} style={{paddingLeft: 10}}/>
                    </View>
                    <TouchableOpacity
                    onPress={()=>{
                        setTotal(time*60*60 + minute*60 + sec);
                        // if(set > 1){
                        //     setLoopState(true);
                        // }
                        setStartState((startState)=>!startState);
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
                        setStopState(!stopState);
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
                        if(set>1){
                            setCStop(true);
                        } else {
                            setStartState(false);
                        }
                        // setStartState(!startState);
                        // setTime(firstT);
                        // setMinute(firstM);
                        // setSec(firstS);
                        // setCurrent(0);
                        // setPercent(0);
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
        </>
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