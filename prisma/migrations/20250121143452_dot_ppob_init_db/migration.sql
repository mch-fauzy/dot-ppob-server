-- CreateTable
CREATE TABLE "dot_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "profile_image" TEXT,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" TEXT,

    CONSTRAINT "dot_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dot_services" (
    "id" SERIAL NOT NULL,
    "service_code" TEXT NOT NULL,
    "service_name" TEXT NOT NULL,
    "service_tariff" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" TEXT,

    CONSTRAINT "dot_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dot_transactions" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "service_id" INTEGER,
    "transaction_type" TEXT NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" TEXT,

    CONSTRAINT "dot_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dot_users_email_key" ON "dot_users"("email");

-- CreateIndex
CREATE INDEX "dot_users_deleted_at_idx" ON "dot_users"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "dot_services_service_code_key" ON "dot_services"("service_code");

-- CreateIndex
CREATE INDEX "dot_services_deleted_at_idx" ON "dot_services"("deleted_at");

-- CreateIndex
CREATE INDEX "dot_transactions_user_id_service_id_transaction_type_create_idx" ON "dot_transactions"("user_id", "service_id", "transaction_type", "created_at", "invoice_number");

-- AddForeignKey
ALTER TABLE "dot_transactions" ADD CONSTRAINT "dot_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "dot_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dot_transactions" ADD CONSTRAINT "dot_transactions_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "dot_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
