// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessControl {

    event DeleteRole(bytes32 indexed role, address indexed account);
    event SetRole(bytes32 indexed role, address indexed account);

    //role => account => bool
    mapping(bytes32 => mapping(address => bool)) public roles;

    mapping(address => bytes32) public rolesAdmin;
    address[] public rolesAdminCount;

    mapping(address => bytes32) public rolesUSER;
    address[] public rolesUserCount;

    mapping(address => bytes32) public rolesViewer;
    address[] public rolesViewerCOunt;

    //0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42
    bytes32 public constant ADMIN = keccak256(abi.encodePacked("ADMIN"));
    //0x2db9fd3d099848027c2383d0a083396f6c41510d7acfd92adc99b6cffcf31e96
    bytes32 public constant USER = keccak256(abi.encodePacked("USER"));

    modifier requiredRole(bytes32 _role) {
        require(roles[_role][msg.sender], "AccessControl: Caller not allowed");
        _;
    }

    constructor() {
        _setRole(ADMIN, msg.sender);
    }

    function _setRole(bytes32 _role, address _account) internal {
        roles[_role][_account] = true;

        if(_role == 0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42) {
            if(rolesAdmin[_account] != _role){
                rolesAdmin[_account] = _role;
                rolesAdminCount.push(_account);
            }
        } else if (_role == 0x2db9fd3d099848027c2383d0a083396f6c41510d7acfd92adc99b6cffcf31e96) {
             if(rolesUSER[_account] != _role) {
                rolesUSER[_account] = _role;
                rolesUserCount.push(_account);
             }
        } else if (_role == 0xdfb118e7fb180cb21baebdc5d0b33ccc34c8e0be422c1a4f57131ff74b98ca6e) {
            if(rolesViewer[_account] != _role) {
                rolesViewer[_account] = _role;
                rolesViewerCOunt.push(_account);
            }
        }

        emit SetRole(_role, _account);
    }

    function setRole(bytes32 _role, address _account) external requiredRole(ADMIN) {
        _setRole(_role, _account);
    }

    function deleteRole(bytes32 _role, address _account) external requiredRole(ADMIN) {
        roles[_role][_account] = false;

        if(_role == 0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42) {
            if(rolesAdmin[_account] == _role){
                delete rolesAdmin[_account];
                delete rolesAdminCount[findElementInArray(_account, rolesUserCount)];
            }
        } else if (_role == 0x2db9fd3d099848027c2383d0a083396f6c41510d7acfd92adc99b6cffcf31e96) {
             if(rolesUSER[_account] == _role) {
                delete rolesUSER[_account];
                delete rolesUserCount[findElementInArray(_account, rolesUserCount)];
             }
        } else if (_role == 0xdfb118e7fb180cb21baebdc5d0b33ccc34c8e0be422c1a4f57131ff74b98ca6e) {
            if(rolesViewer[_account] == _role) {
                delete rolesViewer[_account];
                delete rolesViewerCOunt[findElementInArray(_account, rolesUserCount)];
            }
        }

        emit DeleteRole(_role, _account);
    }

    function returnArrayOfAdmins() public view returns (address[] memory) {
        return rolesAdminCount;
    }

    function returnArrayOfUsers() public view returns (address[] memory) {
        return rolesUserCount;
    }

    function returnArrayOfViewers() public view returns (address[] memory) {
        return rolesViewerCOunt;
    }

    function findElementInArray(address _account, address[] memory _arr) public pure returns(uint) {
    for (uint i = 0 ; i < _arr.length; i++) {
        if (_account == _arr[i]) {
            return i;
        }
    }
    return 256;
    }
}
