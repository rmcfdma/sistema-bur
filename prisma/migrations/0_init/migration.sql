-- CreateTable
CREATE TABLE `bruds` (
    `ID_BRUDS` INTEGER NOT NULL AUTO_INCREMENT,
    `NOME` VARCHAR(45) NOT NULL,
    `ESTADO` VARCHAR(45) NOT NULL,
    `CIDADE` VARCHAR(45) NOT NULL,
    `ID_BUR` INTEGER NOT NULL,

    INDEX `INDEX_FK_BRUDS_BUR`(`ID_BUR`),
    PRIMARY KEY (`ID_BRUDS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bur` (
    `ID_BUR` INTEGER NOT NULL,
    `NOME` VARCHAR(45) NOT NULL,
    `CNPJ` VARCHAR(45) NOT NULL,
    `LOGO` VARCHAR(45) NULL,

    PRIMARY KEY (`ID_BUR`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `componentes` (
    `ID_COMPONENTES` INTEGER NOT NULL AUTO_INCREMENT,
    `NOME` VARCHAR(45) NOT NULL,
    `CPF` VARCHAR(45) NOT NULL,
    `DATA_NASCIMENTO` DATE NOT NULL,
    `LOGRADOURO` VARCHAR(45) NOT NULL,
    `NUMERO` VARCHAR(45) NOT NULL,
    `BAIRRO` VARCHAR(45) NOT NULL,
    `CIDADE` VARCHAR(45) NOT NULL,
    `ESTADO` VARCHAR(2) NOT NULL,
    `CEP` VARCHAR(8) NULL,
    `TELEFONE` VARCHAR(12) NOT NULL,
    `EMAIL` VARCHAR(45) NULL,
    `FOTO` VARCHAR(100) NULL,
    `TEFA` VARCHAR(15) NOT NULL,
    `DATA_INCLUSAO` DATE NULL,
    `ID_BRUDS` INTEGER NOT NULL,

    UNIQUE INDEX `CPF_UNIQUE`(`CPF`),
    UNIQUE INDEX `EMAIL_UNIQUE`(`EMAIL`),
    UNIQUE INDEX `FOTO_UNIQUE`(`FOTO`),
    UNIQUE INDEX `TEFA_UNIQUE`(`TEFA`),
    INDEX `INDEX_FK_COMPONENTES_BRUDS`(`ID_BRUDS`),
    PRIMARY KEY (`ID_COMPONENTES`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emprestimos` (
    `ID_PATRIMONIO` INTEGER NOT NULL,
    `ID_COMPONENTES` INTEGER NOT NULL,
    `DATA_INICIO` DATE NOT NULL,
    `DATA_FIM` DATE NULL,
    `ACESSORIOS` VARCHAR(45) NULL,
    `OBSERVACAO` VARCHAR(45) NULL,

    INDEX `INDEX_FK_EMPRESTIMOS_COMPONENTES`(`ID_COMPONENTES`),
    INDEX `INDEX_FK_EMPRESTIMOS_INSTRUMENTOS`(`ID_PATRIMONIO`),
    PRIMARY KEY (`ID_PATRIMONIO`, `ID_COMPONENTES`, `DATA_INICIO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventos` (
    `ID_EVENTOS` INTEGER NOT NULL,
    `DATA_INICIO` DATE NOT NULL,
    `DATA_FIM` DATE NOT NULL,
    `ESTADO` VARCHAR(2) NOT NULL,
    `CIDADE` VARCHAR(45) NOT NULL,
    `DESCRICAO` LONGTEXT NOT NULL,

    PRIMARY KEY (`ID_EVENTOS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fotos` (
    `ID_EVENTOS` INTEGER NOT NULL,
    `URL` VARCHAR(100) NOT NULL,
    `DESCRICAO` LONGTEXT NOT NULL,

    UNIQUE INDEX `URL_UNIQUE`(`URL`),
    PRIMARY KEY (`ID_EVENTOS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcoes` (
    `ID_FUNCOES` INTEGER NOT NULL AUTO_INCREMENT,
    `FUNCAO` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `FUNCAO_UNIQUE`(`FUNCAO`),
    PRIMARY KEY (`ID_FUNCOES`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcoes_componentes` (
    `ID_FUNCOES` INTEGER NOT NULL,
    `ID_COMPONENTES` INTEGER NOT NULL,
    `DATA_INICIO` DATE NULL,

    INDEX `INDEX_FK_FUNCOES_COMPONENTES_COMPONENTES`(`ID_COMPONENTES`),
    INDEX `INDEX_FK_FUNCOES_COMPONENTES_FUNCOES`(`ID_FUNCOES`),
    PRIMARY KEY (`ID_FUNCOES`, `ID_COMPONENTES`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `musicas` (
    `ID_MUSICAS` INTEGER NOT NULL AUTO_INCREMENT,
    `TITULO` VARCHAR(45) NOT NULL,
    `SUBTITULO` VARCHAR(45) NULL,
    `AUTOR` VARCHAR(45) NULL,
    `ARRANJO` VARCHAR(45) NULL,
    `DATA_INCLUSAO` DATE NOT NULL,
    `ID_TIPOS_MUSICA` INTEGER NOT NULL,
    `ID_BUR` INTEGER NOT NULL,

    UNIQUE INDEX `TITULO_UNIQUE`(`TITULO`),
    INDEX `INDEX_FK_MUSICAS_BUR`(`ID_BUR`),
    INDEX `INDEX_FK_MUSICAS_TIPO_MUSICA`(`ID_TIPOS_MUSICA`),
    PRIMARY KEY (`ID_MUSICAS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participacoes` (
    `ID_EVENTOS` INTEGER NOT NULL,
    `ID_BRUDS` INTEGER NOT NULL,
    `QTD_COMPONENTES` INTEGER NOT NULL,

    INDEX `INDEX_FK_PARTICIPACOES_BRUDS`(`ID_BRUDS`),
    INDEX `INDEX_FK_PARTICIPACOES_EVENTOS`(`ID_EVENTOS`),
    PRIMARY KEY (`ID_EVENTOS`, `ID_BRUDS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patrimonio` (
    `ID_PATRIMONIO` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_TIPOS_PADRIMONIO` INTEGER NOT NULL,
    `DATA_INCLUSAO` DATE NOT NULL,
    `DATA_EXCLUSAO` DATE NULL,
    `OBSERVACAO` VARCHAR(150) NULL,
    `DESCRICAO` VARCHAR(150) NULL,
    `MARCA` VARCHAR(45) NOT NULL,
    `ID_BRUDS` INTEGER NOT NULL,
    `NUM_SERIE` VARCHAR(45) NULL,
    `ACESSORIOS` LONGTEXT NULL,
    `NOME` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `NUM_SERIE_UNIQUE`(`NUM_SERIE`),
    UNIQUE INDEX `NOME_UNIQUE`(`NOME`),
    INDEX `INDEX_FK_INSTRUMENTOS_BRUDS_INDEX`(`ID_BRUDS`),
    INDEX `INDEX_FK_INSTRUMENTOS_TIPOS_INSTRUMENTO`(`ID_TIPOS_PADRIMONIO`),
    PRIMARY KEY (`ID_PATRIMONIO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_musica` (
    `ID_TIPOS_MUSICA` INTEGER NOT NULL AUTO_INCREMENT,
    `TIPO` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `TIPO_UNIQUE`(`TIPO`),
    PRIMARY KEY (`ID_TIPOS_MUSICA`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_patrimonio` (
    `ID_TIPO_PATRIMONIO` INTEGER NOT NULL AUTO_INCREMENT,
    `TIPO` VARCHAR(45) NULL,
    `DESCRICAO` VARCHAR(150) NULL,

    UNIQUE INDEX `TIPO_UNIQUE`(`TIPO`),
    PRIMARY KEY (`ID_TIPO_PATRIMONIO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `ID_USUARIOS` INTEGER NOT NULL AUTO_INCREMENT,
    `USERNAME` VARCHAR(45) NOT NULL,
    `PASSWORD` VARCHAR(45) NOT NULL,
    `FUNCOES_COMPONENTES_ID_FUNCOES` INTEGER NOT NULL,
    `FUNCOES_COMPONENTES_ID_COMPONENTES` INTEGER NOT NULL,
    `DATA_INCLUSAO` DATE NOT NULL,
    `DATA_EXCLUSAO` DATE NULL,

    UNIQUE INDEX `USERNAME_UNIQUE`(`USERNAME`),
    UNIQUE INDEX `FUNCOES_COMPONENTES_ID_COMPONENTES_UNIQUE`(`FUNCOES_COMPONENTES_ID_COMPONENTES`),
    INDEX `INDEX_FK_USUARIOS_FUNCOES_COMPONENTES`(`FUNCOES_COMPONENTES_ID_FUNCOES`, `FUNCOES_COMPONENTES_ID_COMPONENTES`),
    UNIQUE INDEX `usuarios_FUNCOES_COMPONENTES_ID_FUNCOES_FUNCOES_COMPONENTES__key`(`FUNCOES_COMPONENTES_ID_FUNCOES`, `FUNCOES_COMPONENTES_ID_COMPONENTES`),
    PRIMARY KEY (`ID_USUARIOS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bruds` ADD CONSTRAINT `FK_BRUDS_BUR` FOREIGN KEY (`ID_BUR`) REFERENCES `bur`(`ID_BUR`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `componentes` ADD CONSTRAINT `FK_COMPONENTES_BRUDS` FOREIGN KEY (`ID_BRUDS`) REFERENCES `bruds`(`ID_BRUDS`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `emprestimos` ADD CONSTRAINT `FK_EMPRESTIMOS_COMPONENTES` FOREIGN KEY (`ID_COMPONENTES`) REFERENCES `componentes`(`ID_COMPONENTES`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `emprestimos` ADD CONSTRAINT `FK_EMPRESTIMOS_PATRIMONIO` FOREIGN KEY (`ID_PATRIMONIO`) REFERENCES `patrimonio`(`ID_PATRIMONIO`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fotos` ADD CONSTRAINT `FK_FOTOS_EVENTOS` FOREIGN KEY (`ID_EVENTOS`) REFERENCES `eventos`(`ID_EVENTOS`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcoes_componentes` ADD CONSTRAINT `FK_FUNCOES_COMPONENTES_COMPONENTES` FOREIGN KEY (`ID_COMPONENTES`) REFERENCES `componentes`(`ID_COMPONENTES`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcoes_componentes` ADD CONSTRAINT `FK_FUNCOES_COMPONENTES_FUNCOES` FOREIGN KEY (`ID_FUNCOES`) REFERENCES `funcoes`(`ID_FUNCOES`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musicas` ADD CONSTRAINT `FK_MUSICAS_BUR` FOREIGN KEY (`ID_BUR`) REFERENCES `bur`(`ID_BUR`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musicas` ADD CONSTRAINT `FK_MUSICAS_TIPOS_MUSICA` FOREIGN KEY (`ID_TIPOS_MUSICA`) REFERENCES `tipos_musica`(`ID_TIPOS_MUSICA`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participacoes` ADD CONSTRAINT `FK_PARTICIPACOES_BRUDS` FOREIGN KEY (`ID_BRUDS`) REFERENCES `bruds`(`ID_BRUDS`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participacoes` ADD CONSTRAINT `FK_PARTICIPACOES_EVENTOS` FOREIGN KEY (`ID_EVENTOS`) REFERENCES `eventos`(`ID_EVENTOS`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patrimonio` ADD CONSTRAINT `FK_PATRIMONIO_BRUDS` FOREIGN KEY (`ID_BRUDS`) REFERENCES `bruds`(`ID_BRUDS`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patrimonio` ADD CONSTRAINT `FK_PATRIMONIO_TIPOS_PATRIMONIO` FOREIGN KEY (`ID_TIPOS_PADRIMONIO`) REFERENCES `tipos_patrimonio`(`ID_TIPO_PATRIMONIO`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `FK_USUARIOS_FUNCOES_COMPONENTES` FOREIGN KEY (`FUNCOES_COMPONENTES_ID_FUNCOES`, `FUNCOES_COMPONENTES_ID_COMPONENTES`) REFERENCES `funcoes_componentes`(`ID_FUNCOES`, `ID_COMPONENTES`) ON DELETE RESTRICT ON UPDATE CASCADE;

