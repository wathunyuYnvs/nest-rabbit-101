-- CreateTable
CREATE TABLE `CirteriaType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cirteria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `criteria_type_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conditions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `criteria_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cirteria` ADD CONSTRAINT `Cirteria_criteria_type_id_fkey` FOREIGN KEY (`criteria_type_id`) REFERENCES `CirteriaType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conditions` ADD CONSTRAINT `conditions_criteria_id_fkey` FOREIGN KEY (`criteria_id`) REFERENCES `Cirteria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
