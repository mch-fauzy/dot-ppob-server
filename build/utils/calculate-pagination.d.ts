import { PaginationMetadata } from '../models/dto/metadata';
declare const calculatePaginationMetadata: (totalRows: number, currentPage: number, pageSize: number) => PaginationMetadata;
export { calculatePaginationMetadata };
