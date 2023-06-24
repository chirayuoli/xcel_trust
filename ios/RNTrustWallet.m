//
//  RNTrustWallet.m
//  xcel_trust
//
//  Created by Chirayu Oli on 24/06/2023.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNTrustWallet, NSObject)

RCT_EXTERN_METHOD(generateMnemonic:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
