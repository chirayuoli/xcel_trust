//
//  RNTrustWallet.swift
//  xcel_trust
//
//  Created by Chirayu Oli on 24/06/2023.
//

import Foundation
import WalletCore

@objc(RNTrustWallet)
class RNTrustWallet: NSObject {
  
  @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }

  @objc(generateMnemonic:reject:)
  func generateMnemonic(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let newWallet = HDWallet(strength: 128, passphrase: "")
    let mnemonic = newWallet?.mnemonic;
    
    let addressETH = newWallet?.getAddressForCoin(coin: .ethereum)
    let addressBTC = newWallet?.getAddressForCoin(coin: .bitcoin)
    let addressBNB = newWallet?.getAddressForCoin(coin: .binance)
   resolve([mnemonic, addressETH,addressBTC,addressBNB]);
 }
}
