-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('TikTok', 'Instagram', 'Others');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('Package', 'Service', 'CustomService', 'Account');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Niezrealizowane', 'Zrealizowane');

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "list" TEXT[],
    "image" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "category" "ServiceCategory" NOT NULL,
    "type" "ServiceType" NOT NULL,
    "requireLink" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "contents" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "customerId" INTEGER,
    "dateOfPurchase" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
