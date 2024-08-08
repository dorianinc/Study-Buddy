"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Document, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });
      User.hasMany(models.Note, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }

  User.init(
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: "First name is required.",
          },
          len: {
            args: [1, 25],
            msg: "First name must be between 1 and 25 characters long.",
          },
          isAlpha: {
            args: true,
            msg: "First name can only contain letters.",
          },
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: "Last name is required.",
          },
          len: {
            args: [1, 25],
            msg: "Last name must be between 1 and 25 characters long.",
          },
          isAlpha: {
            args: true,
            msg: "Last name can only contain letters.",
          },
        },
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: "Username is required.",
          },
          len: {
            args: [5, 15],
            msg: "Username must be between 5 and 15 characters long.",
          },
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Username cannot be an email address.");
            }
          },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: "Email is required.",
          },
          isEmail: {
            args: true,
            msg: "Must be a valid email address.",
          },
        },
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
        validate: {
          notNull: {
            args: true,
            msg: "Password is required.",
          },
          isBcryptHash(value) {
            const bcryptRegex = /^\$2[aby]\$[0-9]{2}\$[./0-9A-Za-z]{53}$/;
            if (!bcryptRegex.test(value)) {
              throw new Error("Password must be encrypted.");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "createdAt", "updatedAt"],
        },
      },
    }
  );
  return User;
};
