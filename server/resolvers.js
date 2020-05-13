const { AuthenticationError } = require('apollo-server');
const faker = require('faker');
const JsonWebToken = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');

const jwtSecret = '34%%##@#FGFKFL';

const isTokenValid = token => {
  const bearerToken = token.split(' ');

  if (bearerToken) {
    return JsonWebToken.verify(bearerToken[1], jwtSecret, error => {
      if (error) {
        return false;
      }

      return true;
    });
  }

  return false;
};

const mockCategory = () => ({
  id: faker.random.number,
  title: faker.commerce.department,
});

const products = [];

const mockProduct = (id = false) => {
  const productId = id || faker.random.number();
  const title = faker.commerce.productName();
  const thumbnail = `https://source.unsplash.com/350x390/?${faker.random.arrayElement(['fashion', 'transport', 'technics', 'food'])}`;
  const price = faker.commerce.price();
  const category = mockCategory();
  const rating = faker.random.number();
  const voters = faker.random.number({
    'min': rating,
    'max': rating * 5,
  });
  const product = {
    id: productId,
    title,
    thumbnail,
    price,
    category,
    rating,
    voters,
  };
  products[productId] = product;
  console.log(products);
  return product;
};

let cart = {
  total: 0,
  products: [],
  complete: false,
};

const resolvers = {
  Query: {
    product: () => mockProduct(),
    products: (_, { limit = 10 }) =>
      Array.from(Array(limit), () => mockProduct()),
    categories: (_, { limit = 5 }) =>
      Array.from(Array(limit), () => mockCategory()),
    cart: () => cart,
  },
  Mutation: {
    updateProductRating: (_, { id, rating }) => {
      console.log(products);
      if (!products[id])
        throw new Error(`A Product with the id ${id} doesn't exists`);

      products[id] = {
        ...products[id],
        rating: products[id].rating + rating,
        voters: products[id].voters + 1,
      }

      return products[id];
    },
    addToCart: (_, { id }) => {
      cart = {
        ...cart,
        total: cart.total + 1,
        products: [...cart.products, mockProduct(id)],
      };

      return cart;
    },
    completeCart: (_, {}, { token }) => {
      const isValid = token ? isTokenValid(token) : false;

      if (isValid) {
        cart = {
          ...cart,
          complete: true,
        };

        return cart;
      }
      throw new AuthenticationError(
        'Please provide (valid) authentication details',
      );
    },
    loginUser: async (_, { userName, password }) => {
      let isValid;
      const user = {
        userName: 'test',
        password:
          '$2b$10$5dwsS5snIRlKu8ka5r7z0eoRyQVAsOtAZHkPJuSx.agOWjchXhSum',
      };

      if (userName === user.userName) {
        isValid = await Bcrypt.compareSync(password, user.password);
      }

      if (isValid) {
        const token = JsonWebToken.sign({ user: user.userName }, jwtSecret, {
          expiresIn: 3600,
        });
        return {
          userName,
          token,
        };
      }
      throw new AuthenticationError(
        'Please provide (valid) authentication details',
      );
    },
  },
};

module.exports = resolvers;
