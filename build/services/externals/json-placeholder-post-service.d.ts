import { JsonPlaceholderPostCreateRequest, JsonPlaceholderPostPartialUpdateByIdRequest, JsonPlaceholderPostByIdRequest, JsonPlaceholderPostUpdateByIdRequest } from '../../models/dto/externals/json-placeholder-post-dto';
declare class JsonPlaceholderPostService {
    static getList: () => Promise<import("axios").AxiosResponse<any, any>>;
    static getById: (req: JsonPlaceholderPostByIdRequest) => Promise<import("axios").AxiosResponse<any, any>>;
    static create: (req: JsonPlaceholderPostCreateRequest) => Promise<import("axios").AxiosResponse<any, any>>;
    static updateById: (req: JsonPlaceholderPostUpdateByIdRequest) => Promise<import("axios").AxiosResponse<any, any>>;
    static partialUpdateById: (req: JsonPlaceholderPostPartialUpdateByIdRequest) => Promise<import("axios").AxiosResponse<any, any>>;
    static deleteById: (req: JsonPlaceholderPostByIdRequest) => Promise<string>;
}
export { JsonPlaceholderPostService };
