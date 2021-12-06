import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default ({item, pressCheck, deleteItem, editItem}) => {
    const [isChecked, setIsChecked] = useState(item.isDone);
    const [isShown, setIsShown] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState('');

    return(
        <>
        {!isChecked ? 
            <>
            {isShown ?
                <>
                {!isEdit ? 
                    <>
                        <TouchableOpacity onPress={()=> setIsEdit(true)} style={styles.contentContainer}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.font, styles.time]}>{item.time}</Text>
                                <TouchableOpacity onPress={()=> {
                                    pressCheck(item);
                                    setIsChecked(true);
                                }} style={styles.checkBox}>
                                    <AntDesign name="checkcircleo" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{
                                    deleteItem(item);
                                    setIsShown(false);
                                }} style={styles.trashCan}>
                                    <FontAwesome name="trash-o" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.font}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                :
                    <>
                        <TouchableOpacity onPress={()=>{
                            editItem(value, item);
                            setIsEdit(false);
                        }} style={styles.contentContainer}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.font, styles.time]}>{item.time}</Text>
                            </View>
                            <View>
                                <TextInput onChangeText={(text) => setValue(text)} style={[styles.font, {opacity: 0.5}]} placeholder={item.name}/>
                            </View>
                        </TouchableOpacity>
                    </>
                }

                </>
                : <></>}
            </>
            :
            <>
                {isShown ?
                <>
                <View style={styles.contentContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.font, styles.time]}>{item.time}</Text>
                        <TouchableOpacity onPress={()=> {
                            pressCheck(item);
                            setIsChecked(false);
                        }} style={styles.checkBox}>
                            <AntDesign name="checkcircle" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            deleteItem(item);
                            setIsShown(false);
                        }} style={styles.trashCan}>
                            <FontAwesome name="trash-o" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[styles.font, styles.checkedText]}>{item.name}</Text>
                    </View>
                </View>
                </>
                :<></>}
            </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    contentContainer:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor: '#ffffff',
        marginTop: 20,
        marginBottom: 10,
        padding: 20,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center'
    },
    font: {
        fontFamily: 'OTWelcomeRA',
        color: '#000000'
    },
    selectedFont:{
        color: "#ffffff"
    },
    touchable:{
        padding: 10,
        borderRadius: 40
    },
    selectedTouch:{
        backgroundColor: '#4285F4'
    },
    time:{
        fontSize: 18,
        marginBottom: 16,
        opacity: 0.5,
    },
    checkBox:{
        position: 'absolute',
        right: 33
    },
    checkedText:{
        textDecorationLine: 'line-through',
        opacity: 0.3
    },
    trashCan:{
        position: 'absolute',
        right: 0
    }
});