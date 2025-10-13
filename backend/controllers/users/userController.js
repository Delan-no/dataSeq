const userService = require('../../services/users/userService');

const createUsers = async (req, res) => {
    console.log("Received request to create user:", req.body);
  try {
    const user = await userService.createUsers(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
    createUsers,
    getAllUsers
};