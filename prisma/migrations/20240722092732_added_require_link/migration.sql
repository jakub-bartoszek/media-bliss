-- AlterSequence
ALTER SEQUENCE "Customer_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "Order_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "requireLink" STRING;
ALTER TABLE "Service" ALTER COLUMN "description" DROP NOT NULL;
ALTER TABLE "Service" ALTER COLUMN "image" DROP NOT NULL;