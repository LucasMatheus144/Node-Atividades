const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../Db/conection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Nome é obrigatório.' },
        len: { args: [2, 30], msg: 'Nome deve ter entre 2 e 30 caracteres.' }
      }
    },

    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: { name: 'uq_users_email', msg: 'E-mail já cadastrado.' },
      validate: {
        isEmail: { msg: 'E-mail inválido.' },
        notEmpty: { msg: 'E-mail é obrigatório.' }
      }
    },

    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password_hash'
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      { name: 'ix_users_email', unique: true, fields: ['email'] },
      { name: 'ix_users_is_active', fields: ['is_active'] }
    ],
    hooks: {
      beforeUpdate: (user) => {
        user.version += 1;
      }
    },
    defaultScope: {
      attributes: { exclude: ['passwordHash'] }
    },
    scopes: {
      withPassword: { attributes: { include: ['passwordHash'] } }
    }
  }
);

module.exports = { User };
