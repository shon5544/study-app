import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

export default ({style, navigation}) => {
    return(
        <TouchableOpacity style={[style]} onPress={()=>navigation.navigate('노트 탭 사용법')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <SimpleLineIcons name="notebook" size={19} color="black" />
                <Text style={styles.font}>노트 탭</Text>
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