const { User } = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'last_name', 'email', 'image']
            });

            let usersAPI = users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    image: 'http://localhost:3001/images/users/' + user.image,
                    detail: '/user/api/' + user.id + '/detail'
                }
            });

            let respuesta = {
                count: users.length,
                users: usersAPI
            }

            res.status(200).json(respuesta);
        } catch (error) {
            res.json(error);
        }
    },

    detail: async (req, res) => {
        try {
            const findUser = await User.findByPk(req.params.id);

            let respuesta = {
                user: {
                    name: findUser.name,
                    last_name: findUser.last_name,
                    email: findUser.email,
                },
                url: 'http://localhost:3001/images/users/' + findUser.image
            }

            res.status(200).json(respuesta);
        } catch (error) {
            res.send(error);
        }
    }
}