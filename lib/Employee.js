// TODO: Write code to define and export the Employee class
// Employee requires nothing as it will be imported by other classes that have the required dependencies. 

class Employee {
    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getId() {
        return this.id;
    }

    getRole() {
        return "Employee";
    }
}

module.exports = Employee;