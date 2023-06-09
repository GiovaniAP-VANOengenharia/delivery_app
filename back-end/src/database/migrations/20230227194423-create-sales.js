'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', { 
      id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,        
       },
      totalPrice: {
        type: Sequelize.DECIMAL(9,2),
        allowNull: false,
        field: "total_price",
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "delivery_address",
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "delivery_number",
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "sale_date",
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "seller_id",
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
