import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default () => {
    return(
        <ScrollView style={styles.container}>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>1. 할 일</Text>
                <Image source={require('../../../../img/할일없음.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>할 일을 정리하는 습관을 길러보는건 어떨까요? 할 일 탭에선 할 일을 저장하고 관리할 수 있습니다. 우측 상단의 연필을 통해 할 일을 추가할 수 있습니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>2. 할 일 추가</Text>
                <Image source={require('../../../../img/할일2.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>할 일 작성 탭에서 할 일을 추가합니다. 날짜는 기본적으로 현재 날짜가 들어가고 이는 조절할 수 있습니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>3. 캘린더</Text>
                <Image source={require('../../../../img/할일3.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>할 일 탭에서 작은 캘린더의 아래 부분을 아래로 당기면 큰 캘린더를 볼 수 있습니다. 할 일이 있는 날짜엔 점이 찍혀있습니다. 위 아래로 슬라이드를 할 수 있고 날짜를 탭하면 해당 날짜의 일정을 볼 수 있습니다. 일정이 없다면 아무것도 나오지 않습니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>4. 버튼</Text>
                <Image source={require('../../../../img/버튼.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>왼쪽의 체크버튼으로 할일을 완료처리 할 수 있습니다. 이 상태에서 수정을 불가능합니다. 다시 탭해 완료 해제 할 수 있습니다. 오른쪽의 휴지통으로 할 일을 지워버릴 수 있습니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>5. 수정</Text>
                <Image source={require('../../../../img/할일수정.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>완료 되지 않은 할 일을 탭하면 수정할 수 있습니다. 원래 써져 있는 내용을 탭하면 수정할 내용을 적을 수 있고 박스를 한번 더 탭하면 저장됩니다.</Text>
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
        height: 430,
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