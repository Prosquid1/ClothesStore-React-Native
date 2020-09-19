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
        let jsCodeLocation = URL(string: "http://localhost:8081/index.bundle?platform=ios")!
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
        homePresenter = DataSourcePresenter(dataControllerDelegate: self,
                                            cartUpdateDelegate: self)

        self.view = rnRootView

    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.tabBarController?.title = "Home"
    }

    func fetchData() {
        let decoder = JSONDecoder()
        guard
            let url = Bundle.main.url(forResource: "RNHomeDummyData", withExtension: "json"),
            let data = try? Data(contentsOf: url),
            let products = try? JSONSerialization.jsonObject(with: data, options: []) as? [[String: Any]]
        else {
            reactNativeEmitter.onErrorOccured(reason: "Unable to decode data!")
            return
        }
        reactNativeEmitter.onDataRetrieved(data: products)
    }
}

extension HomeController: CartUpdateDelegate {
    func onCartUpdateSuccess(message: String) {
        showTopSuccessNote(message)
        fetchData()
    }

    func onCartUpdateFailed(reason: String) {
        showTopErrorNote(reason)
    }
}


extension HomeController: DataSourceDelegate {
    func dataRetrieved<T>(data: [T]) {
        // Alert React Native and render
        reactNativeEmitter.onDataRetrieved(data: []) //Will pass data later)
    }
    
    func didStartFetchingData() {
        //Will be handled by Bridge
    }
    
    func dataIsEmpty() {
        refreshViewForNewDataState()
        reactNativeEmitter.onErrorOccured(reason: "No items available!")
    }
    
    func dataFetchingFailed(errorMessage: String) {
        _refreshControl.endRefreshing()
        reactNativeEmitter.onErrorOccured(reason: errorMessage)
    }
}
