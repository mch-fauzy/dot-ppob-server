import {Router} from 'express';
import {JsonPlaceholderPostController} from '../../../controllers/externals/json-placeholder-post-controller';

const jsonPlaceholderPostRouterV1 = Router();

jsonPlaceholderPostRouterV1.get(
  '/posts',
  JsonPlaceholderPostController.getList,
);
jsonPlaceholderPostRouterV1.get(
  '/posts/:id',
  JsonPlaceholderPostController.getById,
);
jsonPlaceholderPostRouterV1.post(
  '/posts',
  JsonPlaceholderPostController.create,
);
jsonPlaceholderPostRouterV1.put(
  '/posts/:id',
  JsonPlaceholderPostController.updateById,
);
jsonPlaceholderPostRouterV1.patch(
  '/posts/:id',
  JsonPlaceholderPostController.partialUpdateById,
);
jsonPlaceholderPostRouterV1.delete(
  '/posts/:id',
  JsonPlaceholderPostController.deleteById,
);

export {jsonPlaceholderPostRouterV1};
