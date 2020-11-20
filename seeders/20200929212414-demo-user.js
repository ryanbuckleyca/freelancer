module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      auth0_id: 'auth0|5f8cab8973ef49007032e5b9',
      name: "Ryan Buckley",
      number: "438-408-6340",
      email: "ryanbuckley@gmail.com",
      street1: "4107 Blvd. St. Laurent",
      street2: "Apt 2",
      city: "Montréal",
      state: "Quebec",
      post_zip: "H2L 1Y7",
      country: "Canada",
      picture: 'https://res.cloudinary.com/ryanbuckleyca/image/upload/v1603555929/cheque-mate/avatars/160618_Photobooth_2_iq9gk3.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
