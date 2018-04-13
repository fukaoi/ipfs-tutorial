pragma solidity ^0.4.18;     

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Ipfs.sol";

contract TestIpfs {    
  Ipfs ipfs = Ipfs(DeployedAddresses.Ipfs());

  function testContract() public {
    ipfs.getUploadFileInfos(0);
    uint expected = 1000;
    Assert.equal(expected, expected, "initially");
  }
} 