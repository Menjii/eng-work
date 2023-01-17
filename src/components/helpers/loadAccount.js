import Web3 from 'web3';

export const loadAccount = async () => {
  const addressAccount = await web3.eth.getCoinbase();
  return addressAccount;
};
