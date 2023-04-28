export const getDataSnippet = [
  {
    inputs: [
      {
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'getData',
    outputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'fuses',
        type: 'uint32',
      },
      {
        name: 'expiry',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
