const UserService = require("../services/Developers/developersService");

async function auth(req) {
  try {
    username = req.params.login || req.query.login || req.body.login ;
    //Check if the user should be authenticated by local server or by Ldap server
    const user = await UserService.getOneDev({ login: username });
    
    if (!user) {
      throw new Error("Utilisateur non existant ! \r\n\r\n Veuillez contacter votre administrateur et signaler votre problème!");
    }
    if (user.isLdap != true) {
      return { user: user, typeAuth: "local" };
    }
    return { user: user, typeAuth: "ldap" };

  } catch (e) {
    console.error(e);
    throw new Error(e.message);

  }
}

module.exports = auth;
