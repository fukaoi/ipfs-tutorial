pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Ipfs.sol";

contract TestIpfs {
  function testGet() public {
    Ipfs ipfs = Ipfs(DeployedAddresses.Ipfs());
    ipfs.set("aaaaaaa");
    uint returnedId = 1;
    uint expected = 1;
    string a = ipfs.get();
    Assert.equal(returnedId, expected, "Adoption of pet ID 8 be recorded");
  }

  function compareStrings (string a, string b) public view returns (bool){
    return keccak256(a) == keccak256(b);
  }
}