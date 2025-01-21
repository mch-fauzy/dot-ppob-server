import type { MembershipRegisterRequest, MembershipLoginRequest, MembershipGetByEmailRequest, MembershipUpdateProfileByEmailRequest, MembershipUpdateProfileImageByEmailRequest, MembershipUpdateProfileImageCloudinaryByEmailRequest, MembershipWithCacheMetadataResponse } from '../models/dto/membership-dto';
declare class MembershipService {
    static register: (req: MembershipRegisterRequest) => Promise<string>;
    static login: (req: MembershipLoginRequest) => Promise<import("../models/dto/membership-dto").MembershipLoginResponse>;
    static getByEmail: (req: MembershipGetByEmailRequest) => Promise<MembershipWithCacheMetadataResponse>;
    static updateProfileByEmail: (req: MembershipUpdateProfileByEmailRequest) => Promise<string>;
    static updateProfileImageByEmail: (req: MembershipUpdateProfileImageByEmailRequest) => Promise<string>;
    static updateProfileImageCloudinaryByEmail: (req: MembershipUpdateProfileImageCloudinaryByEmailRequest) => Promise<string>;
}
export { MembershipService };
