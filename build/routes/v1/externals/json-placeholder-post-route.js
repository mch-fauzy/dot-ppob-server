"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonPlaceholderPostRouterV1 = void 0;
const express_1 = require("express");
const json_placeholder_post_controller_1 = require("../../../controllers/externals/json-placeholder-post-controller");
const jsonPlaceholderPostRouterV1 = (0, express_1.Router)();
exports.jsonPlaceholderPostRouterV1 = jsonPlaceholderPostRouterV1;
jsonPlaceholderPostRouterV1.get('/posts', json_placeholder_post_controller_1.JsonPlaceholderPostController.getList);
jsonPlaceholderPostRouterV1.get('/posts/:id', json_placeholder_post_controller_1.JsonPlaceholderPostController.getById);
jsonPlaceholderPostRouterV1.post('/posts', json_placeholder_post_controller_1.JsonPlaceholderPostController.create);
jsonPlaceholderPostRouterV1.put('/posts/:id', json_placeholder_post_controller_1.JsonPlaceholderPostController.updateById);
jsonPlaceholderPostRouterV1.patch('/posts/:id', json_placeholder_post_controller_1.JsonPlaceholderPostController.partialUpdateById);
jsonPlaceholderPostRouterV1.delete('/posts/:id', json_placeholder_post_controller_1.JsonPlaceholderPostController.deleteById);
//# sourceMappingURL=json-placeholder-post-route.js.map