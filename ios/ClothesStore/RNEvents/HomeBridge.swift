//
//  SmileIdentity.swift
//  SmileIdentity
//
//  Created by Oyeleke Okiki on 12/26/19.
//


@objc(HomeBridge)
class HomeBridge: RCTEventEmitter {

    private var onCompleteCallback: RCTResponseSenderBlock?

    private lazy var homeController: HomeController? = {
           guard let homeController = UIApplication.shared.delegate?.window??.rootViewController?.topMostViewController() as? HomeController else {
                return nil
           }
           return homeController
       }()

    override init() {
        super.init()
        EventEmitter.sharedInstance.registerEventEmitter(eventEmitter: self)
    }

    @objc open override func supportedEvents() -> [String] {
        return EventEmitter.sharedInstance.allEvents
    }

    @objc(fetchData)
    public func fetchData(){
        DispatchQueue.main.async { [weak self] in
            self?.homeController?.fetchData()
        }
    }

    @objc(addToWishList:)
    public func addToWishList(productDict: [String: Any]){
        DispatchQueue.main.async { [weak self] in
            self?.homeController?.addToWishList(productDict: productDict)
        }
    }

    @objc(removeFromWishList:)
    public func removeFromWishList(productDict: [String: Any]){
        DispatchQueue.main.async { [weak self] in
            self?.homeController?.removeFromWishList(productDict: productDict)
        }
    }

    public func onErrorOccured(reason: String) {
        EventEmitter.sharedInstance.dispatch(name: "onError", body: reason)
    }

    public func onDataRetrieved(data: [[String: Any]]) {
        EventEmitter.sharedInstance.dispatch(name: "onSuccess", body: data)
    }
}

