const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Define a method to compare the provided password with the stored hashed password
  checkPassword(password) {
    console.log('Comparing password:', password);
    console.log('Stored hashed password:', this.password);

    const isPasswordMatch = bcrypt.compareSync(password, this.password);
    console.log('Password match result:', isPasswordMatch);

    return isPasswordMatch;
  }
}

User.init(
  {
    // Define model fields
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if (value && !value.startsWith('$2b$')) {
          // Hash the password only if it is not already hashed
          const hashedPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashedPassword);
        } else {
          this.setDataValue('password', value);
        }
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    name: {
      singular: 'user',
      plural: 'users',
    },
  }
);

module.exports = User;
