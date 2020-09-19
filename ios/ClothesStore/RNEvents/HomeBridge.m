#import <React/RCTBridgeModule.h>
#import "RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(HomeBridge, RCTEventEmitter)

RCT_EXTERN_METHOD(fetchData)
RCT_EXTERN_METHOD(addToCart:(NSNumber *))
RCT_EXTERN_METHOD(addToWishList:(NSDictionary *)productDict)
RCT_EXTERN_METHOD(removeFromWishList:(NSDictionary *)productDict)

@end
