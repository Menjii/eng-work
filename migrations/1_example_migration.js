const TodoList = artifacts.require('TodoList');
const AccessControl = artifacts.require('AccessControl');

module.exports = function (deployer) {
  deployer.deploy(AccessControl);
  deployer.deploy(TodoList);
};
