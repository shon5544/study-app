import React from 'react';
import { View, StyleSheet } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import NoteBlock from './NoteBlock';

export default ({noteList})=>{

    return(
        <View style={styles.container}>
            <MasonryList
                style={{alignSelf: 'stretch'}}
                contentContainerStyle={{
                    paddingLeft: 10,
                    alignSelf: 'stretch',
                }}
                numColumns={2}
                data={noteList}
                renderItem={NoteBlock}
            />
            {/* <ScrollView> */}
                
                {/* {noteList.map((value, index)=>(
                    // <View style={styles.block} key={index}>
                    //     <Text style={[styles.text]}>{value.title === null ? '제목 없음': value.title}</Text>
                    //     <Text style={[styles.text]}>{value.tag === null ? '제목 없음': value.tag}</Text>
                    //     <Text style={[styles.text]}>{value.content === null ? '제목 없음': value.content}</Text>
                    // </View>
                ))} */}
            {/* </ScrollView> */}
        </View>
    )

    // 노트 정보를 가져와야 하는 상황에서 우리는 AsyncStorage를 사용해야하는데 이게 이름처럼 비동기 함수임.
    // 완료 버튼 클릭시의 이벤트를 바인드하기전 우리는 노트의 정보가 미리 필요한 상황이었는데 useLayoutEffect로 렌더전에 노트정보를 가져와야함.
    // 이렇게 했다면 렌더 후의 useEffect에서 이벤트 함수를 등록할때 정상적으로 작동하게됨.
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    text: {
        fontFamily: 'OTWelcomeRA'
    },
    block:{
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginBottom: 10,
        width: "50%",
    },
});