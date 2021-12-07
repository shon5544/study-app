import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default ({style}) => {
    const [on, setOn] = useState(true);

    return(
        <TouchableOpacity onPress={()=>setOn(!on)} style={[style]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="notifications-circle-outline" size={32} color="black" />
                <Text style={styles.font}>푸시 알림</Text>
                {on?
                <>
                    <Text style={[styles.font, {color: '#4285F4', position: 'absolute', right: 17}]}>ON</Text>
                </>
                : <>
                    <Text style={[styles.font, {color: 'black', position: 'absolute', right: 17}]}>OFF</Text>
                </>}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'OTWelcomeRA',
        fontSize: 20,
        marginLeft: 10
    },
})