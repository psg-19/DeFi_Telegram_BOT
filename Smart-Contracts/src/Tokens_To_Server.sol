// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


import "../lib/forge-std/src/console.sol";


interface ITOKEN {
  
function mint(address ad,uint256 amount) external  ;

function burn(address ad,uint256 amount) external  ;


function balanceOf(address ad) external view  returns (uint256) ;


}



contract Tokens_To_Server is Ownable { 

mapping (address => uint256) public ETH_BALANCES;
mapping (string => address) public Tokens;

 
uint256 public TotalEth;



constructor ()    Ownable(msg.sender){
 TotalEth=0;
}
 

//----------- token add krn ka func-------------------------------

 function AddToken(string memory name,address ad)  public   onlyOwner(){
    Tokens[name]=ad;
     
 }


// -------------------func to fetch balances of all tokens----------------

function GetBalances(address user,string memory token)public view returns (uint256) {
    
 return ITOKEN(Tokens[token]).balanceOf(user);

}





//-------------------------  USDC  -------------------------
function GetToken(address to,uint256 amount,string memory token) public payable  onlyOwner(){
    require(to != address(0), "Recipient is the zero address");
    require(msg.value>0);

address adToken=Tokens[token];

require(adToken!=address(0));

    ITOKEN(adToken).mint(to, amount);
    
    TotalEth+=msg.value;
    ETH_BALANCES[to]+=msg.value;

}



function BurnToken(address to,uint256 burn_amount,uint256 eth_amount,string memory token) public onlyOwner(){


 require( ITOKEN( Tokens[token] ).balanceOf(to)>=burn_amount );

ITOKEN( Tokens[token] ).burn(to, burn_amount);

address payable recipient = payable(to);
recipient.transfer(eth_amount);


TotalEth-=eth_amount;
    ETH_BALANCES[to]-=eth_amount;


}
 
 
 


    
}
