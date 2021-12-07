import React from 'react';
import { View, StyleSheet } from 'react-native';
import AllowPush from './settingChild/AllowPush';
import AllowWrite from './settingChild/AllowWrite';
import HowToUse from './settingChild/HowToUse';
import OSS from './settingChild/OSS';
import Version from './settingChild/Version';

export default ({navigation})=>{
    return(
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <Version style={style.topBox} />
            <OSS style={style.box} navigation={navigation} />
            <HowToUse style={style.box} navigation={navigation}/>
            <AllowPush style={style.box} />
            <AllowWrite style={style.box}/>
        </View>
    )
}


const style = StyleSheet.create({
    box:{
        padding: 30,
        borderBottomWidth: 1,
        borderColor: '#EBEBEB'
    },
    topBox:{
        padding: 30,
        borderWidth: 1,
        borderColor: '#EBEBEB',
    }
});