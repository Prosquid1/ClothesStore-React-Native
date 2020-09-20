import React from "react";

import { Text, Image, TouchableOpacity, View } from "react-native";

import PropTypes from "prop-types";
import styles from "./styles";

const demoColors = ["#D65650", "#3530D1", "#50369D", "#D65650"];

const starSelectedIcon = require("../../../assets/star_selected_icon.png");
const starDeselectedIcon = require("../../../assets/star_deselected_icon.png");
const cartIcon = require("../../../ios/ClothesStore/App/Assets.xcassets/cart_icon.imageset/cart_icon.png");

const ProductItemView = ({
  product,
  index,
  onAddToWishListPressed,
  isItemInWishList,
  onRemoveFromWishListPressed,
  onAddToCartPressed
}) => {
  return (
    <View style={styles.cellRow}>
      <View style={[styles.image, { backgroundColor: demoColors[index] }]}>
        {product.stock === 0 && (
          <Text style={styles.soldOutText}>SOLD OUT</Text>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productCategory}>{product.category}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{`£${product.price}`}</Text>
          {product.oldPrice && (
            <Text
              style={styles.productOldPrice}
            >{`(£${product.oldPrice})`}</Text>
          )}
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() =>
            isItemInWishList(product.id)
              ? onRemoveFromWishListPressed(product)
              : onAddToWishListPressed(product)
          }
        >
          <Image
            style={styles.starButton}
            source={
              isItemInWishList(product.id)
                ? starSelectedIcon
                : starDeselectedIcon
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onAddToCartPressed(product)}>
          <Image
            style={[
              styles.cartButton,
              { opacity: product.stock === 0 ? 0.34 : 1 }
            ]}
            source={cartIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

ProductItemView.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onAddToWishListPressed: PropTypes.func.isRequired,
  isItemInWishList: PropTypes.func.isRequired,
  onRemoveFromWishListPressed: PropTypes.func.isRequired,
  onAddToCartPressed: PropTypes.func.isRequired
};

export default ProductItemView;
