# Encode-Club-Solidity-Bootcamp-Q4

## Scripts:
**DeployWithEthers.ts**: This script deploys the contract, the arguments are proposals. 

For example:
``` npx ts-node --files scripts/DeployWithEthers.ts Proposal_1 Proposal_2 Proposal_3 ``` 

Sample output:

```
Deploying Ballot contract
Proposals: 
Proposal N. 1: Proposal 1
Proposal N. 2: Proposal 2
Proposal N. 3: Proposal 3
Last block number: 4635924
Last block timestamp: 1699200588 (11/5/2023 8:09:48 AM)
Using address 0x49F719613Da44fb4EDF69c3f8544C1a4fe75ceE4
Wallet balance 0.49714474906384987 ETH
Contract deployed to 0xb262E381cbb01117D60DfF32C5DbDb4F49C50Af5
{
  index: 0,
  name: 'Proposal_1',
  proposal: Result(2) [
    '0x50726f706f73616c5f3100000000000000000000000000000000000000000000',
    0n
  ]
}
{
  index: 1,
  name: 'Proposal_2',
  proposal: Result(2) [
    '0x50726f706f73616c5f3200000000000000000000000000000000000000000000',
    0n
  ]
}
{
  index: 2,
  name: 'Proposal_3',
  proposal: Result(2) [
    '0x50726f706f73616c5f3300000000000000000000000000000000000000000000',
    0n
  ]
}


```
**CastVote.ts**: This script casts a vote and takes two arguments: the address of the voting contract and the proposal number. 

For example:

``` npx ts-node --files scripts/CastVote.ts 0xb262E381cbb01117D60DfF32C5DbDb4F49C50Af5 1 ``` 

Successful output of casting the vote first time:

```
Last block number: 4636009
Last block timestamp: 1699201788 (11/5/2023 8:29:48 AM)
Using address 0x49F719613Da44fb4EDF69c3f8544C1a4fe75ceE4
Wallet balance 0.49601601686180685 ETH
Transaction completed 0xaf9c5ec63775f7e60fb25750a2ee3a488f829e2d546482227254be48cc1bb640
```

Exception thrown after casting the vote second time to the same proposal number:

```
Last block number: 4636360
Last block timestamp: 1699206408 (11/5/2023 9:46:48 AM)
Using address 0x49F719613Da44fb4EDF69c3f8544C1a4fe75ceE4
Wallet balance 0.49592309291455694 ETH
ProposalName before vote: "+ Proposal_2
Vote count before vote: 1
Error: execution reverted: "Already voted." (action="estimateGas", data="0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000e416c726561647920766f7465642e000000000000000000000000000000000000", reason="Already voted.", transaction={ "data": "0x0121b93f0000000000000000000000000000000000000000000000000000000000000001", "from": "0x49F719613Da44fb4EDF69c3f8544C1a4fe75ceE4", "to": "0xb262E381cbb01117D60DfF32C5DbDb4F49C50Af5" }, invocation=null, revert={ "args": [ "Already voted." ], "name": "Error", "signature": "Error(string)" }, code=CALL_EXCEPTION, version=6.8.0)
    at makeError (/home/askh/encode-club/Encode-Club-Solidity-Bootcamp-Q4/week2/ballot-project/node_modules/ethers/src.ts/utils/errors.ts:694:21)
    at getBuiltinCallException (/home/askh/encode-club/Encode-Club-Solidity-Bootcamp-Q4/week2/ballot-project/node_modules/ethers/src.ts/abi/abi-coder.ts:118:21)
    at Function.getBuiltinCallException (/home/askh/encode-club/Encode-Club-Solidity-Bootcamp-Q4/week2/ballot-project/node_modules/ethers/src.ts/abi/abi-coder.ts:230:16)
    at JsonRpcProvider.getRpcError (/home/askh/encode-club/Encode-Club-Solidity-Bootcamp-Q4/week2/ballot-project/node_modules/ethers/src.ts/providers/provider-jsonrpc.ts:906:32)
    at /home/askh/encode-club/Encode-Club-Solidity-Bootcamp-Q4/week2/ballot-project/node_modules/ethers/src.ts/providers/provider-jsonrpc.ts:526:45
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'CALL_EXCEPTION',
  action: 'estimateGas',
  data: '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000e416c726561647920766f7465642e000000000000000000000000000000000000',
  reason: 'Already voted.',
  transaction: {
    to: '0xb262E381cbb01117D60DfF32C5DbDb4F49C50Af5',
    data: '0x0121b93f0000000000000000000000000000000000000000000000000000000000000001',
    from: '0x49F719613Da44fb4EDF69c3f8544C1a4fe75ceE4'
  },
  invocation: null,
  revert: {
    signature: 'Error(string)',
    name: 'Error',
    args: [ 'Already voted.' ]
  },
  shortMessage: 'execution reverted: "Already voted."',
  info: {
    error: {
      code: 3,
      data: '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000e416c726561647920766f7465642e000000000000000000000000000000000000',
      message: 'execution reverted: Already voted.'
    },
    payload: {
      method: 'eth_estimateGas',
      params: [Array],
      id: 10,
      jsonrpc: '2.0'
    }
  }
}

```

Exception thrown after casting the vote second time to a different proposal number:

``` npx ts-node --files scripts/CastVote.ts 0xb262E381cbb01117D60DfF32C5DbDb4F49C50Af5 0 ``` 

```
Last block number: 4636365
Last block timestamp: 1699206468 (11/5/2023 9:47:48 AM)
Using address 0x49F719613Da44fb4EDF69c3f8544C1a4fe75ceE4
Wallet balance 0.49592309291455694 ETH
ProposalName before vote: " Proposal_1
Vote count before vote: 0
Error: execution reverted: "Already voted." (action="estimateGas", data="0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000e416c726561647920766f7465642e000000000000000000000000000000000000", reason="Already voted.", transaction={ "data": "0x0121b93f0000000000000000000000000000000000000000000000000000000000000000", "from": "0x49F719613Da44fb4EDF69c3f8544C1a4fe75ceE4", "to": "0xb262E381cbb01117D60DfF32C5DbDb4F49C50Af5" }, invocation=null, revert={ "args": [ "Already voted." ], "name": "Error", "signature": "Error(string)" }, code=CALL_EXCEPTION, version=6.8.0)
    at makeError (/home/askh/encode-club/Encode-Club-Solidity-Bootcamp-Q4/week2/ballot-project/node_modules/ethers/src.ts/utils/errors.ts:694:21)
    at getBuiltinCallException (/home/askh/encode-club/Encode-Club-Solidity-Bootcamp-Q4/week2/ballot-project/node_modules/ethers/src.ts/abi/abi-coder.ts:118:21)
    at Function.getBuiltinCallException (/home/askh/encode-club/Encode-Club-Solidity-Bootcamp-Q4/week2/ballot-project/node_modules/ethers/src.ts/abi/abi-coder.ts:230:16)
    at JsonRpcProvider.getRpcError (/home/askh/encode-club/Encode-Club-Solidity-Bootcamp-Q4/week2/ballot-project/node_modules/ethers/src.ts/providers/provider-jsonrpc.ts:906:32)
    at /home/askh/encode-club/Encode-Club-Solidity-Bootcamp-Q4/week2/ballot-project/node_modules/ethers/src.ts/providers/provider-jsonrpc.ts:526:45
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'CALL_EXCEPTION',
  action: 'estimateGas',
  data: '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000e416c726561647920766f7465642e000000000000000000000000000000000000',
  reason: 'Already voted.',
  transaction: {
    to: '0xb262E381cbb01117D60DfF32C5DbDb4F49C50Af5',
    data: '0x0121b93f0000000000000000000000000000000000000000000000000000000000000000',
    from: '0x49F719613Da44fb4EDF69c3f8544C1a4fe75ceE4'
  },
  invocation: null,
  revert: {
    signature: 'Error(string)',
    name: 'Error',
    args: [ 'Already voted.' ]
  },
  shortMessage: 'execution reverted: "Already voted."',
  info: {
    error: {
      code: 3,
      data: '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000e416c726561647920766f7465642e000000000000000000000000000000000000',
      message: 'execution reverted: Already voted.'
    },
    payload: {
      method: 'eth_estimateGas',
      params: [Array],
      id: 10,
      jsonrpc: '2.0'
    }
  }
}


```

**GetWinningProposals.ts**: This script simply gets the winning proposal number and winnners name:


For example:

``` npx ts-node --files scripts/GetWinningProposals.ts 0xb262E381cbb01117D60DfF32C5DbDb4F49C50Af5 ``` 

Output:

```
Last block number: 4636623
Last block timestamp: 1699209924 (11/5/2023 10:45:24 AM)
Using address 0x49F719613Da44fb4EDF69c3f8544C1a4fe75ceE4
Wallet balance 0.49592309291455694 ETH
ChairPersonAddress: 0x49F719613Da44fb4EDF69c3f8544C1a4fe75ceE4
WInning Proposal: 1
Winner Name:  Proposal_2
```

