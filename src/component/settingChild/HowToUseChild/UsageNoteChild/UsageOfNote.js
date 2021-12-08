import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default () => {
    return(
        <ScrollView style={styles.container}>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>1. 노트</Text>
                <Image source={require('../../../../img/빈노트.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>공부가 끝나고 그 시간에 공부한 것을 바로 정리하면 효과가 좋습니다. 노트 탭에서는 공부한 내용을 정리하거나 조회할 수 있습니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>2. 노트 쓰기</Text>
                <Image source={require('../../../../img/노트3.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>노트 탭에서 우측 상단의 연필을 누르면 복습노트 탭으로 갑니다. 공부했던 내용 혹은 정리할 내용의 제목을 적고, 카테고리를 적은뒤 공부했던 내용을 적은 후 완료 버튼을 누르면 노트 내용을 저장할 수 있습니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>3. 노트가 있을 때</Text>
                <Image source={require('../../../../img/노트1.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>저장된 노트가 하나라도 있을 시 정리한 내용이 적혀있는 박스가 생깁니다. 박스를 탭할 시 정리한 내용을 자세히 확인할 수 있는 화면으로 넘어갑니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>4. 자세히 보기</Text>
                <Image source={require('../../../../img/노트2.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>'자세히' 탭에선 노트 탭 박스에서 생략된 글들을 모두 볼 수 있습니다. 우측 상단의 휴지통을 누르면 노트를 삭제할 수 있습니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    font: {
        fontFamily: 'OTWelcomeRA',
    },
    img: {
        width: 210,
        height: 410,
        alignSelf: 'center',
        marginTop: 50
    },
    textBox:{
        width: '80%',
        marginTop: 10,
        alignSelf: 'center',
        marginTop: 30
    }
})