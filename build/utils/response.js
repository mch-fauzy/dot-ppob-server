"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseWithMetadata = exports.responseWithData = exports.responseWithMessage = void 0;
const responseWithMessage = (res, code, message) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(code).send({ message: message });
};
exports.responseWithMessage = responseWithMessage;
const responseWithData = (res, code, data) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(code).json({ data: data });
};
exports.responseWithData = responseWithData;
const responseWithMetadata = (res, code, data, metadata) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(code).json({ data: data, metadata: metadata });
};
exports.responseWithMetadata = responseWithMetadata;
//# sourceMappingURL=response.js.map