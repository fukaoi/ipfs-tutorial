pragma solidity ^0.4.18;

contract Ipfs {

  struct FileInfo {
    string name;
    string url;
  }

  FileInfo[] fileinfos;

  function setUploadFileInfo(string _name, string _url) public {
    FileInfo memory fileinfo = FileInfo(_name, _url);
    fileinfos.push(fileinfo);
  }

  function getUploadFileInfo(uint _id) public view returns(string, string) {
    return (fileinfos[_id].name, fileinfos[_id].url);
  }

  function getLength() public view returns(uint) {
    return fileinfos.length;
  }
}