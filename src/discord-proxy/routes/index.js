const DiscordProxyController = require('../controllers/discord-proxy-controller');

class Router {
    constructor(express) {
        const router = express.Router();
        const app = express();

        router.route('/Oauth2/authorize')
            .get(DiscordProxyController.handleAuthorize);

        router.route('/Oauth2/refresh')
            .post(DiscordProxyController.handleRefreshToken);

        router.route('/Oauth2/revoke')
            .post(DiscordProxyController.handleRevokeToken);

        app.use('/', router);

        return app;
    }
}

module.exports = Router;
