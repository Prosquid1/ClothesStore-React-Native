import React, {
    useCallback,
    useState,
    useEffect
} from 'react';

import { NativeEventEmitter, FlatList, RefreshControl } from 'react-native';
import HomeBridge from './bridges';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

const RNHome = () => {

    const [products, setProducts] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const eventEmitter = new NativeEventEmitter(HomeBridge);

    const fetchData = useCallback(() => HomeBridge.fetchData(), [
        HomeBridge
    ]);


    useEffect(() => {
        eventEmitter.addListener('onSuccess', newProducts => {
            console.log(`New products ${newProducts}`);
            setRefreshing(false)
            setProducts(newProducts)
        });
        eventEmitter.addListener('onError', errorMessage => {
            setRefreshing(false)
            console.log(errorMessage);
        });

        setRefreshing(true)
        fetchData()
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={products}
                renderItem={({ item }) => <Text style={styles.line}>{item.name}</Text>}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={fetchData}
                    />
                }
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    line: {
        height: 50,
        paddingTop: 17,
        textAlign: 'center',
        backgroundColor: 'orange',
        borderWidth: 1,
        borderColor: 'purple',
    }
});

// Module name
AppRegistry.registerComponent('RNHome', () => RNHome);