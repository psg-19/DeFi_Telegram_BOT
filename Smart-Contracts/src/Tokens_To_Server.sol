// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


import "../lib/forge-std/src/console.sol";


interface ITOKEN {
  
function mint(address ad,uint256 amount) external  ;

function burn(address ad,uint256 amount) external  ;


function balanceOf(address ad) external  returns (uint256) ;


}



contract Tokens_To_Server is Ownable { 

mapping (address => uint256) public ETH_BALANCES;
mapping (string => address) public Tokens;

 
uint256 TotalEth;



constructor ()    Ownable(msg.sender){
 TotalEth=0;
}
 

//----------- token add krn ka func-------------------------------
 function AddToken(string memory name,address ad) public onlyOwner(){
    Tokens[name]=ad;
     
 }


// -------------------func to fetch balances of all tokens----------------

function GetBalances(address user,string memory token)public returns (uint256) {
    
 return ITOKEN(Tokens[token]).balanceOf(user);

}





//-------------------------  USDC  -------------------------
function GetUSDC(address to,uint256 amount) public payable onlyOwner(){
    require(to != address(0), "Recipient is the zero address");
 
address adusdc=Tokens["USDC"];

    ITOKEN(adusdc).mint(to, amount);
    
    TotalEth+=msg.value;
    ETH_BALANCES[to]+=msg.value;

}



function BurnUSDC(address to,uint256 burn_amount,uint256 eth_amount) public onlyOwner(){


 require( ITOKEN( Tokens["USDC"] ).balanceOf(to)>=burn_amount );

ITOKEN( Tokens["USDC"] ).burn(to, burn_amount);

address payable recipient = payable(to);
recipient.transfer(eth_amount);


TotalEth-=eth_amount;
    ETH_BALANCES[to]-=eth_amount;


}
 





//-------------------------  BNB  -------------------------
function GetBNB(address to,uint256 amount) public payable onlyOwner(){
    require(to != address(0), "Recipient is the zero address");
 
address adBNB=Tokens["BNB"];

    ITOKEN(adBNB).mint(to, amount);
    
    TotalEth+=msg.value;
    ETH_BALANCES[to]+=msg.value;

}



function BurnBNB(address to,uint256 burn_amount,uint256 eth_amount) public onlyOwner(){


 require( ITOKEN( Tokens["BNB"] ).balanceOf(to)>=burn_amount );

ITOKEN( Tokens["BNB"] ).burn(to, burn_amount);

address payable recipient = payable(to);
recipient.transfer(eth_amount);


TotalEth-=eth_amount;
    ETH_BALANCES[to]-=eth_amount;


}
 

 





//-------------------------  PEPE  -------------------------
function GetPEPE(address to,uint256 amount) public payable onlyOwner(){
    require(to != address(0), "Recipient is the zero address");
 
address adToken=Tokens["PEPE"];

    ITOKEN(adToken).mint(to, amount);
    
    TotalEth+=msg.value;
    ETH_BALANCES[to]+=msg.value;

}



function BurnPEPE(address to,uint256 burn_amount,uint256 eth_amount) public onlyOwner(){


 require( ITOKEN( Tokens["PEPE"] ).balanceOf(to)>=burn_amount );

ITOKEN( Tokens["PEPE"] ).burn(to, burn_amount);

address payable recipient = payable(to);
recipient.transfer(eth_amount);


TotalEth-=eth_amount;
    ETH_BALANCES[to]-=eth_amount;


}
 



 





//-------------------------  SHIB  -------------------------
function GetSHIB(address to,uint256 amount) public payable onlyOwner(){
    require(to != address(0), "Recipient is the zero address");
 
address adToken=Tokens["SHIB"];

    ITOKEN(adToken).mint(to, amount);
    
    TotalEth+=msg.value;
    ETH_BALANCES[to]+=msg.value;

}



function BurnSHIB(address to,uint256 burn_amount,uint256 eth_amount) public onlyOwner(){


 require( ITOKEN( Tokens["SHIB"] ).balanceOf(to)>=burn_amount );

ITOKEN( Tokens["SHIB"] ).burn(to, burn_amount);

address payable recipient = payable(to);
recipient.transfer(eth_amount);


TotalEth-=eth_amount;
    ETH_BALANCES[to]-=eth_amount;


}
 



    
 



 





//-------------------------  SHY  -------------------------
function GetSHY(address to,uint256 amount) public payable onlyOwner(){
    require(to != address(0), "Recipient is the zero address");
 
address adToken=Tokens["SHY"];

    ITOKEN(adToken).mint(to, amount);
    
    TotalEth+=msg.value;
    ETH_BALANCES[to]+=msg.value;

}



function BurnSHY(address to,uint256 burn_amount,uint256 eth_amount) public onlyOwner(){


 require( ITOKEN( Tokens["SHY"] ).balanceOf(to)>=burn_amount );

ITOKEN( Tokens["SHY"] ).burn(to, burn_amount);

address payable recipient = payable(to);
recipient.transfer(eth_amount);


TotalEth-=eth_amount;
    ETH_BALANCES[to]-=eth_amount;


}
 

    
 



 





//-------------------------  USDT  -------------------------
function GetUSDT(address to,uint256 amount) public payable onlyOwner(){
    require(to != address(0), "Recipient is the zero address");
 
address adToken=Tokens["USDT"];

    ITOKEN(adToken).mint(to, amount);
    
    TotalEth+=msg.value;
    ETH_BALANCES[to]+=msg.value;

}



function BurnUSDT(address to,uint256 burn_amount,uint256 eth_amount) public onlyOwner(){


 require( ITOKEN( Tokens["USDT"] ).balanceOf(to)>=burn_amount );

ITOKEN( Tokens["USDT"] ).burn(to, burn_amount);

address payable recipient = payable(to);
recipient.transfer(eth_amount);


TotalEth-=eth_amount;
    ETH_BALANCES[to]-=eth_amount;


}
 

    
 



 





//-------------------------  WBTC  -------------------------
function GetWBTC(address to,uint256 amount) public payable onlyOwner(){
    require(to != address(0), "Recipient is the zero address");
 
address adToken=Tokens["WBTC"];

    ITOKEN(adToken).mint(to, amount);
    
    TotalEth+=msg.value;
    ETH_BALANCES[to]+=msg.value;

}



function BurnWBTC(address to,uint256 burn_amount,uint256 eth_amount) public onlyOwner(){


 require( ITOKEN( Tokens["WBTC"] ).balanceOf(to)>=burn_amount );

ITOKEN( Tokens["WBTC"] ).burn(to, burn_amount);

address payable recipient = payable(to);
recipient.transfer(eth_amount);


TotalEth-=eth_amount;
    ETH_BALANCES[to]-=eth_amount;


}
 



    
}
