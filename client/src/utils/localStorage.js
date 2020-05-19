const USER_KEY = 'loggedInUser';

export const saveUser = token => {
  localStorage.setItem(USER_KEY, JSON.stringify(token));
};

export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));

export const deleteUser = () => {
  localStorage.removeItem(USER_KEY);
};
