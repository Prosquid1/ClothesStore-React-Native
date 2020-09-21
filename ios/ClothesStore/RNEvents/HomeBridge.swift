//
//  SmileIdentity.swift
//  SmileIdentity
//
//  Created by Oyeleke Okiki on 12/26/19.
//


@objc(HomeBridge)
class HomeBridge: RCTEventEmitter {

    private var onCompleteCallback: RCTResponseSenderBlock?

    private lazy var homePresenter: HomePresenter? = {
           guard let homeController = UIApplication.shared.delegate?.window??.rootViewController?.topMostViewController() as? HomeController else {
                return nil
           }
        return homeController.homePresenter
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
            self?.homePresenter?.fetchData()
        }
    }

    @objc(addToCart:)
    public func addToCart(productId: Int){
        DispatchQueue.main.async { [weak self] in
            self?.homePresenter?.addToCart(productId: productId)
        }
    }

    @objc(addToWishList:)
    public func addToWishList(productDict: [String: Any]){
        DispatchQueue.main.async { [weak self] in
            self?.homePresenter?.addToWishList(productDict: productDict)
        }
    }

    @objc(removeFromWishList:)
    public func removeFromWishList(productDict: [String: Any]){
        DispatchQueue.main.async { [weak self] in
            self?.homePresenter?.removeFromWishList(productDict: productDict)
        }
    }

    public func onSuccessComplete(message: String) {
        EventEmitter.sharedInstance.dispatch(name: "onSuccess", body: message)
    }

    public func onErrorOccured(reason: String) {
        EventEmitter.sharedInstance.dispatch(name: "onError", body: reason)
    }

    public func updateWishList(ids: [Int]) {
        EventEmitter.sharedInstance.dispatch(name: "onSetWishListIds", body: ids)
    }

    public func onDataRetrieved(data: [[String: Any]]) {
        EventEmitter.sharedInstance.dispatch(name: "onDataRetrieved", body: data)
    }
}

