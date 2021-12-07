import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default ({style, navigation}) => {
    return(
        <TouchableOpacity onPress={()=> navigation.navigate('사용법')} style={[style]}>
            <View style={{flexDirection: 'row'}}>
                <FontAwesome5 name="readme" size={24} color="black" />
                <Text style={styles.font}>사용법</Text>
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