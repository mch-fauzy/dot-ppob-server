"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const user_repository_1 = require("../repositories/user-repository");
const user_model_1 = require("../models/user-model");
const failure_1 = require("../utils/failure");
const transaction_repository_1 = require("../repositories/transaction-repository");
const generate_invoice_number_1 = require("../utils/generate-invoice-number");
const service_repository_1 = require("../repositories/service-repository");
const service_model_1 = require("../models/service-model");
const transaction_model_1 = require("../models/transaction-model");
const prisma_client_1 = require("../configs/prisma-client");
const error_handler_1 = require("../utils/error-handler");
const redis_cache_1 = require("../utils/redis-cache");
const constant_1 = require("../utils/constant");
const calculate_pagination_1 = require("../utils/calculate-pagination");
class TransactionService {
    static topUpBalanceByEmail = async (req) => {
        try {
            const [users, totalUsers] = await user_repository_1.UserRepository.findManyAndCountByFilter({
                selectFields: [user_model_1.USER_DB_FIELD.id, user_model_1.USER_DB_FIELD.balance],
                filterFields: [
                    {
                        field: user_model_1.USER_DB_FIELD.email,
                        operator: 'equals',
                        value: req.email,
                    },
                ],
            });
            if (totalUsers === BigInt(0))
                throw failure_1.Failure.notFound('User with this email not found');
            const user = users[0];
            // Simulate top-up logic, ideally will have confirmation if user already pay for topup
            // Wrap the repository operations in a transaction
            await prisma_client_1.prismaClient.$transaction(async (tx) => {
                await transaction_repository_1.TransactionRepository.create({
                    userId: user.id,
                    serviceId: null,
                    transactionType: req.transactionType,
                    totalAmount: req.topUpAmount,
                    invoiceNumber: (0, generate_invoice_number_1.generateInvoiceNumber)(),
                    createdBy: req.email,
                    updatedBy: req.email,
                    updatedAt: new Date(),
                }, tx);
                await user_repository_1.UserRepository.updateById({
                    id: user.id,
                    data: {
                        balance: user.balance + req.topUpAmount,
                        updatedBy: req.email,
                        updatedAt: new Date(),
                    },
                    tx,
                });
            });
            // Delete all cache
            await Promise.all([
                redis_cache_1.RedisUtils.deleteCacheByKey(`${constant_1.CONSTANT.REDIS.TRANSACTION_KEY}:${req.email}`),
                redis_cache_1.RedisUtils.deleteCacheFromSet(`${constant_1.CONSTANT.REDIS.TRANSACTION_SET_KEY}:${req.email}`),
            ]);
            return 'Success';
        }
        catch (error) {
            throw (0, error_handler_1.handleError)({
                operationName: 'TransactionService.topUpBalanceByEmail',
                error,
            });
        }
    };
    static paymentByEmail = async (req) => {
        try {
            const [users, totalUsers] = await user_repository_1.UserRepository.findManyAndCountByFilter({
                selectFields: [user_model_1.USER_DB_FIELD.id, user_model_1.USER_DB_FIELD.balance],
                filterFields: [
                    {
                        field: user_model_1.USER_DB_FIELD.email,
                        operator: 'equals',
                        value: req.email,
                    },
                ],
            });
            if (totalUsers === BigInt(0))
                throw failure_1.Failure.notFound('User with this email not found');
            const user = users[0];
            const [services, totalServices] = await service_repository_1.ServiceRepository.findManyAndCountByFilter({
                selectFields: [service_model_1.serviceDbField.id, service_model_1.serviceDbField.serviceTariff],
                filterFields: [
                    {
                        field: service_model_1.serviceDbField.serviceCode,
                        operator: 'equals',
                        value: req.serviceCode,
                    },
                ],
            });
            if (totalServices === BigInt(0))
                throw failure_1.Failure.notFound('Service with this code not found');
            const service = services[0];
            // Simulate payment logic, ideally will have confirmation if user already pay for payment
            if (user.balance < service.serviceTariff)
                throw failure_1.Failure.badRequest('Insufficient balance to make the payment');
            // Wrap the repository operations in a transaction
            await prisma_client_1.prismaClient.$transaction(async (tx) => {
                await transaction_repository_1.TransactionRepository.create({
                    userId: user.id,
                    serviceId: service.id,
                    transactionType: req.transactionType,
                    totalAmount: service.serviceTariff,
                    invoiceNumber: (0, generate_invoice_number_1.generateInvoiceNumber)(),
                    createdBy: req.email,
                    updatedBy: req.email,
                    updatedAt: new Date(),
                }, tx);
                await user_repository_1.UserRepository.updateById({
                    id: user.id,
                    data: {
                        balance: user.balance - service.serviceTariff,
                        updatedBy: req.email,
                        updatedAt: new Date(),
                    },
                    tx,
                });
            });
            // Delete all cache
            await Promise.all([
                redis_cache_1.RedisUtils.deleteCacheByKey(`${constant_1.CONSTANT.REDIS.TRANSACTION_KEY}:${req.email}`),
                redis_cache_1.RedisUtils.deleteCacheFromSet(`${constant_1.CONSTANT.REDIS.TRANSACTION_SET_KEY}:${req.email}`),
            ]);
            return 'Success';
        }
        catch (error) {
            throw (0, error_handler_1.handleError)({
                operationName: 'TransactionService.paymentByEmail',
                error,
            });
        }
    };
    static getBalanceByEmail = async (req) => {
        try {
            const transactionKey = `${constant_1.CONSTANT.REDIS.TRANSACTION_KEY}:${req.email}`;
            const transactionCache = await redis_cache_1.RedisUtils.getCacheByKey(transactionKey);
            if (transactionCache) {
                const response = JSON.parse(transactionCache);
                response.metadata.isFromCache = true;
                return response;
            }
            const [users, totalUsers] = await user_repository_1.UserRepository.findManyAndCountByFilter({
                selectFields: [user_model_1.USER_DB_FIELD.balance],
                filterFields: [
                    {
                        field: user_model_1.USER_DB_FIELD.email,
                        operator: 'equals',
                        value: req.email,
                    },
                ],
            });
            if (totalUsers === BigInt(0))
                throw failure_1.Failure.notFound('User with this email not found');
            const user = users[0];
            const response = {
                data: {
                    balance: user.balance,
                },
                metadata: {
                    isFromCache: false,
                },
            };
            await redis_cache_1.RedisUtils.storeCacheWithExpiry(transactionKey, constant_1.CONSTANT.REDIS.CACHE_EXPIRY, JSON.stringify(response));
            return response;
        }
        catch (error) {
            throw (0, error_handler_1.handleError)({
                operationName: 'TransactionService.getBalanceByEmail',
                error,
            });
        }
    };
    static getLatestByEmail = async (req) => {
        try {
            const transactionKey = `${constant_1.CONSTANT.REDIS.TRANSACTION_KEY}:${req.email}`;
            const transactionCache = await redis_cache_1.RedisUtils.getCacheByKey(transactionKey);
            if (transactionCache) {
                const response = JSON.parse(transactionCache);
                response.metadata.isFromCache = true;
                return response;
            }
            const [users, totalUsers] = await user_repository_1.UserRepository.findManyAndCountByFilter({
                selectFields: [user_model_1.USER_DB_FIELD.id],
                filterFields: [
                    {
                        field: user_model_1.USER_DB_FIELD.email,
                        operator: 'equals',
                        value: req.email,
                    },
                ],
            });
            if (totalUsers === BigInt(0))
                throw failure_1.Failure.notFound('User with this email not found');
            const user = users[0];
            const [transactions, totalTransactions] = await transaction_repository_1.TransactionRepository.findManyAndCountByFilter({
                selectFields: [
                    transaction_model_1.transactionDbField.serviceId,
                    transaction_model_1.transactionDbField.invoiceNumber,
                    transaction_model_1.transactionDbField.transactionType,
                    transaction_model_1.transactionDbField.totalAmount,
                    transaction_model_1.transactionDbField.createdAt,
                ],
                filterFields: [
                    {
                        field: transaction_model_1.transactionDbField.userId,
                        operator: 'equals',
                        value: user.id,
                    },
                ],
                sorts: [
                    {
                        field: transaction_model_1.transactionDbField.createdAt,
                        order: 'desc',
                    },
                ],
            });
            if (totalTransactions === BigInt(0))
                throw failure_1.Failure.notFound('Transaction not found');
            const transaction = transactions[0];
            const [services, totalServices] = await service_repository_1.ServiceRepository.findManyAndCountByFilter({
                selectFields: [
                    service_model_1.serviceDbField.serviceCode,
                    service_model_1.serviceDbField.serviceName,
                ],
                filterFields: [
                    {
                        field: service_model_1.serviceDbField.id,
                        operator: 'equals',
                        value: transaction.serviceId,
                    },
                ],
            });
            if (totalServices === BigInt(0))
                throw failure_1.Failure.notFound('Service not found');
            const service = services[0];
            const response = {
                data: {
                    invoiceNumber: transaction.invoiceNumber,
                    serviceCode: service.serviceCode,
                    serviceName: service.serviceName,
                    transactionType: transaction.transactionType,
                    totalAmount: transaction.totalAmount,
                    createdAt: transaction.createdAt.toISOString(),
                },
                metadata: {
                    isFromCache: false,
                },
            };
            await redis_cache_1.RedisUtils.storeCacheWithExpiry(transactionKey, constant_1.CONSTANT.REDIS.CACHE_EXPIRY, JSON.stringify(response));
            return response;
        }
        catch (error) {
            throw (0, error_handler_1.handleError)({
                operationName: 'TransactionService.getLatestByEmail',
                error,
            });
        }
    };
    static getListByEmail = async (req) => {
        try {
            const transactionKey = redis_cache_1.RedisUtils.generateHashedCacheKey(constant_1.CONSTANT.REDIS.TRANSACTION_KEY, req);
            const transactionache = await redis_cache_1.RedisUtils.getCacheByKey(transactionKey);
            if (transactionache) {
                const response = JSON.parse(transactionache);
                response.metadata.isFromCache = true;
                return response;
            }
            const [users, totalUsers] = await user_repository_1.UserRepository.findManyAndCountByFilter({
                selectFields: [user_model_1.USER_DB_FIELD.id],
                filterFields: [
                    {
                        field: user_model_1.USER_DB_FIELD.email,
                        operator: 'equals',
                        value: req.email,
                    },
                ],
            });
            if (totalUsers === BigInt(0))
                throw failure_1.Failure.notFound('User with this email not found');
            const user = users[0];
            const [transactions, totalTransactions] = await transaction_repository_1.TransactionRepository.findManyAndCountByFilter({
                selectFields: [
                    transaction_model_1.transactionDbField.serviceId,
                    transaction_model_1.transactionDbField.invoiceNumber,
                    transaction_model_1.transactionDbField.transactionType,
                    transaction_model_1.transactionDbField.totalAmount,
                    transaction_model_1.transactionDbField.createdAt,
                ],
                filterFields: [
                    {
                        field: transaction_model_1.transactionDbField.userId,
                        operator: 'equals',
                        value: user.id,
                    },
                ],
                sorts: [
                    {
                        field: transaction_model_1.transactionDbField.createdAt,
                        order: 'desc',
                    },
                ],
                pagination: {
                    page: req.page,
                    pageSize: req.pageSize,
                },
            });
            const [services] = await service_repository_1.ServiceRepository.findManyAndCountByFilter({
                selectFields: [service_model_1.serviceDbField.id, service_model_1.serviceDbField.serviceName],
            });
            const pagination = (0, calculate_pagination_1.calculatePaginationMetadata)(Number(totalTransactions), req.page, req.pageSize ? req.pageSize : Number(totalTransactions));
            const response = {
                data: transactions.map(transaction => {
                    // Find service by transaction.serviceId
                    const service = services.find(service => service.id === transaction.serviceId);
                    return {
                        invoiceNumber: transaction.invoiceNumber,
                        transactionType: transaction.transactionType,
                        description: service ? service.serviceName : null,
                        totalAmount: transaction.totalAmount,
                        createdAt: transaction.createdAt.toISOString(),
                    };
                }),
                metadata: {
                    totalPages: pagination.totalPages,
                    currentPage: pagination.currentPage,
                    nextPage: pagination.nextPage,
                    previousPage: pagination.previousPage,
                    isFromCache: false,
                },
            };
            await Promise.all([
                redis_cache_1.RedisUtils.storeCacheWithExpiry(transactionKey, constant_1.CONSTANT.REDIS.CACHE_EXPIRY, JSON.stringify(response)),
                redis_cache_1.RedisUtils.addCacheToSet(`${constant_1.CONSTANT.REDIS.TRANSACTION_SET_KEY}:${req.email}`, transactionKey),
            ]);
            return response;
        }
        catch (error) {
            throw (0, error_handler_1.handleError)({
                operationName: 'TransactionService.getListByEmail',
                error,
            });
        }
    };
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction-service.js.map