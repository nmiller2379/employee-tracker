const server = require("./server");

class Data {
    constructor(connection) {
        this.connection = connection;
    }
    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    findAllPossibleManagers(employeeID) {
        return this.connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeID
        );
    }

    createEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }
    
    updateEmployeeRole(employeeID, managerID) {
        return this.connection.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerID, employeeID]
        );
    }

    findAllRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    createRole(role) {
        return this.connection.query(
            "INSERT INTO role SET ?", role
        );
    }
    
    findAllDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name"
        );
    }

    createDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", department);
    }
    
    findAllEmployeesByDepartment(departmentID) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;", departmentID
        );
    }
}

module.exports = new Data(connection);