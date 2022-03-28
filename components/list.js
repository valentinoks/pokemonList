import React, { useEffect, useState } from 'react';
import { 
    ActivityIndicator, 
    FlatList, 
    StyleSheet, 
    StatusBar, 
    Text, 
    Platform, 
    View, 
    Image, 
    TouchableOpacity, 
    SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default List = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [ pageCurrent, setPageCurrent ] = useState(1);
    const [count, setCount] = useState(0);

    const getPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(pageCurrent - 1) * 10}`);
            const json = await response.json();
            for (const ele of json.results) {
                const result = await AsyncStorage.getItem(ele.name);
                if (result) {
                    ele.total = parseInt(result); 
                } else {
                    ele.total = 0;
                }
            }
            setData(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPokemon();
    });

    const handlePreviousPage = () => {
        // Do this so your page can't go negative
        setPageCurrent(pageCurrent - 1<1?1:pageCurrent - 1);
    }

    const handleNextPage = () => {
        setPageCurrent(pageCurrent + 1>1126?1126:pageCurrent + 1); 
    }
    
    return (
        <View style={styles.container}>
            {/* Logo and Slogan */}
            <SafeAreaView style={styles.logo}>
                <TouchableOpacity onPress={() => console.log("Clicked the button")}>
                    <Image source={require('../assets/pokemon-logo.png')} />
                </TouchableOpacity>
                <Text>{'\n'}{'\n'}See if you can catch 'em all!</Text>
            </SafeAreaView>
            {/* My List */}
            <SafeAreaView>
                <TouchableOpacity onPress={() => navigation.navigate('MyList')}>
                    <Text style={styles.text}>My List</Text>
                </TouchableOpacity>
            </SafeAreaView>
            {/* Pagination Header */}
            <SafeAreaView style={styles.headerStyle}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => handlePreviousPage()}>
                        <Image source={require('../assets/left-arrow.png')} style={{width: 14, height: 25, marginTop: 2}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => handleNextPage()}>
                        <Image source={require('../assets/right-arrow.png')} style={{width: 14, height: 25}}/>
                    </TouchableOpacity>
                </View>
                    <Text style={{}}>{pageCurrent} of 1126</Text>
            </SafeAreaView>
            {/* List */}
            <SafeAreaView>
                { isLoading ? <ActivityIndicator/> : (
                    <FlatList
                        data={data}
                        keyExtractor={({ id }, index) => index}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                                item: item
                            })}>
                                <Text style={styles.text}>{item.name} Total: {item.total}{'\n'}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    logo: {
        alignItems: 'center',
        paddingBottom: 20
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 20,
    },
    headerLeft: {
        paddingLeft: 10,
        paddingRight: 20
    },
    headerRight: {
        paddingLeft: 20,
        paddingRight: 20
    },
    list: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 25
    },
    navItem: {
        alignItems: "center",
        padding: 10
    },
    text: {
        fontSize: 18
    }
});