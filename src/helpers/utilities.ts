// TODO arrumar objeto de user

interface User {
  id?: number,
  firstName?: string,
}

type UserSession = User | undefined;

export const setCurrentUser = (user: UserSession) => {
  try {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
  }
};

export const getCurrentUser = () => {
  let user;
  try {
    user =
      localStorage.getItem('user') != null
        ? JSON.parse(localStorage.getItem('user') ?? "")
        : null;
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
    user = null;
  }
  return user;
};