"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma_client_1 = require("../configs/prisma-client");
const logger_1 = require("../utils/logger");
const error_handler_1 = require("../utils/error-handler");
const insertServicesQuery = client_1.Prisma.sql `
INSERT INTO dot_services (service_code, service_name, service_tariff, updated_at)
VALUES
  ('PAJAK', 'Pajak PBB', 40000, NOW()),
  ('PLN', 'Listrik', 10000, NOW()),
  ('PDAM', 'PDAM Berlangganan', 40000, NOW()),
  ('PULSA', 'Pulsa', 40000, NOW()),
  ('PGN', 'PGN Berlangganan', 50000, NOW()),
  ('MUSIK', 'Musik Berlangganan', 50000, NOW()),
  ('TV', 'TV Berlangganan', 50000, NOW()),
  ('PAKET_DATA', 'Paket Data', 50000, NOW()),
  ('VOUCHER_GAME', 'Voucher Game', 100000, NOW()),
  ('VOUCHER_MAKANAN', 'Voucher Makanan', 100000, NOW()),
  ('QURBAN', 'Qurban', 200000, NOW()),
  ('ZAKAT', 'Zakat', 300000, NOW());
`;
const seedDatabase = async () => {
    try {
        await prisma_client_1.prismaClient.$transaction([
            prisma_client_1.prismaClient.$executeRaw(insertServicesQuery),
        ]);
        (0, logger_1.logInfo)('Seeding complete');
    }
    catch (error) {
        throw (0, error_handler_1.handleError)({
            operationName: 'seedDatabase',
            error,
        });
    }
};
/** void: Explicitly ignore the return result of a function */
void seedDatabase();
//# sourceMappingURL=seed-database.js.map