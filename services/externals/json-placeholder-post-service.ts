import {axiosInstance} from '../../configs/axios';
import {
  JsonPlaceholderPostCreateRequest,
  JsonPlaceholderPostPartialUpdateByIdRequest,
  JsonPlaceholderPostByIdRequest,
  JsonPlaceholderPostUpdateByIdRequest,
} from '../../models/dto/externals/json-placeholder-post-dto';
import {handleError} from '../../utils/error-handler';

class JsonPlaceholderPostService {
  static getList = async () => {
    try {
      const response = await axiosInstance.get('/posts');
      return response;
    } catch (error) {
      throw handleError({
        operationName: 'JsonPlaceholderPostService.getList',
        error,
      });
    }
  };

  static getById = async (req: JsonPlaceholderPostByIdRequest) => {
    try {
      const response = await axiosInstance.get(`/posts/${req.id}`);
      return response;
    } catch (error) {
      throw handleError({
        operationName: 'JsonPlaceholderPostService.getById',
        error,
      });
    }
  };

  static create = async (req: JsonPlaceholderPostCreateRequest) => {
    try {
      const response = await axiosInstance.post('/posts', req);
      return response;
    } catch (error) {
      throw handleError({
        operationName: 'JsonPlaceholderPostService.create',
        error,
      });
    }
  };

  static updateById = async (req: JsonPlaceholderPostUpdateByIdRequest) => {
    try {
      const response = await axiosInstance.put(`/posts/${req.id}`, {
        title: req.title,
        body: req.body,
        userId: req.userId,
      });

      return response;
    } catch (error) {
      throw handleError({
        operationName: 'JsonPlaceholderPostService.updateById',
        error,
      });
    }
  };

  static partialUpdateById = async (
    req: JsonPlaceholderPostPartialUpdateByIdRequest,
  ) => {
    try {
      const response = await axiosInstance.patch(`/posts/${req.id}`, {
        title: req.title,
        body: req.body,
        userId: req.userId,
      });

      return response;
    } catch (error) {
      throw handleError({
        operationName: 'JsonPlaceholderPostService.partialUpdateById',
        error,
      });
    }
  };

  static deleteById = async (req: JsonPlaceholderPostByIdRequest) => {
    try {
      await axiosInstance.delete(`/posts/${req.id}`);
      return 'Success';
    } catch (error) {
      throw handleError({
        operationName: 'JsonPlaceholderPostService.deleteById',
        error,
      });
    }
  };
}

export {JsonPlaceholderPostService};
