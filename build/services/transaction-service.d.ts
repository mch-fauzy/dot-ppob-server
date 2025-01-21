import { TransactionTopUpBalanceByEmailRequest, TransactionGetByEmailRequest, TransactionPaymentByEmailRequest, TransactionGetListByEmailRequest, TransactionListWithMetadataResponse, TransactionWithCacheMetadataResponse, TransactionBalanceWithCacheMetadataResponse } from '../models/dto/transaction-dto';
declare class TransactionService {
    static topUpBalanceByEmail: (req: TransactionTopUpBalanceByEmailRequest) => Promise<string>;
    static paymentByEmail: (req: TransactionPaymentByEmailRequest) => Promise<string>;
    static getBalanceByEmail: (req: TransactionGetByEmailRequest) => Promise<TransactionBalanceWithCacheMetadataResponse>;
    static getLatestByEmail: (req: TransactionGetByEmailRequest) => Promise<TransactionWithCacheMetadataResponse>;
    static getListByEmail: (req: TransactionGetListByEmailRequest) => Promise<TransactionListWithMetadataResponse>;
}
export { TransactionService };
