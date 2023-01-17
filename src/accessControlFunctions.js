import AccessControlJSON from '../build/contracts/AccessControl.json';
import Web3 from 'web3';
import { loadAccount } from './components/helpers/loadAccount';
import { loadWeb3 } from './components/helpers/web3Connection';

var contract = require('@truffle/contract');

export const loadAccessControl = async () => {
  await loadWeb3();
  const addressAccount = await loadAccount();
  const { accessControlContract, isAdmin } = await loadAccessControlContract(
    addressAccount
  );
  return { addressAccount, accessControlContract, isAdmin };
};

const loadAccessControlContract = async (addressAccount) => {
  const theContract = contract(AccessControlJSON);
  theContract.setProvider(web3.eth.currentProvider);
  const accessControlContract = await theContract.deployed();
  const isAdmin = await loadRole(accessControlContract, addressAccount);
  return { accessControlContract, isAdmin };
};

const loadRole = async (accessControlContract, addressAccount) => {
  const role = await accessControlContract.roles(
    '0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42',
    addressAccount
  );
  return role;
};
