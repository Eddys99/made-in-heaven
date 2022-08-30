const MasterController = require('../controllers/master-controller');

class Router {
    constructor(express) {
        const router = express.Router();
        const app = express();

        router.route('/register-user')
            .post(MasterController.registerUser);

        router.route('/save-post')
            .post(MasterController.saveJob);

        router.route('/post')
            .post(MasterController.testPost);

        app.use('/', router);

        return app;
    }
}

module.exports = Router;
