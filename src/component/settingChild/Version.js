import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default ({style}) => {
    return(
        <View style={[style]}>
            <View style={{flexDirection: 'row'}}>
                <AntDesign name="infocirlceo" size={24} color="black" />
                <Text style={styles.font}>앱 버전 v1.0.0</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    font: {
        fontFamily: 'OTWelcomeRA',
        fontSize: 20,
        marginLeft: 15
    },
})