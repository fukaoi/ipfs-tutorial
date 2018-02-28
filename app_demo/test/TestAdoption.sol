pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
  Adoption adoption = Adoption(DeplyedAddresses.Adoption);

  function testUserCanAdoptPet() {
    uint returnedId = adoption.adopt(8);
    uint expected = 8;
  }
}