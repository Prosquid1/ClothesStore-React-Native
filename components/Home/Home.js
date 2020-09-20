import React, {
    useCallback,
    useState,
    useEffect,
} from 'react';

import HomeBridge from '../../bridges';

import {
    Alert,
    FlatList,
    RefreshControl,
    NativeEventEmitter,
    View
} from 'react-native';

import ProductItemView from './ProductItem'

const RNHome = () => {

    const [products, setProducts] = useState([])

    const [refreshing, setRefreshing] = useState(false)
    const eventEmitter = new NativeEventEmitter(HomeBridge);

    const fetchData = useCallback(() => HomeBridge.fetchData(), [
        HomeBridge
    ]);
    
    const [wishListIds, setWishListIds] = useState([])

    const onAddToWishListPressed = useCallback((product) => HomeBridge.addToWishList(product), [
        HomeBridge
    ]);
    
    const onRemoveFromWishListPressed = useCallback((product) => HomeBridge.removeFromWishList(product), [
        HomeBridge
    ]);
    
    const onAddToCartPressed = useCallback((product) => HomeBridge.addToCart(product.id), [
        HomeBridge
    ]);

    const isItemInWishList = useCallback((id) => wishListIds.indexOf(id) > -1, [wishListIds]);

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

    const renderProductItem = (product, index) => {
        return(
            <ProductItemView
            product={product}
            index={index}
            onAddToWishListPressed={onAddToWishListPressed}
            isItemInWishList={isItemInWishList}
            onRemoveFromWishListPressed={onRemoveFromWishListPressed}
            onAddToCartPressed={onAddToCartPressed}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={products}
                renderItem={({ item, index }) => renderProductItem(item, index)}
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

export default RNHome