import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

export default ({navigation, route})=>{
    const [set, setSet] = useState(1);
    const [startState, setStartState] = useState(false);
    const [stopState, setStopState] = useState(false);
    const [time, setTime] = useState(0);
    const [minute, setMinute] = useState(25);
    const [sec, setSec] = useState(0);
    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(0);
    const [percent, setPercent] = useState(0);

    const [firstT, setFirstT] = useState(time);
    const [firstM, setFirstM] = useState(minute);
    const [firstS, setFirstS] = useState(sec);

    const [loopState, setLoopState] = useState(true);
    // const [startPoint, setStartPoint] = useState(0);

    const interval = useRef();

    function plus(){
        setSet((set) => set+1);
        // setStartPoint((startPoint)=> startPoint + 1);
    }

    function minus(){
        if(set > 1){
            setSet((set)=>set-1)
            // setStartPoint((startPoint)=> startPoint - 1);
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
            setSec((sec)=> sec - 1);
            // setCurrent(current + 1);
        } else if (sec === 0) {
            minMinus();
            setSec(59);
        }
        
        setCurrent((current)=>(current + 1));
        setPercent(()=>(parseFloat((current / total * 100).toFixed(1))));
        console.log(`value : ${(current / total * 100).toFixed(1)} || total : ${total}, current : ${current}`);
    }

    function init(){
        setTime(firstT);
        setMinute(firstM);
        setSec(firstS);
        setCurrent(0);
        setPercent(0);
        clearInterval(interval.current);
    }
    
    useEffect(()=>{
        if(startState && !stopState){
            interval.current = setInterval(secMinus, 1000);
        } else if(startState && stopState) {
            clearInterval(interval.current);
        }

        //문제는 여기있다 이거해놓고 졸라이상해졌음 고쳐놓을것 그리고 휴식모드로 가는 조건 useEffect 이런거 자세히 살펴볼것
        // if(!loopState){
        //     setTime(firstT);
        //     setMinute(firstM);
        //     setSec(firstS);
        //     setCurrent(0);
        //     setPercent(0);
        //     clearInterval(interval.current);
        //     if(set >= 1){
        //         setSet((set)=>set-1);
        //         // setStartPoint((startPoint)=>startPoint - 1);
        //         // clearInterval(interval.current);
        //         setStopState(true);
        //         console.log(set);
        //         if(set > 0){
        //             navigation.navigate('휴식');
        //         }
        //     }
        // }

        if(!startState){
            init();
        }

        //startState가 핵심키

        if(time === 0 && minute === 0 && sec === 0){
            // setLoopState(false);
            // setStartState(false);
            if(set - 1 > 0){
                setSet((set)=>set-1);
                init();
                navigation.navigate('휴식');
            } else {
                setSet(()=>1);
                setStartState(false);
            }
        }

        return ()=>{
            clearInterval(interval.current);
        }
    }, [sec, startState, stopState]);

    useEffect(()=>{
        if(set <= 0){
            setSet(1);
            setStartState(false);
        }
    }, [set]);

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
                        setTime(parseInt(value));
                        setFirstT(parseInt(value));
                    }} style={{paddingRight: 7, borderColor: '#EBEBEB', borderRightWidth: 2, textAlign:"center",  paddingLeft: 3}}/>
                    <TextInput placeholder="분" keyboardType='numeric' onChangeText={(value)=> {
                        setMinute(parseInt(value));
                        setFirstM(parseInt(value));
                    }} style={{paddingRight: 3, borderColor: '#EBEBEB', borderRightWidth: 2, paddingLeft: 10}}/>
                    <TextInput placeholder="초" keyboardType="numeric" onChangeText={(value)=> {
                        setSec(parseInt(value));
                        setFirstS(parseInt(value));
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
                    setStartState(!startState);
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