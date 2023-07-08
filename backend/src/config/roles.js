const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
  vendor: ['getOffers', 'manageOffers'],
  tender: ['getTenders', 'manageTenders']

};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
