const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'getEvaluator', 'manageEvaluator','getOffers','manageOffers','getTenders','manageTenders'],
  vendor: ['getOffers', 'manageOffers'],
  tender: ['getTenders', 'manageTenders'],
  

};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
