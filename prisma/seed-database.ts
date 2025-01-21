import {Prisma} from '@prisma/client';

import {prismaClient} from '../configs/prisma-client';
import {logInfo} from '../utils/logger';
import {handleError} from '../utils/error-handler';

const insertServicesQuery = Prisma.sql`
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

const seedDatabase = async (): Promise<void> => {
  try {
    await prismaClient.$transaction([
      prismaClient.$executeRaw(insertServicesQuery),
    ]);

    logInfo('Seeding complete');
  } catch (error) {
    throw handleError({
      operationName: 'seedDatabase',
      error,
    });
  }
};

/** void: Explicitly ignore the return result of a function */
void seedDatabase();
