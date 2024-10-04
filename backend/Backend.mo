import EvmRpc "ic:7hfb6-caaaa-aaaar-qadga-cai";

import Debug "mo:base/Debug";
import Cycles "mo:base/ExperimentalCycles";

actor {

  /// Retrieve the latest block on the Ethereum blockchain.
  public func getLatestEthereumBlock() : async EvmRpc.Block {

    // Select RPC services
    let services : EvmRpc.RpcServices = #EthMainnet(?[#PublicNode]);

    // Call `eth_getBlockByNumber` RPC method (unused cycles will be refunded)
    Cycles.add<system>(2000000000);
    let result = await EvmRpc.eth_getBlockByNumber(services, null, #Latest);

    switch result {
      // Consistent, successful results
      case (#Consistent(#Ok block)) {
        block;
      };
      // Consistent error message
      case (#Consistent(#Err error)) {
        Debug.trap("Error: " # debug_show error);
      };
      // Inconsistent results between RPC providers
      case (#Inconsistent(results)) {
        Debug.trap("Inconsistent results");
      };
    };
  };
};
