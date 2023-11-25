// SPDX-License-Identifier:MIT

pragma solidity ^0.8.1;

contract simpleStorage{
    uint256 num;
    address i_owner;

    constructor(){
        i_owner = msg.sender;
        num =0;
    }

    function increment() public returns(uint256){
        num = num+1;
        return num;
    }

    function Decrement() public returns(uint256){
        require(num>0,"cannot decrement");
        num = num-1;
        return num;
    }

    function getOwner() public view returns(address){
        return i_owner;
    }

    function getNum() public view returns(uint256){
        return num;
    }


}

