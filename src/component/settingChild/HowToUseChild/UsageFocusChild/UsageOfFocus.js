import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default () => {
    return(
        <ScrollView style={styles.container}>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>1. 집중 타이머</Text>
                <Image source={require('../../../../img/집중1.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>뽀모도로 공부법을 기반으로 합니다. 원하는 시간을 적고 세트를 추가하거나 감소하여 사용합니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>2. 시간 조절</Text>
                <Image source={require('../../../../img/집중체크1.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>25분이 적혀있는 원 아래의 시간 | 분 | 초를 누르면 각 시간 단위에 해당하는 값을 조절할 수 있습니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>3. 세트 조절</Text>
                <Image source={require('../../../../img/집중체크2.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>세트가 적혀있는 박스의 양 옆 화살표를 누르면 세트를 조절할 수 있습니다. 세트가 2이상일 경우, 집중이 한 타임 끝나면 휴식 탭으로 들어갑니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>4. 휴식 탭</Text>
                <Image source={require('../../../../img/휴식.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>한 세트가 끝나면 휴식 탭으로 들어갑니다. 기본 휴식 시간은 5분입니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>5. 시간 조절</Text>
                <Image source={require('../../../../img/휴식체크1.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>양 옆의 숫자를 누르면 시간을 조절할 수 있습니다. 누르면 1분씩 추가되거나 감소합니다.</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.font}></Text>
                </View>
            </View>
            <View>
                <Text style={[styles.font, {fontSize: 20, alignSelf: 'center', marginTop: 40}]}>6. 버킷하기</Text>
                <Image source={require('../../../../img/휴식체크2.jpg')} style={styles.img}/>
                <View style={styles.textBox}>
                    <Text style={styles.font}>버킷하기를 누르면 남은 시간과 관계없이 바로 휴식을 종료하고 다음 세트를 시작합니다.</Text>
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