module.exports = (sequelize, DataTypes) => {
  const SaleProducts = sequelize.define('SaleProducts', {
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

  SaleProducts.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      through: SaleProducts,
      foreignKey: "salesId", //model de fora
      otherKey: 'productsId', // model de dentro
      as: 'products',
    });

    models.Product.belongsToMany(models.Sale, {
      through: SaleProducts,
      foreignKey: "productsId", //model de fora
      otherKey: 'salesId', // model de dentro
      as: 'sales',
    });
  };
  
  return SaleProducts;
};
