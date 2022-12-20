import TodoListJSON from '../build/contracts/TodoList.json';
import AccessControlJSON from '../build/contracts/AccessControl.json';
import Web3 from 'web3';
var contract = require('@truffle/contract');

export const load = async () => {
  await loadWeb3();
  const addressAccount = await loadAccount();
  const { todoContract, tasks } = await loadContract(addressAccount);

  return { addressAccount, todoContract, tasks };
};

export const loadAccessControl = async () => {
  await loadWeb3();
  const addressAccount = await loadAccount();
  console.log(loadAccounts());
  const accounts = await loadAccounts();
  const { accessControlContract, isAdmin } = await loadAccessControlContract(
    addressAccount
  );
  return { addressAccount, accessControlContract, isAdmin, accounts };
};

const loadTasks = async (todoContract, addressAccount) => {
  const tasksCount = await todoContract.tasksCount(addressAccount);
  const tasks = [];
  for (var i = 0; i < tasksCount; i++) {
    const task = await todoContract.tasks(addressAccount, i);
    tasks.push(task);
  }
  return tasks;
};

const loadRole = async (accessControlContract, addressAccount) => {
  const role = await accessControlContract.roles(
    '0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42',
    addressAccount
  );
  return role;
};

const loadContract = async (addressAccount) => {
  const theContract = contract(TodoListJSON);
  theContract.setProvider(web3.eth.currentProvider);
  const todoContract = await theContract.deployed();
  const tasks = await loadTasks(todoContract, addressAccount);
  return { todoContract, tasks };
};

const loadAccessControlContract = async (addressAccount) => {
  const theContract = contract(AccessControlJSON);
  theContract.setProvider(web3.eth.currentProvider);
  const accessControlContract = await theContract.deployed();
  console.log(addressAccount);
  const isAdmin = await loadRole(accessControlContract, addressAccount);
  return { accessControlContract, isAdmin };
};

const loadAccount = async () => {
  const addressAccount = await web3.eth.getCoinbase();
  return addressAccount;
};

const loadAccounts = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts;
};

const loadWeb3 = async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Acccounts now exposed
      web3.eth.sendTransaction({
        /* ... */
      });
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    web3.eth.sendTransaction({
      /* ... */
    });
  }
  // Non-dapp browsers...
  else {
    console.log(
      'Non-Ethereum browser detected. You should consider trying MetaMask!'
    );
  }
};
