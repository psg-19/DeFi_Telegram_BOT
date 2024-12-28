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
 

 function test_GetToken() public{

c.AddToken("USDC",address(usdc));

console.logString("hello1");

usdc.transferOwnership(address(c));
console.logString("hello2");



c.GetToken{value: 1 ether}(0x20753c621FcC8ab20aD53958e807AD78146970Bb, 10,"USDC");
console.logString("hello3");

assertEq( usdc.balanceOf(0x20753c621FcC8ab20aD53958e807AD78146970Bb),10);


 }




 function test_BurnToken() public{

c.AddToken("USDC",address(usdc));

console.logString("hello1");

usdc.transferOwnership(address(c));
console.logString("hello2");

deal(address(c), 100 ether);
deal(0x20753c621FcC8ab20aD53958e807AD78146970Bb,10 ether);

// vm.prank(0x20753c621FcC8ab20aD53958e807AD78146970Bb);
console.logUint(address(c).balance);

console.logUint(address(0x20753c621FcC8ab20aD53958e807AD78146970Bb).balance);
c.GetToken{value: 2 ether}(0x20753c621FcC8ab20aD53958e807AD78146970Bb, 100000,"USDC");



console.logString("hello3");
console.logUint(address(c).balance);
console.logUint(address(0x20753c621FcC8ab20aD53958e807AD78146970Bb).balance);
assertEq( usdc.balanceOf(0x20753c621FcC8ab20aD53958e807AD78146970Bb),100000);

assertEq( c.GetBalances (0x20753c621FcC8ab20aD53958e807AD78146970Bb,"USDC"),100000);

c.BurnToken(0x20753c621FcC8ab20aD53958e807AD78146970Bb, 100000, 1 ether,"USDC");
console.logUint(address(c).balance);

console.logUint(address(0x20753c621FcC8ab20aD53958e807AD78146970Bb).balance);

assertEq( c.GetBalances (0x20753c621FcC8ab20aD53958e807AD78146970Bb,"USDC"),0);



 }


}
