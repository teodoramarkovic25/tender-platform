const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers',
    'getEvaluator', 'manageEvaluator',
    'getTenders', 'manageTenders',
    'getOffers', 'manageOffers'],
  vendor: ['getOffers', 'manageOffers'],

};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
