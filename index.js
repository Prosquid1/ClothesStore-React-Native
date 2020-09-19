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
                <Text style={styles.productName}>{item.name}{item.name}{item.name}{item.name}{item.name}{item.name}{item.name}</Text>
                <Text style={styles.productName}>{item.category}{item.name}{item.name}{item.name}{item.name}{item.name}{item.name}</Text> 
                
                {/* {item.name}{item.name}{item.name}{item.name}{item.name}{item.name} */}

                <View style={styles.priceContainer}><Text style={styles.productName}>{item.price}</Text>
                {item.oldPrice && (<Text style={styles.oldPrice}>{`(${item.oldPrice})`}</Text>)}
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.favButton} onPress={ () => onAddToWishListPressed(item)}/>
                <TouchableOpacity style={styles.starButton} onPress={ () => onRemoveFromWishListPressed(item)}/>
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
        flexGrow: 1,
        width: '60%',
        backgroundColor: 'red',
        marginHorizontal: 16,
        flexGrow: 1,
        alignItems: 'flex-start',
        flexDirection: 'column'    
    },
    starButton: {
        backgroundColor: 'blue',
        height: 20,
        width: 20   
    },
    favButton: {
        backgroundColor: 'gold',
        height: 20,
        width: 20   
    },
    buttonsContainer: {
        width: 40,
        flexDirection: 'column',
        alignSelf: 'flex-end'

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