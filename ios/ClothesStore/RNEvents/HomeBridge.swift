//
//  SmileIdentity.swift
//  SmileIdentity
//
//  Created by Oyeleke Okiki on 12/26/19.
//


@objc(HomeBridge)
class HomeBridge: RCTEventEmitter {

    private var onCompleteCallback: RCTResponseSenderBlock?

    override init() {
        super.init()
        EventEmitter.sharedInstance.registerEventEmitter(eventEmitter: self)
    }

    @objc open override func supportedEvents() -> [String] {
        return EventEmitter.sharedInstance.allEvents
    }

    @objc(fetchData)
    public func fetchData(){
        DispatchQueue.main.async {
            guard let homeController = UIApplication.shared.delegate?.window??.rootViewController?.topMostViewController() as? HomeController else {
                fatalError("Can't happen, can only be called from HomeController")
            }
            homeController.fetchData()
        }
    }

    public func onErrorOccured(reason: String) {
        EventEmitter.sharedInstance.dispatch(name: "onError", body: reason)
    }

    public func onDataRetrieved(data: [AnyObject]) {
        EventEmitter.sharedInstance.dispatch(name: "onSuccess", body: data)
    }
}

