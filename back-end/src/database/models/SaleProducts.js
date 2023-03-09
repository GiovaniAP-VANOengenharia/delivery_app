module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, 
  {
    timestamps: false,
    underscored: true,
    tableName: 'sales_products',
  });

  SalesProducts.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      through: SalesProducts,
      foreignKey: "saleId", //model de fora
      otherKey: 'productId', // model de dentro
      as: 'products',
    });

    models.Product.belongsToMany(models.Sale, {
      through: SalesProducts,
      foreignKey: "productId", //model de fora
      otherKey: 'saleId', // model de dentro
      as: 'sales',
    });
  };
  
  return SalesProducts;
};
