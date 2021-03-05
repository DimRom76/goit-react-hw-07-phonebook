const getIsAuthenticated = state => state.auth.isAuthenticated;

const getError = state => state.auth.error;

const getLoading = state => state.auth.loading;

const getUsername = state => state.auth.user.name;

const selectors = {
  getIsAuthenticated,
  getUsername,
  getError,
  getLoading,
};

export default selectors;
