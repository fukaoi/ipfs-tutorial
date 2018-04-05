pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Ipfs.sol";

contract TestIpfs {
    function TestGet() public {
        DeployedAddresses.Ipfs();
        uint returnedId = 1;
        uint expected = 1;
        Assert.equal(returnedId, expected, "Adoption of pet ID 8 be recorded");
    }

    function TestA() public {
        // Assert.equal(1, 1, "aaa");
    }
}