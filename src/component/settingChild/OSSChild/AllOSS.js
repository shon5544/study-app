import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import oss from './oss';

export default ({navigation}) =>{
    return(
        <ScrollView style={{backgroundColor: '#ffffff'}}>
            {oss.map((value, index)=>(
                <TouchableOpacity key={index} onPress={()=> navigation.navigate('라이선스 자세히 보기', {
                    name: value.name, 
                    license: value.license, 
                    url: value.url,
                    authors: value.authors,
                    artifact: value.artifact,
                    })} style={[styles.box]}>
                    <View style={{flexDirection: 'row'}}>
                        <FontAwesome5 name="sourcetree" size={24} color="black" />
                        <Text style={styles.font}>{value.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    box:{
        padding: 30,
        borderBottomWidth: 1,
        borderColor: '#EBEBEB'
    },
    font: {
        fontFamily: 'OTWelcomeRA',
        fontSize: 20,
        marginLeft: 15
    },
})