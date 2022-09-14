const PostsController = require('../controllers/posts-controller');

class Router {
    constructor(express) {
        const router = express.Router();
        const app = express();

        router.route('/post')
            .post(PostsController.makePost);

        app.use('/', router);

        return app;
    }
}

module.exports = Router;
