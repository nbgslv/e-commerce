const USER_KEY = 'loggedInUser';

export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));

export const deleteUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const saveUser = token => {
  if (getUser()) deleteUser();
  localStorage.setItem(USER_KEY, JSON.stringify(token));
};
