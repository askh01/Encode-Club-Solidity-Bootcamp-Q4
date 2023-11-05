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

