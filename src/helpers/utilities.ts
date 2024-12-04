// TODO arrumar objeto de user

interface User {
  firstName: string,
  lastName: string,
  id: number,
  email: string,
}

export const setCurrentUser = (user: User) => {
  try {
    if (user) {
      localStorage.setItem('hsp_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hsp_current_user');
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