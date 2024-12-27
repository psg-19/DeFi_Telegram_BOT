// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract BNB is ERC20,Ownable { 

constructor () ERC20("BNB","BNB")  Ownable(msg.sender){
_mint(msg.sender, 100000000);
}

function mint(address ad,uint256 amount) public onlyOwner(){
    _mint(ad, amount);
}

function burn(address ad,uint256 amount) public onlyOwner(){
    _burn(ad, amount);
}

    
}
