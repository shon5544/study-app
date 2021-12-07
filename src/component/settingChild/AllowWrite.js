import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({style}) => {
    const [on, setOn] = useState(true);

    const saveOption = async (onOrOff) => {
        await AsyncStorage.setItem("Review", JSON.stringify(onOrOff));
    }

    const getOption = async () => {
        await AsyncStorage.getItem('Review').then((value) => {
            if(value){
                const parsedData = JSON.parse(value);
                setOn(parsedData);
            }
        })
    }

    useEffect(()=>{
        saveOption(on);
    }, [on]);

    useLayoutEffect(()=>{
        getOption();
    }, []);

    return(
        <TouchableOpacity onPress={()=>setOn(!on)} style={[style]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons name="pencil" size={28} color="black" />
                <Text style={styles.font}>집중 후 자동 복습노트</Text>
                {on?
                <>
                    <Text style={[styles.font, {color: '#4285F4', position: 'absolute', right: 17}]}>ON</Text>
                </>
                : <>
                    <Text style={[styles.font, {color: 'black', position: 'absolute', right: 17}]}>OFF</Text>
                </>}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'OTWelcomeRA',
        fontSize: 20,
        marginLeft: 16
    },
})