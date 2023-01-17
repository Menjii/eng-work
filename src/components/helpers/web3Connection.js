import Web3 from 'web3';

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3.eth.sendTransaction({});
    } catch (error) {}
  } else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    web3.eth.sendTransaction({});
  } else {
    console.log(
      'Non-Ethereum browser detected. You should consider trying MetaMask!'
    );
  }
};
