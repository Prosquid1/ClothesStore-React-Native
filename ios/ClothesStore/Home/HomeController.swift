//
//  HomeController.swift
//
//  Created by Oyeleke Okiki on 7/13/20.
//  Copyright © 2020 Personal. All rights reserved.
//

import UIKit
import React

class HomeController: BaseViewController {

    let reactNativeEmitter = HomeBridge()

    private lazy var rnRootView: RCTRootView = {
        let jsCodeLocation = Bundle.main.url(forResource: "main", withExtension: "jsbundle")!
        return RCTRootView(
            bundleURL: jsCodeLocation,
            moduleName: "RNHome",
            initialProperties: nil,
            launchOptions: nil
        )
    }()

    private var homePresenter: DataSourcePresenter<Product>!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        homePresenter = DataSourcePresenter(dataControllerDelegate: nil, cartUpdateDelegate: self)

        self.view = rnRootView

    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.navigationBar.isTranslucent = false
        self.tabBarController?.title = "Home"
    }

    func fetchData() {
        guard
            let url = Bundle.main.url(forResource: "RNHomeDummyData", withExtension: "json"),
            let data = try? Data(contentsOf: url),
            let products = try? JSONSerialization.jsonObject(with: data, options: []) as? [[String: Any]]
        else {
            reactNativeEmitter.onErrorOccured(reason: "Unable to decode data!")
            return
        }

        reactNativeEmitter.updateWishList(ids: homePresenter.wishlistManager.getWishListIds())
        reactNativeEmitter.onDataRetrieved(data: products)
    }

    func addToCart(productId: Int) {
        homePresenter.addToCart(id: productId)
    }

    func addToWishList(productDict: [String: Any]) {
        if let deserializedProduct = Product.fromDictionary(dict: productDict) {
            homePresenter.addToWishList(product: deserializedProduct)
            reactNativeEmitter.updateWishList(ids: homePresenter.wishlistManager.getWishListIds())
        } else {
            reactNativeEmitter.onErrorOccured(reason: "Unable to add product (Err -40)!")
        }
    }

    func removeFromWishList(productDict: [String: Any]) {
        if let deserializedProduct = Product.fromDictionary(dict: productDict) {
            homePresenter.removeFromWishList(product: deserializedProduct)
            reactNativeEmitter.updateWishList(ids: homePresenter.wishlistManager.getWishListIds())
        } else {
            reactNativeEmitter.onErrorOccured(reason: "Unable to remove product (Err -41)!")
        }
    }
}

extension HomeController: CartUpdateDelegate {
    func onCartUpdateSuccess(message: String) {
        reactNativeEmitter.onSuccessComplete(message: message)
    }

    func onCartUpdateFailed(reason: String) {
        reactNativeEmitter.onErrorOccured(reason: reason)
    }
}
