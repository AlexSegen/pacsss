class User {
    constructor(id, name, email, phone, city, company, isActive, updatedAt) {
        this.id = id||0;
        this.name = name || "";
        this.email = email || "";
        this.phone = phone || "";
        this.city = city || "";
        this.company = company || "";
        this.isActive = isActive || false;
        this.createdAt = new Date();
        this.updatedAt = updatedAt || null;
    }
};

module.exports = User