import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import NoteBlock from './NoteBlock';

export default ({noteList, tagList ,navigation})=>{
    const [isExist, setIsExist] = useState(false);

    useEffect(()=>{
        if(noteList.length > 0){
            setIsExist(true);
        }
    }, [noteList]);

    return(
        <>
        {isExist?
            <View style={styles.container}>
                <MasonryList
                numColumns={2}
                renderItem={({item}) => <NoteBlock key={item.id} item={item} tagList={tagList} navigation={navigation}/>}
                onEndReachedThreshold={0.1}
                keyPrefix={"0"}
                // keyExtractor={(item, index)=> console.log(index)}
                data={noteList.reverse()}
                keyExtractor={(item, index) => index.toString()}
                style={{alignSelf: 'stretch'}}
                contentContainerStyle={{
                    paddingTop: 15
                }}
                />
            </View>
        :
            <View style={[styles.container, {justifyContent: 'center'}]}>
                <Text style={[styles.text, {opacity: 0.3, fontSize: 20, marginBottom: 30}]}>노트에 적힌 글이 없어요!</Text>
            </View>
        }
        </>
    )

    // 노트 정보를 가져와야 하는 상황에서 우리는 AsyncStorage를 사용해야하는데 이게 이름처럼 비동기 함수임.
    // 완료 버튼 클릭시의 이벤트를 바인드하기전 우리는 노트의 정보가 미리 필요한 상황이었는데 useLayoutEffect로 렌더전에 노트정보를 가져와야함.
    // 이렇게 했다면 렌더 후의 useEffect에서 이벤트 함수를 등록할때 정상적으로 작동하게됨.
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        // paddingTop: 10
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