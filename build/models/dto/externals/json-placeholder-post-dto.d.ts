interface JsonPlaceholderPostByIdRequest {
    id: number;
}
interface JsonPlaceholderPostCreateRequest {
    title: string;
    body: string;
    userId: number;
}
interface JsonPlaceholderPostUpdateByIdRequest extends JsonPlaceholderPostByIdRequest {
    title: string;
    body: string;
    userId: number;
}
export interface JsonPlaceholderPostPartialUpdateByIdRequest extends JsonPlaceholderPostByIdRequest {
    title?: string;
    body?: string;
    userId?: number;
}
declare class JsonPlaceholderPostValidator {
    private static byIdRequestValidator;
    static validateByIdRequest: (req: JsonPlaceholderPostByIdRequest) => Promise<JsonPlaceholderPostByIdRequest>;
    private static createRequestValidator;
    static validateCreateRequest: (req: JsonPlaceholderPostCreateRequest) => Promise<JsonPlaceholderPostCreateRequest>;
    private static updateByIdRequestValidator;
    static validateUpdateByIdRequest: (req: JsonPlaceholderPostUpdateByIdRequest) => Promise<JsonPlaceholderPostUpdateByIdRequest>;
    private static partialUpdateByIdRequestValidator;
    static validatePartialUpdateByIdRequest: (req: JsonPlaceholderPostPartialUpdateByIdRequest) => Promise<JsonPlaceholderPostPartialUpdateByIdRequest>;
}
export { JsonPlaceholderPostValidator, JsonPlaceholderPostByIdRequest, JsonPlaceholderPostCreateRequest, JsonPlaceholderPostUpdateByIdRequest, };
