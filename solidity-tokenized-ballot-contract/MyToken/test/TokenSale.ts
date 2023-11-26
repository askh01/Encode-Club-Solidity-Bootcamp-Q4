import { expect } from "chai";
import { ethers } from "hardhat"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { MyToken } from "../typechain-types";

const TEST_RATIO = 10n;
const TEST_PRICE = 5n;
const TEST_BUYING_VALUE = ethers.parseUnits("10", "wei"); // Trying to send 10 eth to buy tokens
describe("NFT Shop", async () => {
    async function deployContracts() {
        const [
            accounts,
            myTokenContractFactory,
            myNFTContractFactory,
            tokenSaleContractFactory
        ] = await Promise.all([
            ethers.getSigners(),
            ethers.getContractFactory("MyToken"),
            ethers.getContractFactory("MyNFT"),
            ethers.getContractFactory("TokenSale"),
        ]);
        const myTokenContract = await myTokenContractFactory.deploy();
        await myTokenContract.waitForDeployment();
        const myNFTContract = await myNFTContractFactory.deploy();
        await myNFTContract.waitForDeployment();
        const tokenSaleContract = await tokenSaleContractFactory.deploy(
            TEST_RATIO,
            TEST_PRICE,
            myTokenContract.target,
            myNFTContract.target
        );
        await tokenSaleContract.waitForDeployment();
        const MINTER_ROLE = await myTokenContract.MINTER_ROLE();
        const roleTx = await myTokenContract.grantRole(MINTER_ROLE, tokenSaleContract.target);
        await roleTx.wait();
        const roleNftTx = await myNFTContract.grantRole(MINTER_ROLE, tokenSaleContract.target);
        await roleNftTx.wait();
        return { accounts, tokenSaleContract, myTokenContract, myNFTContract, myTokenContractFactory };
    }

    describe("When the Shop contract is deployed", async () => {
        it("defines the ratio as provided in parameters", async () => {
            const { tokenSaleContract } = await loadFixture(deployContracts);
            const ratio = await tokenSaleContract.ratio();
            expect(ratio).to.be.eq(TEST_RATIO);
        })
        it("defines the price as provided in parameters", async () => {
            const { tokenSaleContract } = await loadFixture(deployContracts);
            const price = await tokenSaleContract.price();
            expect(price).to.be.eq(TEST_PRICE);
        });
        it("uses a valid ERC20 as payment token", async () => {
            const { tokenSaleContract, myTokenContractFactory } = await loadFixture(deployContracts);
            const tokenAddress = await tokenSaleContract.paymentToken();
            const paymentTokenContract = await myTokenContractFactory.attach(tokenAddress) as MyToken; // attach to a MyToken contract instance already deployed on the Blockchain (included in a block)
            await expect(paymentTokenContract.totalSupply()).not.to.be.reverted;
            await expect(paymentTokenContract.balanceOf(ethers.ZeroAddress)).not.to.be.reverted;
        });
        it("uses a valid ERC721 as NFT collection", async () => {
            throw new Error("Not implemented"); //TODO
        });
    })
    describe("When a user buys an ERC20 from the Token contract", async () => {
        async function buyTokens() {
            const { accounts, tokenSaleContract, myTokenContract, myNFTContract } = await loadFixture(deployContracts);
            const balanceBefore = await ethers.provider.getBalance(accounts[1].address);
            const tx = await tokenSaleContract.connect(accounts[1]).buyTokens({ value: TEST_BUYING_VALUE });
            const txReceipt = await tx.wait();
            const gasUsed = txReceipt?.gasUsed ?? 0n;
            const gasPrice = txReceipt?.gasPrice ?? 0n;
            const gasCost = gasPrice * gasUsed;
            const balanceAfter = await ethers.provider.getBalance(accounts[1].address);
            return {
                accounts,
                tokenSaleContract,
                myTokenContract,
                myNFTContract,
                balanceBefore,
                balanceAfter,
                gasCost
            };
        }
        it("charges the correct amount of ETH", async () => {
            const { balanceBefore, balanceAfter, gasCost } = await loadFixture(buyTokens);
            const diff = balanceBefore - balanceAfter;
            const expectedDiff = TEST_BUYING_VALUE + gasCost;
            const error = diff - expectedDiff;
            expect(error).to.be.eq(0);
        })
        it("gives the correct amount of tokens", async () => {
            const { accounts, myTokenContract } = await loadFixture(buyTokens);
            const balance = await myTokenContract.balanceOf(accounts[1])
            expect(parseFloat(ethers.formatUnits(balance))).to.eq(TEST_BUYING_VALUE * TEST_RATIO); //never use parseint or parsefloat on big numbers
        });
        describe("When a user burns an ERC20 at the Shop contract", async () => {
            async function burnTokens() {
                const { accounts, myTokenContract, tokenSaleContract } = await loadFixture(buyTokens);
                const expectedBalance = TEST_BUYING_VALUE * TEST_RATIO;
                const ethBalanceBefore = await ethers.provider.getBalance(accounts[1].address);
                const allowTx = await myTokenContract.connect(accounts[1]).approve(tokenSaleContract, expectedBalance)
                const allowTxReceipt = await allowTx.wait();
                const allowTxgasUsed = allowTxReceipt?.gasUsed ?? 0n;
                const allowTxgasPrice = allowTxReceipt?.gasPrice ?? 0n;
                const allowTxgasCost = allowTxgasPrice * allowTxgasUsed;
                const burnTx = await tokenSaleContract.connect(accounts[1]).returnTokens(expectedBalance);
                const burnTxReceipt = await burnTx.wait();
                const burnTxgasUsed = burnTxReceipt?.gasUsed ?? 0n;
                const burnTxgasPrice = burnTxReceipt?.gasPrice ?? 0n;
                const burnTxgasCost = burnTxgasPrice * burnTxgasUsed;
                const gasCosts = allowTxgasCost + burnTxgasCost;
                const ethBalanceAfter = await ethers.provider.getBalance(accounts[1].address);
                return {
                    accounts,
                    tokenSaleContract,
                    myTokenContract,
                    allowTxgasCost,
                    burnTxgasCost,
                    ethBalanceBefore,
                    ethBalanceAfter,
                    gasCosts
                };
            }
            it("gives the correct amount of ETH", async () => {
                const { ethBalanceBefore, ethBalanceAfter, gasCosts } = await loadFixture(burnTokens);
                const diff = ethBalanceAfter - ethBalanceBefore;
                const expectedDiff = TEST_BUYING_VALUE - gasCosts;
                const error = diff - expectedDiff;
                expect(error).to.be.eq(0);
            })
            it("burns the correct amount of tokens", async () => {
                const { accounts, myTokenContract, tokenSaleContract } = await loadFixture(burnTokens);
                const balanceAfterBurn = await myTokenContract.balanceOf(accounts[1].address);
                expect(balanceAfterBurn).to.eq(0);
            });
        });
    });
    describe("When a user buys an NFT from the Shop contract", async () => {
        it("charges the correct amount of ERC20 tokens", async () => {
            throw new Error("Not implemented");
        })
        it("gives the correct NFT", async () => {
            throw new Error("Not implemented");
        });
    })
    describe("When a user burns their NFT at the Shop contract", async () => {
        it("gives the correct amount of ERC20 tokens", async () => {
            throw new Error("Not implemented");
        });
    })
    describe("When the owner withdraws from the Shop contract", async () => {
        it("recovers the right amount of ERC20 tokens", async () => {
            throw new Error("Not implemented");
        })
        it("updates the owner pool account correctly", async () => {
            throw new Error("Not implemented");
        });
    });
});
