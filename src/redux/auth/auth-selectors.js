const getIsAuthenticated = state => Boolean(state.auth.token);

const getUsername = state => state.auth.user.name;

const selectors = {
  getIsAuthenticated,
  getUsername,
};

export default selectors;
