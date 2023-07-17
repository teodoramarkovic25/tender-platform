const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'getTenders', 'manageTenders', 'getOffers', 'manageOffers'],
  vendor: ['getOffers', 'manageOffers'],

};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
