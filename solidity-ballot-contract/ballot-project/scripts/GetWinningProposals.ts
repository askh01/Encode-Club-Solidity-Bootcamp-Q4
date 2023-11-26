import { ethers } from "hardhat";
import * as dotenv from 'dotenv';
import { Ballot, Ballot__factory } from "../typechain-types";
dotenv.config();

async function main() {
    const parameters = process.argv.slice(2);
    if (!parameters || parameters.length < 1)
      throw new Error("Parameters not provided");
    const contractAddress = parameters[0];
  // configuring the provider
  // const provider = ethers.getDefaultProvider("sepolia");
  const provider = new ethers.JsonRpcProvider(process.env.INFURA_API_KEY ?? "");
  const lastBlock = await provider.getBlock('latest');
  console.log(`Last block number: ${lastBlock?.number}`);
  const lastBlockTimestamp = lastBlock?.timestamp ?? 0;
  const lastBlockDate = new Date(lastBlockTimestamp * 1000);
  console.log(`Last block timestamp: ${lastBlockTimestamp} (${lastBlockDate.toLocaleDateString()} ${lastBlockDate.toLocaleTimeString()})`);

  //configuring the wallet
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  console.log(`Using address ${wallet.address}`);
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance} ETH`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  //Attach smart contract using Typechains
const ballotFactory = new Ballot__factory(wallet);
const ballotContract = await ballotFactory.attach(contractAddress) as Ballot;

//get chair person address

const chairPersonAddress = await ballotContract.chairperson();
console.log("ChairPersonAddress: "+chairPersonAddress);

//get winning proposal and winner name

const winningProposal = await ballotContract.winningProposal();
console.log("WInning Proposal: "+winningProposal);

const winnerName = await ballotContract.winnerName();
console.log(`Winner Name:  ${ethers.decodeBytes32String(winnerName)}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});