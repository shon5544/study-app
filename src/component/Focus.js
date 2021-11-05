import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
// import ProgressCircle from 'react-native-progress-circle';
import Rest from './FocusChild/Rest';
import Timer from './FocusChild/Timer';

export default ({navigation, route})=>{
    const [set, setSet] = useState(1);
    const [time, setTime] = useState(0);
    const [minute, setMinute] = useState(25);
    const [sec, setSec] = useState(0);
    const [firstT, setFirstT] = useState(time);
    const [firstM, setFirstM] = useState(minute);
    const [firstS, setFirstS] = useState(sec);
    const [rest, setRest] = useState(false);
    const [autoStart, setAutoStart] = useState(null);
    const [total, setTotal] = useState(0);

    function totalHandle(value){
        setTotal(value);
    }

    function restToParent(data){
        setRest(data);
        setAutoStart(true);
    }

    function timerToParent(data){
        setRest(data);
    }

    function timeHandle(value){
        setTime(value);
    }

    function minHandle(value){
        setMinute(value);
    }

    function secHandle(value){
        setSec(value);
    }

    function setHandle(value){
        setSet(value);
    }

    function fstTHandle(value){
        setFirstT(value);
    }

    function fstMHandle(value){
        setFirstM(value);
    }

    function fstSHandle(value){
        setFirstS(value);
    }

    return(
        <>
            {!rest ?
                <Timer
                set={set}
                start={autoStart} 
                restHanle={timerToParent} 
                time={time} 
                minute={minute} 
                sec={sec} 
                firstT={firstT}
                firstM={firstM}
                firstS={firstS}
                timeHandle={timeHandle}
                minHandle={minHandle}
                secHandle={secHandle}
                setHandle={setHandle}
                fstTHandle={fstTHandle}
                fstMHandle={fstMHandle}
                fstSHandle={fstSHandle}
                total={total}
                setTotal={totalHandle}
                />
            :
            <Rest callback={restToParent}/>
            }
        </>
    )
}

