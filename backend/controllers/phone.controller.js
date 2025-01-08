export const getPhones = async (req, res) => {
    res.send("Sending all the Phones")
}

export const createPhone = async (req, res) => {
    res.send("Create New Phone")
}

export const getPhoneById = async (req, res) => {
    res.send("Get Phone by Id")
}

export const updatePhoneById = async (req, res) => {
    res.send("updating Phone Info by Id")
}

export const deletePhoneById = async (req, res) => {
    res.send("Delete a Phone Id")
}
