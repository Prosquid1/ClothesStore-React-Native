import React, { useCallback, useState, useEffect } from "react";

import {
  Alert,
  FlatList,
  RefreshControl,
  NativeEventEmitter,
  View
} from "react-native";
import HomeBridge from "../../bridges";

import ProductItemView from "./ProductItem";

const RNHome = () => {
  const [products, setProducts] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const eventEmitter = new NativeEventEmitter(HomeBridge);

  const fetchData = useCallback(() => HomeBridge.fetchData(), []);

  const [wishListIds, setWishListIds] = useState([]);

  const onAddToWishListPressed = useCallback(
    product => HomeBridge.addToWishList(product),
    []
  );

  const onRemoveFromWishListPressed = useCallback(
    product => HomeBridge.removeFromWishList(product),
    []
  );

  const onAddToCartPressed = useCallback(
    product => HomeBridge.addToCart(product.id),
    []
  );

  const isItemInWishList = useCallback(id => wishListIds.indexOf(id) > -1, [
    wishListIds
  ]);

  useEffect(() => {
    eventEmitter.addListener("onDataRetrieved", newProducts => {
      setRefreshing(false);
      setProducts(newProducts);
    });
    eventEmitter.addListener("onError", errorMessage => {
      setRefreshing(false);
      Alert.alert("Error", errorMessage);
    });

    eventEmitter.addListener("onSuccess", errorMessage => {
      Alert.alert("Success!", errorMessage);
    });

    eventEmitter.addListener("onSetWishListIds", ids => {
      setWishListIds(ids);
    });

    setRefreshing(true);
    fetchData();

    // This hook is supposed to run just once, on startup.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProductItem = (product, index) => {
    return (
      <ProductItemView
        product={product}
        index={index}
        onAddToWishListPressed={onAddToWishListPressed}
        isItemInWishList={isItemInWishList}
        onRemoveFromWishListPressed={onRemoveFromWishListPressed}
        onAddToCartPressed={onAddToCartPressed}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={({ item, index }) => renderProductItem(item, index)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />
    </View>
  );
};

export default RNHome;
