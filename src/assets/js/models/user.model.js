class User {
    constructor(id, name, email, phone, city, company, isActive) {
        this.id = id||0;
        this.name = name || "";
        this.email = email || "";
        this.phone = phone || "";
        this.city = city || "";
        this.company = company || "";
        this.isActive = isActive || false;
    }
};


module.exports = User