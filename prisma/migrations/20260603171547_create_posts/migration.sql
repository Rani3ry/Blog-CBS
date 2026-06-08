-- CreateTable
CREATE TABLE `posts` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Titulo` VARCHAR(191) NOT NULL,
    `Slug` VARCHAR(191) NOT NULL,
    `Resumo` VARCHAR(191) NOT NULL,
    `Conteudo` TEXT NOT NULL,
    `Publicado` BOOLEAN NOT NULL DEFAULT false,
    `CriadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `AtualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `posts_Slug_key`(`Slug`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
