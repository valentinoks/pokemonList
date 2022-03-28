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

export default MyList = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMyPokemon = async () => {
        try {
            let keys = await AsyncStorage.getAllKeys();
            let total = [];
            for (const ele of keys) {
                const result = await AsyncStorage.getItem(ele);
                if (result) {
                    total.push({
                        name: ele,
                        total: parseInt(result)
                    });
                }
            }
            setData(total);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMyPokemon();
    }, []);
    return(
        <View style={styles.container}>
             <SafeAreaView>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.navigate('List')}>
                        <Image source={require('../assets/left-arrow.png')} style={{width: 14, height: 25, marginTop: 2}}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <SafeAreaView style={styles.content}>
                <Text style={styles.title}>My Pokemon</Text>
                { isLoading ? <ActivityIndicator/> : (
                    <FlatList
                        data={data}
                        keyExtractor={({ id }, index) => index}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Text style={styles.text}>{item.name}  {item.total}{'\n'}</Text>
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
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 
    headerLeft: {
        padding: 35
    },
    content: {
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