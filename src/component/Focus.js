import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Rest from './FocusChild/Rest';
import Timer from './FocusChild/Timer';
import { Audio } from 'expo-av';



export default ({ navigation }) => {

    // 아니 주석 없이 코딩하니까 여기 스테이트들이 다 뭐에 썼던건지 하나도 기억이 안나잖아 ㅅㅂ
    // 다음부터는 주석없이 코딩하지 말자..
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
    const [sound, setSound] = useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            require('../Sounds/ring.mp3')
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
    }

    // 굳이 왜 이런 노가다를 뛰었는지 모르겠다. 이때 정신이 없었나보다.
    function totalHandle(value) {
        setTotal(value);
    }

    function restToParent(data) {
        setRest(data);
        setAutoStart(true);
    }

    function timerToParent(data) {
        setRest(data);
    }

    function timeHandle(value) {
        setTime(value);
    }

    function minHandle(value) {
        setMinute(value);
    }

    function secHandle(value) {
        setSec(value);
    }

    function setHandle(value) {
        setSet(value);
    }

    function fstTHandle(value) {
        setFirstT(value);
    }

    function fstMHandle(value) {
        setFirstM(value);
    }

    function fstSHandle(value) {
        setFirstS(value);
    }

    return (
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
                    playAudio={playSound}
                />
                :
                <Rest callback={restToParent} playAudio={playSound} />
            }
        </>
    )
}

