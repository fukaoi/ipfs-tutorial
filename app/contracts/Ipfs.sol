pragma solidity ^0.4.18;

contract Ipfs {
    string fileName;


    function setUploadFileInfo(string name) public {
        require(bytes(name).length >= 0);
        fileName = name;
    }

    function getUploadFileInfo() public returns(string) {
        return fileName;
    }
}