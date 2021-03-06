class EventEmitter {
    /// Shared Instance.
    public static var sharedInstance = EventEmitter()
    
    private static var eventEmitter: HomeBridge!

    private init() {}

    // When React Native instantiates the emitter it is registered here.
    func registerEventEmitter(eventEmitter: HomeBridge) {
        EventEmitter.eventEmitter = eventEmitter
    }

    func dispatch(name: String, body: Any?) {
      EventEmitter.eventEmitter.sendEvent(withName: name, body: body)
    }

    lazy var allEvents: [String] = {
        return ["onError", "onSuccess", "onSetWishListIds", "onDataRetrieved"]
    }()
    
}
