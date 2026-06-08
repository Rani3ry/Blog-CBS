-- CreateTable
CREATE TABLE `user` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_Email_key`(`Email`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
