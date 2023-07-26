const allRoles = {
  user: [],
  admin: [
    'getUsers', 'manageUsers',
    'getTenders', 'manageTenders',
    'getOffers', 'manageOffers',
    'getCompanies', 'manageCompanies',
    'getFiles', 'manageFiles'],
  vendor: ['getOffers', 'manageOffers'
    , 'getTenders', 'manageTenders',
    'getFiles', 'manageFiles'
  ],

};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
