import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
// import Sound from 'react-native-sound';
// import SoundPlayer from 'react-native-sound-player';

export default ({start, restHanle, set, firstT, firstM, firstS, time, minute, sec, setHandle,timeHandle, minHandle, secHandle, fstTHandle, fstMHandle, fstSHandle, total, setTotal, playAudio})=>{

    const [startState, setStartState] = useState(false);
    const [stopState, setStopState] = useState(false);

    const [current, setCurrent] = useState(0);
    
    const [percent, setPercent] = useState(0);

    const [firstStarted, setFirstStarted] = useState(true);
    const [cStop, setCStop] = useState(false);

    const [circleWidth, setCircleWidth] = useState(0);
    
    
    // const [loopState, setLoopState] = useState(true);
    // const [startPoint, setStartPoint] = useState(0);

    // const [sound, setSound] = useState(null);

    // useLayoutEffect(()=>{
    //     var sd = new Sound('ring.mp3', Sound.MAIN_BUNDLE, (e)=>{
    //         if(e){
    //             console.log(e);
    //             return;
    //         }
    //     })
    //     setSound(sd);
    //     new Sound()
    // }, []);

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
            // setCurrent(1);
        }

        if(current === 0){
            setCurrent((current)=> current + 1);
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

    const onLayout = (event) => {
        const {height} = event.nativeEvent.layout;
        setCircleWidth(height);
    }
    
    useEffect(()=>{
        if(startState && !stopState){
            interval.current = setInterval(secMinus, 1000);
        } else if(startState && stopState) {
            clearInterval(interval.current);
        }

        if(!startState){
            // minus();
            // playAudio();
            init();
            // restHanle(true);
        }

        if(cStop){
            // SoundPlayer.playSoundFile('ring', 'mp3');
            // sound.play();
            playAudio();
            setCStop(false);
            minus();
            init();
            // setStartState(false);
            restHanle(true);
        }

        //startState가 핵심키
        //loopState를 만들어서 이용해보자
        if(time === 0 && minute === 0 && sec === 0){
            // sound.play();
            playAudio();
            // SoundPlayer.playSoundFile('ring', 'mp3');
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
                            timeHandle(parseInt(value));
                            fstTHandle(parseInt(value));
                        }} style={{paddingRight: 7, borderColor: '#EBEBEB', borderRightWidth: 2, textAlign:"center",  paddingLeft: 3}}/>
                        <TextInput style={styles.text} placeholder="분" keyboardType='numeric' onChangeText={(value)=> {
                            minHandle(parseInt(value));
                            fstMHandle(parseInt(value));
                        }} style={{paddingRight: 3, borderColor: '#EBEBEB', borderRightWidth: 2, paddingLeft: 10}}/>
                        <TextInput style={styles.text} placeholder="초" keyboardType="numeric" onChangeText={(value)=> {
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
                            playAudio();
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