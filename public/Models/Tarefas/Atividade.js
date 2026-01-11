const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../Db/conection');

class Atividade extends Model {}

Atividade.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },

    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Descrição é obrigatória.'
        },
        len: {
          args: [3, 255],
          msg: 'Descrição deve ter entre 3 e 255 caracteres.'
        }
      }
    },

    dataCadastro: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'data_cadastro',
      defaultValue: DataTypes.NOW
    },

    /**
     * status:
     * 1 - Baixo
     * 2 - Médio
     * 3 - Alto
     */
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        isIn: {
          args: [[1, 2, 3]],
          msg: 'Status inválido. Use: 1 (Baixo), 2 (Médio), 3 (Alto).'
        }
      }
    },

    /**
     * situacao:
     * 1 - Iniciando
     * 2 - Em processo
     * 3 - Finalizado
     * 4 - Cancelado
     */
    situacao: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        isIn: {
          args: [[1, 2, 3, 4]],
          msg: 'Situação inválida. Use valores entre 1 e 4.'
        }
      }
    }
  },
  {
    sequelize,
    modelName: 'Atividade',
    tableName: 'atividades',

    timestamps: false, // você já tem dataCadastro
    underscored: true,

    indexes: [
      { name: 'ix_atividades_status', fields: ['status'] },
      { name: 'ix_atividades_situacao', fields: ['situacao'] },
      { name: 'ix_atividades_data_cadastro', fields: ['data_cadastro'] }
    ]
  }
);

module.exports = { Atividade };
