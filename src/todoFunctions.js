import TodoListJSON from '../build/contracts/TodoList.json';
import AccessControlJSON from '../build/contracts/AccessControl.json';
import Web3 from 'web3';
import { loadAccount } from './components/helpers/loadAccount';
import { loadWeb3 } from './components/helpers/web3Connection';

var contract = require('@truffle/contract');

export const loadToDo = async () => {
  await loadWeb3();
  const addressAccount = await loadAccount();
  const { todoContract, tasks } = await loadContract(addressAccount);
  const isUser = await loadRole(addressAccount);
  return { addressAccount, todoContract, tasks, isUser };
};

const loadContract = async (addressAccount) => {
  const theContract = contract(TodoListJSON);
  theContract.setProvider(web3.eth.currentProvider);
  const todoContract = await theContract.deployed();
  const tasks = await loadTasks(todoContract, addressAccount);
  return { todoContract, tasks };
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

const loadRole = async (addressAccount) => {
  const accessControl = contract(AccessControlJSON);
  accessControl.setProvider(web3.eth.currentProvider);
  const contractAC = await accessControl.deployed();
  const role = await contractAC.roles(
    '0x2db9fd3d099848027c2383d0a083396f6c41510d7acfd92adc99b6cffcf31e96',
    addressAccount
  );
  return role;
};
