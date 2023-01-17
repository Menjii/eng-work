import TodoListJSON from '../build/contracts/TodoList.json';
import Web3 from 'web3';
import { loadAccount } from './components/helpers/loadAccount';
import { loadWeb3 } from './components/helpers/web3Connection';

var contract = require('@truffle/contract');

export const loadToDo = async () => {
  await loadWeb3();
  const addressAccount = await loadAccount();
  const { todoContract, tasks } = await loadContract(addressAccount);

  return { addressAccount, todoContract, tasks };
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
