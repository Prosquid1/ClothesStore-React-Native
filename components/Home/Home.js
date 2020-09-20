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

const RNHome = () => {

    const [products, setProducts] = useState([])

    const [refreshing, setRefreshing] = useState(false)
    const eventEmitter = new NativeEventEmitter(HomeBridge);

    const fetchData = useCallback(() => HomeBridge.fetchData(), [
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

export default RNHome