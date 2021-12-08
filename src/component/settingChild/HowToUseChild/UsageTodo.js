import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default ({style, navigation}) => {
    return(
        <TouchableOpacity style={[style]} onPress={()=>navigation.navigate('할 일 탭 사용법')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons name="playlist-edit" size={26} color="black" />
                <Text style={styles.font}>할 일 탭</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'OTWelcomeRA',
        fontSize: 20,
        marginLeft: 15
    },
})