pragma solidity ^0.4.18;

contract Ipfs {
  struct FileInfos {
    string name;
    string url;
  }

  mapping (uint => FileInfos) fileinfos;
  uint[] public files;
  string public storedMsg;

  function segtUploadFileInfo(uint _id, string _name, string _url) public {
   // require(bytes(name).length >= 0);
    FileInfos storage fileinfo = fileinfos[_id];
    fileinfo.name = _name;
    fileinfo.url = _url;

    files.push(_id) - 1;
  }

  function getUploadFileInfos() public view returns(uint[]) {
    return files;
  }

  // メッセージを保存します。
  function set(string _message) public {
    storedMsg = _message;
  }  

  function get() public view returns(string) {
    return storedMsg;
  }
}