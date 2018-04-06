pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Ipfs.sol";

contract TestIpfs {
  function testGet() public {
    Ipfs ipfs = Ipfs(DeployedAddresses.Ipfs());
    ipfs.getUploadFileInfos();
    uint returnedId = 1;
    uint expected = 1;
    Assert.equal(returnedId, expected, "Adoption of pet ID 8 be recorded");
  }

  function testA() public {
    Ipfs ipfs = Ipfs(DeployedAddresses.Ipfs());
    ipfs.getUploadFileInfos();
    bool a = true;
    bool b = false;
    Assert.equal(a, b, "test");
  }
}