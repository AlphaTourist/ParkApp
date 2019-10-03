var jwt = require('jsonwebtoken');
const config = require("../config/config");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Role = require("../models/role");


module.exports = {

    login: async (req, res, next) => {
        const user = await User.findOne({ email: req.body.email });
    

        if(user === null) return res.status(404).send({ reason: 'Utilisateur introuvable.' });

        const role = await Role.findById(user.role);

        var passwordIsValid = await bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, accessToken: null, reason: 'Invalide Password!' });
        }

        var token = jwt.sign({ id: user.id, roleId: user.role, roleName: role.name }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
        });

        let currentUser = { ...user }._doc;
        currentUser.token = token;

        if(req.session && req.session.users && req.session.users.length >= 1){

            const users = req.session.users;

            try{
                const index = users.findIndex((u) => u.id === currentUser._id);
                if(index === -1){
                    req.session.users.push(currentUser);
                }else{
                    users[index] = currentUser;
                }
            }catch(e){
                req.session.users.push(currentUser);
            }

        }else{
            req.session.users = [currentUser];
        }

        res.status(200).send({
            auth: true,
            login: currentUser,
            authorities: role.name
        });
    },

    logout: async (req, res, next) => {
        const logout = require('../helpers/logout');
        logout.logoutUser(req, res, function(err, data) {
            if (err) {
              res.json({ 'error': data.error, 'message': data.message });
            } else {
                res.json({ 'success': data.success, 'message': data.message });
            }
        });
    },

    accessToken: async (req, res, next) => {
        let userId = req.user._id;
        const user = await User.findById(userId);
        res.status(200).json(user);
    }


}