import React from 'react';
import { View, StyleSheet } from 'react-native';
import TodoList from './TodoChild/TodoList';

export default ()=>{
    const data = ['안녕하세요?', '저는', '트위치에서', '스트리머를 하고 있는', '케인입니다.'];
    const date = new Date();
    return(
        <View style={styles.container}>
            <TodoList data={data} date={date}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff'
    }
});