pragma solidity ^0.4.18;

contract Ipfs {
    struct FileInfos {
        string name;
        string url;
    }

    mapping (address => FileInfos) fileinfos;
    address[] public files;

    function setUploadFileInfo(address _address, string _name, string _url) public {
        // require(bytes(name).length >= 0);
        FileInfos storage fileinfo = fileinfos[_address];
        fileinfo.name = _name;
        fileinfo.url = _url;

        files.push(_address) - 1;
    }

    function getUploadFileInfos() public view returns(address[]) {
        return files;
    }
}