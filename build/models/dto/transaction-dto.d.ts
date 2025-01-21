import { TransactionType } from '../transaction-model';
import { ServiceCode } from '../service-model';
import { CacheMetadata, Metadata } from './metadata';
interface TransactionGetByEmailRequest {
    email: string;
}
interface TransactionGetListByEmailRequest extends TransactionGetByEmailRequest {
    page: number;
    pageSize?: number;
}
interface TransactionBaseRequest {
    email: string;
    transactionType: TransactionType;
}
interface TransactionTopUpBalanceByEmailRequest extends TransactionBaseRequest {
    topUpAmount: number;
}
interface TransactionPaymentByEmailRequest extends TransactionBaseRequest {
    serviceCode: ServiceCode;
}
interface TransactionResponse {
    invoiceNumber: string;
    serviceCode: string;
    serviceName: string;
    transactionType: string;
    totalAmount: number;
    createdAt: string;
}
interface TransactionListResponse {
    invoiceNumber: string;
    transactionType: string;
    description: string | null;
    totalAmount: number;
    createdAt: string;
}
interface TransactionBalanceResponse {
    balance: number;
}
interface TransactionWithCacheMetadataResponse {
    data: TransactionResponse;
    metadata: CacheMetadata;
}
interface TransactionListWithMetadataResponse {
    data: TransactionListResponse[];
    metadata: Metadata;
}
interface TransactionBalanceWithCacheMetadataResponse {
    data: TransactionBalanceResponse;
    metadata: CacheMetadata;
}
declare class TransactionValidator {
    private static getByEmailRequestValidator;
    static validateGetByEmailRequest: (req: TransactionGetByEmailRequest) => Promise<TransactionGetByEmailRequest>;
    private static getListByEmailRequestValidator;
    static validateGetListByEmailRequest: (req: TransactionGetListByEmailRequest) => Promise<TransactionGetListByEmailRequest>;
    private static topUpBalanceByEmailRequestValidator;
    static validateTopUpBalanceByEmailRequest: (req: TransactionTopUpBalanceByEmailRequest) => Promise<TransactionTopUpBalanceByEmailRequest>;
    private static paymentByEmailRequestValidator;
    static validatePaymentByEmailRequest: (req: TransactionPaymentByEmailRequest) => Promise<TransactionPaymentByEmailRequest>;
}
export { TransactionGetByEmailRequest, TransactionGetListByEmailRequest, TransactionTopUpBalanceByEmailRequest, TransactionPaymentByEmailRequest, TransactionWithCacheMetadataResponse, TransactionBalanceWithCacheMetadataResponse, TransactionListWithMetadataResponse, TransactionValidator, };
