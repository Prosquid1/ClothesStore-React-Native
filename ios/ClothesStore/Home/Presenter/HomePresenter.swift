//
//  swift
//  ClothesStore
//
//  Created by Oyeleke Okiki on 9/20/20.
//  Copyright © 2020 Personal. All rights reserved.
//

import Foundation

class HomePresenter: DataSourcePresenter<CartItem> {

    let reactNativeEmitter = HomeBridge()

    func fetchData() {
        guard
            let url = Bundle.main.url(forResource: "RNHomeDummyData", withExtension: "json"),
            let data = try? Data(contentsOf: url),
            let products = try? JSONSerialization.jsonObject(with: data, options: []) as? [[String: Any]]
        else {
            reactNativeEmitter.onErrorOccured(reason: "Unable to decode data!")
            return
        }

        reactNativeEmitter.updateWishList(ids: wishlistManager.getWishListIds())
        reactNativeEmitter.onDataRetrieved(data: products)
    }

    func addToCart(productId: Int) {
        addToCart(id: productId)
    }

    func addToWishList(productDict: [String: Any]) {
        if let deserializedProduct = Product.fromDictionary(dict: productDict) {
            addToWishList(product: deserializedProduct)
            reactNativeEmitter.updateWishList(ids: wishlistManager.getWishListIds())
        } else {
            reactNativeEmitter.onErrorOccured(reason: "Unable to add product (Err -40)!")
        }
    }

    func removeFromWishList(productDict: [String: Any]) {
        if let deserializedProduct = Product.fromDictionary(dict: productDict) {
            removeFromWishList(product: deserializedProduct)
            reactNativeEmitter.updateWishList(ids: wishlistManager.getWishListIds())
        } else {
            reactNativeEmitter.onErrorOccured(reason: "Unable to remove product (Err -41)!")
        }
    }

}
