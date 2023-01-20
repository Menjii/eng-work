// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControl.sol";

contract TodoList is AccessControl {

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    event TaskCreated (
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted (
        uint id,
        bool completed
    );

    mapping(address => mapping(uint => Task)) public tasks;
    mapping(address => uint) public tasksCount;

    modifier requiredRole2(bytes32 _role) {
        require(roles[_role][msg.sender], "AccessControl: Caller not allowed");
        _;
    }

    constructor() {
    }

    function createTask(string memory _content) public {
        uint taskCount = tasksCount[msg.sender];
        tasks[msg.sender][taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
        tasksCount[msg.sender]++;
    }

    function toggleCompleted(uint _id) public{
        Task memory task = tasks[msg.sender][_id];
        task.completed = !task.completed;
        tasks[msg.sender][_id] = task;
        emit TaskCompleted(_id, task.completed);
    }

    function getADMIN() public pure returns (bytes32) {
        return ADMIN;
    }

    function getUSER() public pure returns (bytes32) {
        return USER;
    }

}
