class Dinglemouse {
    constructor(firstName, lastName) {
        this.firstName = firstName === "" ? firstName = null : firstName;
        this.lastName = lastName === "" ? lastName = null : lastName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}