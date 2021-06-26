import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAuthenticate } from './middlewares/ensureAuthenticated';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

const router = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();

router.post('/users', createUserController.handle);
router.get('/users', listUsersController.handle);
router.post(
  '/tags',
  ensureAuthenticate,
  ensureAdmin,
  createTagController.handle
);
router.get('/tags', ensureAuthenticate, ensureAdmin, listTagsController.handle);

router.post('/login', authenticateUserController.handle);
router.post(
  '/compliments',
  ensureAuthenticate,
  createComplimentController.handle
);

router.get(
  '/users/compliments/send',
  ensureAuthenticate,
  listUserSendComplimentsController.handle
);
router.get(
  '/users/compliments/receive',
  ensureAuthenticate,
  listUserReceiveComplimentsController.handle
);

export { router };
