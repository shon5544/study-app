import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default ({style, navigation}) => {
    return(
        <TouchableOpacity onPress={()=>navigation.navigate('집중 탭 사용법')} style={[style]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="timer" size={24} color="black" />
                <Text style={styles.font}>집중 탭</Text>
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