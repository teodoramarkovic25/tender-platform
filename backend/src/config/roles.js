const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers' ,'getTenders', 'manageTenders'],
  vendor: ['getOffers', 'manageOffers'],

};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
