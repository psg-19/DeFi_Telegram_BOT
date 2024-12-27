// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/Tokens_To_Server.sol";
import "../Tokens/USDC.sol";

import "../lib/forge-std/src/console.sol";


contract TestContract is Test {
    Tokens_To_Server c;
USDC usdc;
    function setUp() public {
        c = new Tokens_To_Server();
        usdc = new USDC();
    }
 
 function test_GetUSDC() public{

c.AddToken("USDC",address(usdc));

console.logString("hello1");

usdc.transferOwnership(address(c));
console.logString("hello2");


c.GetUSDC(0x20753c621FcC8ab20aD53958e807AD78146970Bb, 10);
console.logString("hello3");

assertEq( usdc.balanceOf(0x20753c621FcC8ab20aD53958e807AD78146970Bb),10);


 }
 function test_BurnUSDC() public{

c.AddToken("USDC",address(usdc));

console.logString("hello1");

usdc.transferOwnership(address(c));
console.logString("hello2");

deal(address(c), 100 ether);
c.GetUSDC(0x20753c621FcC8ab20aD53958e807AD78146970Bb, 100000);

console.logString("hello3");

assertEq( usdc.balanceOf(0x20753c621FcC8ab20aD53958e807AD78146970Bb),100000);


c.BurnUSDC(0x20753c621FcC8ab20aD53958e807AD78146970Bb, 100000, 1);

assertEq( usdc.balanceOf(0x20753c621FcC8ab20aD53958e807AD78146970Bb),0);



 }


}
