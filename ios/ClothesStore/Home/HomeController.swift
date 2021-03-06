//
//  HomeController.swift
//
//  Created by Oyeleke Okiki on 7/13/20.
//  Copyright © 2020 Personal. All rights reserved.
//

import UIKit
import React

class HomeController: BaseViewController {

    var homePresenter: HomePresenter!

    private lazy var rnRootView: RCTRootView = {
        let jsCodeLocation = Bundle.main.url(forResource: "main", withExtension: "jsbundle")!
        return RCTRootView(
            bundleURL: jsCodeLocation,
            moduleName: "RNHome",
            initialProperties: nil,
            launchOptions: nil
        )
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        homePresenter = HomePresenter(dataControllerDelegate: nil, cartUpdateDelegate: self)
        self.view = rnRootView

    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.navigationBar.isTranslucent = false
        self.tabBarController?.title = "RN-Home"
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        homePresenter.fetchData()

    }

}

//Leaving this extension is deliberate, to show we can still access our view and mix UI+Server updates code.

extension HomeController: CartUpdateDelegate {
    func onCartUpdateSuccess(message: String) {
        homePresenter.reactNativeEmitter.onSuccessComplete(message: message)
    }

    func onCartUpdateFailed(reason: String) {
        homePresenter.reactNativeEmitter.onErrorOccured(reason: reason)
    }
}
