import React, {
    useCallback,
    useState,
    useEffect,
} from 'react';

import HomeBridge from './bridges';

const starSelectedIcon = require('./assets/star_selected_icon.png');
const starDeselectedIcon = require('./assets/star_deselected_icon.png');
const cartIcon = require('./ios/ClothesStore/App/Assets.xcassets/cart_icon.imageset/cart_icon.png');

import {
    AppRegistry,
    StyleSheet,
    Text,
    Alert,
    FlatList,
    Image,
    RefreshControl,
    NativeEventEmitter,
    TouchableOpacity,
    View
} from 'react-native';

const RNHome = () => {

    const demoColors = ["#D65650", "#D65650", "#50369D", "#D65650"]
    const [products, setProducts] = useState([])

    const [wishListIds, setWishListIds] = useState([])
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

    const onAddToCartPressed = useCallback((product) => HomeBridge.addToCart(product.id), [
        HomeBridge
    ]);

    useEffect(() => {
        eventEmitter.addListener('onDataRetrieved', newProducts => {
            setRefreshing(false)
            setProducts(newProducts)
        });
        eventEmitter.addListener('onError', errorMessage => {
            setRefreshing(false)
            Alert.alert("Error", errorMessage)
        });

        eventEmitter.addListener('onSuccess', errorMessage => {
            Alert.alert("Success!", errorMessage)
        });

        eventEmitter.addListener('onSetWishListIds', ids => {
            setWishListIds(ids)
        });

        setRefreshing(true)
        fetchData()
    }, []);

    const isItemInWishList = useCallback((id) => wishListIds.indexOf(id) > -1, [wishListIds]);

    const renderProduct = useCallback((product, index) => {
        return (
            <View style={styles.cellRow}>
                <View style={[styles.image, { backgroundColor: demoColors[index] }]}>
                    {product.stock == 0 && <Text style={styles.soldOutText}>SOLD OUT</Text>}
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productCategory}>{product.category}</Text>
                    <View style={styles.priceContainer}><Text style={styles.productPrice}>{`£${product.price}`}</Text>
                        {product.oldPrice && (<Text style={styles.productOldPrice}>{`(£${product.oldPrice})`}</Text>)}
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => isItemInWishList(product.id) ? onRemoveFromWishListPressed(product) : onAddToWishListPressed(product)}>
                        <Image style={styles.starButton} source={isItemInWishList(product.id) ? starSelectedIcon : starDeselectedIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onAddToCartPressed(product)}>
                        <Image style={[styles.cartButton, {opacity: product.stock == 0 ? 0.34 : 1}]} source={cartIcon} />
                    </TouchableOpacity>
                </View>
            </View>)
    });

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={products}
                renderItem={({ item, index }) => renderProduct(item, index)}
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
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        backgroundColor: 'red'
    },
    productName: {
        fontWeight: "300",
        color: 'black',
        flexShrink: 1,
        fontSize: 14.6
    },
    productCategory: {
        color: 'gray',
        flexShrink: 1,
        marginVertical: 1.6,
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
    detailsContainer: {
        flexGrow: 1,
        marginVertical: 4,
        marginHorizontal: 11.4,
        flexDirection: 'column'
    },
    starButton: {
        height: 15,
        width: 15
    },
    cartButton: {
        marginTop: 12,
        height: 18,
        width: 18
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'center'

    },
    cellRow: {
        height: 72,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingEnd: 20.8,
        alignItems: 'center',
        borderWidth: 0.19,
        borderColor: '#DDD',
    },
    soldOutText: {
        color: 'white',
        transform: [{ rotate: '315deg' }],
        flexShrink: 1,
        fontSize: 13.0,
        textAlign: "center",
        fontWeight: "600",
    },
});

// Module name
AppRegistry.registerComponent('RNHome', () => RNHome);