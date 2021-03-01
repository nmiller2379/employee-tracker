const { prompt } = require("inquirer");
const conTable = require("console.table");
const assets = require("/assets");

async function loadMainPromps() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View all employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View employees by department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "Add employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update employee role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "View all departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]);

    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmployeesByDepartment();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "VIEW_ROLES":
            return viewRoles();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "ADD_ROLES":
            return addRole();
        default:
            return quit();
    }
}

async function viewEmployees() {
    const employees = await assets.findAllEmployees();
    console.log("\n");
    conTable(employees);
    loadMainPromps();
}

async function viewEmployeesByDepartment() {
    const departments = await assets.findAllDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));
    const { departmentID } = await prompt([
        {
            type: "list",
            name: "departmentID",
            message: "Which department would like to see employees for?",
            choices: departmentChoices
        }
    ]);
    const employees = await assets.findAllEmployeesByDepartment(departmentID);
    console.log("\n");
    conTable(employees);
    loadMainPromps();
}

async function updateEmployeeRole() {
    const employee = await assets.findAllEmployees();
    const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeID } = await prompt([
        {
            type: "list",
            name: "employeeID",
            message: "Select and employee's role to update",
            choices: employeeChoices
        }
    ])
    const roles = await assets.findAllRoles();
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));
    const { roleID } = await prompt([{
        type: "list",
        name: "roleID",
        message: "Assign a role to the selected employee",
        choices: roleChoices
    }]);

    await assets.updateEmployeeRole(employeeID, roleID);
    console.log("Employee's role has been");
    loadMainPromps();
}

async function viewRoles() {
    const roles = await assets.findAllRoles();
    console.log("\n");
    conTable(roles);
    loadMainPromps
}

async function addRole() {
    const departments = await assets.findAllDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));
    const role = await prompt([
        {
            name: "title",
            message: "What is the role's name?"
        },
        {
            name: "salary",
            message: "What is the salary for this role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does this role belong to?",
            choices: departmentChoices
        }
    ]);
    await assets.createRole(role);
    console.log(`Added ${role.title}`);
    loadMainPromps();
}

async function addEmployee() {
    const roles = await assets.findAllRoles();
    const employees = await assets.findAllEmployees();
    const employee = await prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ]);
    const roleChoices = roles.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
    const { managerID } = await prompt({
        type: "list",
        name: "managerID",
        message: "Who manages this employee?",
        choices: managerChoices
    })
    employee.manager_id = managerID;
    await assets.createEmployee(employee);
    console.log(
        `Added ${employee.first_name} ${employee.last_name}`
    );
    loadMainPromps();
}

function quit() {
    console.log("Goodbye")
    process.exit()
}