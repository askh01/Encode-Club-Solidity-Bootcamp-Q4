import { ethers } from "hardhat";
import * as dotenv from 'dotenv';
import { Ballot, Ballot__factory } from "../typechain-types";
dotenv.config();
const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
    const parameters = process.argv.slice(2);
    if (!parameters || parameters.length < 2)
      throw new Error("Parameters not provided");
    const contractAddress = parameters[0];
    const proposalNUmber = parameters[1];
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
const tx = await ballotContract.vote(proposalNUmber);
const receipt = await tx.wait();
console.log(`Transaction completed ${receipt?.hash}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});