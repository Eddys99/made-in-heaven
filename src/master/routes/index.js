const PostJobsController = require('../controllers/post-job-controller');

class Router {
    constructor(express) {
        const router = express.Router();
        const app = express();

        router.route('/save-post')
            .post(PostJobsController.saveJob);

        router.route('/post')
            .post(PostJobsController.testPost);

        app.use('/', router);

        return app;
    }
}

module.exports = Router;
