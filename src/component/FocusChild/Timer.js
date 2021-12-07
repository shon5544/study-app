import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
// import Sound from 'react-native-sound';
// import SoundPlayer from 'react-native-sound-player';

export default ({start, restHanle, set, firstT, firstM, firstS, time, minute, sec, setHandle,timeHandle, minHandle, secHandle, fstTHandle, fstMHandle, fstSHandle, total, setTotal, playAudio, navigation})=>{

    const [startState, setStartState] = useState(false);
    const [stopState, setStopState] = useState(false);

    const [current, setCurrent] = useState(0);
    
    const [percent, setPercent] = useState(0);

    const [firstStarted, setFirstStarted] = useState(true);
    const [cStop, setCStop] = useState(false);

    const [circleWidth, setCircleWidth] = useState(0);
    const [review, setReview] = useState(true);

    // 초 감소에 쓸 interval
    const interval = useRef();

    // 세트 추가
    const plus = () => {
        setHandle((set)=>set+1);
    }

    // 세트 감소
    const minus = () => {
        if(set > 1){
            setHandle((set)=>set-1);
        }
    }

    // 시간 감소
    const timeMinus = () => {
        if(time > 0){
            timeHandle(time - 1);
        } else if (time === 0) {
            timeHandle(0);
        }
    }

    // 분 감소
    const minMinus = () => {
        if(minute > 0){
            minHandle(minute - 1);
        } else if (minute === 0) {
            timeMinus();
            minHandle(59);
        }
    }

    // 초 감소
    const secMinus = () =>{
        if(sec > 0){
            secHandle((sec)=> sec - 1);
            // setCurrent(current + 1);
        } else if (sec === 0) {
            minMinus();
            secHandle(59);
            // setCurrent(1);
        }

        if(current === 0){
            setCurrent((current)=> current + 1);
        }
        
        setCurrent((current)=>(current + 1));
        setPercent(()=>(parseFloat((current / total * 100).toFixed(1))));
        // console.log(`value : ${(current / total * 100).toFixed(1)} || total : ${total}, current : ${current}`);
    }

    // 초기화 함수
    const init = () =>{
        clearInterval(interval.current);
        timeHandle(firstT);
        minHandle(firstM);
        secHandle(firstS);
        setCurrent(0);
        setPercent(0);
    }

    // View의 크기를 알아내는 함수
    const onLayout = (event) => {
        const {height} = event.nativeEvent.layout;
        setCircleWidth(height);
    }

    // 복습노트 설정 가져오는 함수
    const getReviewOption = async () => {
        await AsyncStorage.getItem('Review').then((value)=>{
            if(value){
                const parsedData = JSON.parse(value);
                setReview(parsedData);
                console.log(review);
            }
        })
    }
    
    // 전체적인 재생 이벤트
    useEffect(()=>{
        if(startState && !stopState){
            interval.current = setInterval(secMinus, 1000);
        } else if(startState && stopState) {
            clearInterval(interval.current);
        }

        if(!startState){
            init();
        }

        if(cStop){
            playAudio();
            setCStop(false);
            minus();
            init();
            restHanle(true);
        }

        if(startState && time === 0 && minute === 0 && sec === 0){
            playAudio();
            if(set>1){
                minus();
                init();
                setStartState(false);
                restHanle(true);
            } else {
                init();
                setStartState(false);
                if(review){
                    navigation.navigate('복습노트');
                }
            }
        }

        if(!firstStarted){
            setStartState(true);
        }

        return ()=>{
            clearInterval(interval.current);
        }
    }, [sec, startState, stopState]);

    // 이건 뭐고 왜 있는지 기억 안나는 데 얘 없으면 제대로 안돌아감.
    // 과거에 내가 필요 했으니까 넣었겠지
    useEffect(()=>{
        setStartState(start);
    }, [start]);
    
    useEffect(()=>{
        getReviewOption();
    }, [startState]);

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
                    <View onLayout={onLayout} style={styles.timerContainer}>
                        <ProgressCircle
                            percent={percent}
                            radius={circleWidth / 2.12}
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
                        <TextInput style={styles.text} placeholder="시간" keyboardType='numeric' onChangeText={(value)=> {
                            if(value){
                                timeHandle(parseInt(value));
                                fstTHandle(parseInt(value));
                            } else {
                                timeHandle(parseInt(value));
                                fstTHandle(parseInt(value));
                            }
                        }} style={{paddingRight: 7, borderColor: '#EBEBEB', borderRightWidth: 2, textAlign:"center",  paddingLeft: 3}}/>
                        <TextInput style={styles.text} placeholder="분" keyboardType='numeric' onChangeText={(value)=> {
                            if(value){
                                minHandle(parseInt(value));
                                fstMHandle(parseInt(value));
                            } else {
                                minHandle(parseInt(0));
                                fstMHandle(parseInt(0));
                            }
                        }} style={{paddingRight: 3, borderColor: '#EBEBEB', borderRightWidth: 2, paddingLeft: 10}}/>
                        <TextInput style={styles.text} placeholder="초" keyboardType="numeric" onChangeText={(value)=> {
                            if(value){
                                secHandle(parseInt(value));
                                fstSHandle(parseInt(value));
                            } else {
                                secHandle(parseInt(0));
                                fstSHandle(parseInt(0))
                            }
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
                    }}>
                        {stopState? 
                            <Text style={[styles.text, {fontSize: 18, color: '#ffffff'}]}>재개하기</Text>
                        :
                            <Text style={[styles.text, {fontSize: 18, color: '#ffffff'}]}>일시정지</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>{
                        if(set>1){
                            setCStop(true);
                        } else {
                            playAudio();
                            setStartState(false);
                            if(review){
                                navigation.navigate('복습노트');
                            }
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
    }
});