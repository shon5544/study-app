import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default ({style}) => {
    return(
        <TouchableOpacity style={[style]}>
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