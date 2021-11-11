import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({item, navigation})=>{
    const [index, setIndex] = useState(-1);
    const [tagList, setTagList] = useState([]);
    const [color, setColor] = useState('#ebebeb');

    async function getTags(){
        await AsyncStorage.getItem('Tag').then((value)=>{
            if(value !== null && value !== undefined){
                const parsedData = JSON.parse(value);
                // console.log(parsedData);
                setTagList(parsedData);
                // return parsedData;
            }
        })

        if(tagList.length > 0){
            for(let i=0; i <= tagList.length; i++){
                if(tagList[i].tag === item.tag){
                    setColor(tagList[i].color);
                    break
                }
            }
        }
    }

    useEffect(()=>{
        // console.log(item);
        // getTags().then(()=>{
        //     // console.log(tagList);
            
        // })
        getTags();
    },[tagList]);

    return(
        <TouchableOpacity  key={item.title} style={styles.block} onPress={()=> navigation.navigate('자세히', {
            title: item.title,
            tag: item.tag,
            content: item.content,
            tagColor: color
        })}>
            <View>
                <Text style={[styles.text, styles.title]}>{item.title.length > 8 ? item.title.slice(0,8) + '..' : item.title}</Text>
                <View style={styles.tag}>
                    <View style={[styles.dot, {backgroundColor: color}]}></View>
                    <Text style={[styles.text]}>{item.tag.length > 5? item.tag.slice(0, 3) + '..': item.tag}</Text>
                </View>
                <Text style={[styles.text]}>{item.content.length > 150 ? item.content.slice(0,150) + '..' : item.content}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'OTWelcomeRA'
    },
    block:{
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginBottom: 10,
        marginLeft: 10,
        width: '89.5%'
    },
    title:{
        fontSize: 20,
        marginBottom: 7
    },
    tag:{
        borderColor: '#ebebeb',
        borderWidth: 2,
        alignSelf: 'flex-start',
        padding: 10,
        fontSize: 13,
        borderRadius: 7,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    dot:{
        width: 10,
        height: 10,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: 5,
    }
});