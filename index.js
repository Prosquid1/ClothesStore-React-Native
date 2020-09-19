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
    Alert,
    TouchableOpacity,
    View
} from 'react-native';

const RNHome = () => {

    const [products, setProducts] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const eventEmitter = new NativeEventEmitter(HomeBridge);

    const fetchData = useCallback(() => HomeBridge.fetchData(), [
        HomeBridge
    ]);

    const onAddToWishListPressed = useCallback((product) => HomeBridge.addToWishList(product), [
        HomeBridge
    ]);

    const onRemoveFromWishListPressed = useCallback((product) => HomeBridge.removeFromWishList(product), [
        HomeBridge
    ]);


    useEffect(() => {
        eventEmitter.addListener('onSuccess', newProducts => {
            setRefreshing(false)
            setProducts(newProducts)
        });
        eventEmitter.addListener('onError', errorMessage => {
            setRefreshing(false)
            Alert.alert("Error", errorMessage)
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
                <Text style={styles.productCategory}>{item.category}</Text> 
                <View style={styles.priceContainer}><Text style={styles.productPrice}>{item.price}</Text>
                {item.oldPrice && (<Text style={styles.productOldPrice}>{`(${item.oldPrice})`}</Text>)}
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.starButton} onPress={ () => onRemoveFromWishListPressed(item)}/>
                <TouchableOpacity style={styles.cartButton} onPress={ () => onAddToWishListPressed(item)}/>
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
        height: 57.5,
        width: 57.5,
        borderRadius: 30,
        backgroundColor: 'red'
    },
    productName: {
        fontWeight: "300",
        color: 'black',
        flexShrink: 1,
        fontSize: 15.0
    },
    productCategory: {
        color: 'gray',
        flexShrink: 1,
        fontSize: 14.0
    },
    productPrice: {
        color: 'black',
        flexShrink: 1,
        fontSize: 13.0
    },
    productOldPrice: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: '#1F2124',
        flexShrink: 1,
        marginLeft: 5,
        fontSize: 13.0
    },
    priceContainer: {
        flexDirection: 'row'
    },
    textContainer: {
        flexGrow: 1,
        marginVertical: 4,
        marginHorizontal: 11.4,
        alignItems: 'flex-start',
        flexDirection: 'column'    
    },
    starButton: {
        backgroundColor: 'gold',
        height: 16,
        width: 16   
    },
    cartButton: {
        backgroundColor: 'brown',
        marginTop: 10,
        height: 20,
        width: 20   
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'center'

    },
    line: {
        height: 72,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingEnd: 20,
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: 'grey',
    }
});

// Module name
AppRegistry.registerComponent('RNHome', () => RNHome);