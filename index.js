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

    const renderProduct = useCallback((item) => {
        return (
        <View style={styles.line}>
            <View style={styles.image}/>
            <View style={styles.textContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productName}>{item.category}</Text>
                <View style={styles.priceContainer}><Text style={styles.productName}>{item.price}</Text>
                {item.oldPrice && (<Text style={styles.oldPrice}>{`(${item.oldPrice})`}</Text>)}
                </View>
            </View>
        </View>)
    });

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={products}
                renderItem={({ item }) => renderProduct(item)}
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
    image: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'red'
    },
    productName: {
        textAlign: 'center'
    },
    priceContainer: {
        flexDirection: 'row'
    },
    oldPrice: {
        marginLeft: 5
    },
    textContainer: {
        flex: 0.5,
        marginLeft: 16,
        alignItems: 'flex-start',
        flexDirection: 'column'
        
    },
    line: {
        height: 60,
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: 'grey',
    }
});

// Module name
AppRegistry.registerComponent('RNHome', () => RNHome);