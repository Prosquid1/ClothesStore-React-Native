//
//  HomeController.swift
//
//  Created by Oyeleke Okiki on 7/13/20.
//  Copyright © 2020 Personal. All rights reserved.
//

import UIKit
import React

class HomeController: BaseViewController {

    private lazy var rnRootView: RCTRootView = {
        let jsCodeLocation = URL(string: "http://localhost:8081/index.bundle?platform=ios")!
        //let jsCodeLocation = Bundle.main.url(forResource: "main", withExtension: "jsbundle")!
        return RCTRootView(
            bundleURL: jsCodeLocation,
            moduleName: "RNHome",
            initialProperties: nil,
            launchOptions: nil
        )
    }()

    var homePresenter: HomePresenter!
    
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
