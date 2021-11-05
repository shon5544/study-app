import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default ({noteList})=>{


    return(
        <View style={styles.container}>
            <ScrollView>
                {noteList.map((value, index)=>(
                    <View key={index}>
                        <Text>제목{value.title === null ? '제목 없음': value.title}</Text>
                        <Text>태그{value.tag === null ? '제목 없음': value.tag}</Text>
                        <Text>내용{value.content === null ? '제목 없음': value.content}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});