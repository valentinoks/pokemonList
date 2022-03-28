import React, { useEffect, useState } from 'react';
import { 
    ActivityIndicator, 
    FlatList, 
    View, Text, 
    TouchableOpacity, 
    Image, 
    SafeAreaView, 
    StyleSheet, 
    StatusBar,
    Pressable,
    TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from '../components/list'

export default Detail = ({ navigation, route }) => {
    const { item } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [moveData, setMove] = useState([]);
    const [typeData, setType] = useState([]);
    const [count, setCount] = useState(0);
    const [nickname, setNickname] = useState('');

    const getPokemon = async () => {
        try {
            const response = await fetch(item.url);
            const json = await response.json();
            let moveNames = [];
            let typeNames = [];
            for (const ele of json.moves) {
                moveNames.push(ele.move.name)
            }
            for (const ele of json.types) {
                typeNames.push(ele.type.name)
            }
            setMove(moveNames);
            setType(typeNames);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPokemon();
    }, []);

    const catchMe = async () => {
        if (Math.random() >= 0.5) {
            setCount((c) => c + 1);
            setNickname
        }
        else alert('It got away!')
    }

    useEffect(() => {
        if (count !== 0) {
            AsyncStorage.setItem(item.name, `${count}`);
        }
    }, [count]);

    useEffect(() => {
        AsyncStorage.getItem(item.name).then((value) => {
            if (value) {
                setCount(parseInt(value));
            }
        });
    }, []);
    
    return(
        <View style={styles.container}>
            {/* Header*/}
            <SafeAreaView>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.navigate('List')}>
                        <Image source={require('../assets/left-arrow.png')} style={{width: 14, height: 25, marginTop: 2}}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {/* Counter */}
            <SafeAreaView>
                <TouchableOpacity onPress={() => catchMe()}>
                    <Text style={styles.catchButton}>Try to catch me! {count}</Text>
                </TouchableOpacity>
            </SafeAreaView>
            {/* Types */}
            <SafeAreaView style={styles.types}>
                <Text style={styles.title}>Types</Text>
                { isLoading ? <ActivityIndicator/> : (
                    <FlatList
                        data={typeData}
                        keyExtractor={({ id }, index) => index}
                        renderItem={({ item }) => (
                            <Text style={styles.text}>{item}{'\n'}</Text>
                        )}
                    />
                )}
            </SafeAreaView>
            {/* Types */}
            <SafeAreaView style={styles.types}>
                <Text style={styles.title}>Moves</Text>
                { isLoading ? <ActivityIndicator/> : (
                    <FlatList
                        data={moveData}
                        keyExtractor={({ id }, index) => index}
                        renderItem={({ item }) => (
                            <Text style={styles.text}>{item}{'\n'}</Text>
                        )}
                    />
                )}
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 
    headerLeft: {
        padding: 35
    },
    types: {
        justifyContent: 'center',
        paddingLeft: 50
    },
    text: {
        fontSize: 25
    },
    catchButton: {
        fontSize: 25,
        paddingLeft: 20
    },
    title: {
        fontSize: 35,
        paddingBottom: 15
    }
});