pragma solidity ^0.4.18;

contract Ipfs {
  struct FileInfos {
    string name;
    string url;
  }

  mapping (uint => FileInfos) fileinfos;
  // uint[] public files;
  string public storedMsg;

  function setUploadFileInfo(uint _id, string _name, string _url) public {
    FileInfos storage fileinfo = fileinfos[_id];
    fileinfo.name = _name;
    fileinfo.url = _url;
  }

  function getUploadFileInfos(uint _id) public view returns(string, string) {
    return (fileinfos[_id].name, fileinfos[_id].url);
  }

  // メッセージを保存します。
  function set(string _message) public {
    storedMsg = _message;
  }  

  function get() public view returns(string) {
    return storedMsg;
  }
}