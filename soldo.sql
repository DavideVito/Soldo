DROP DATABASE ProdottiSoldo;

CREATE DATABASE ProdottiSoldo;

USE ProdottiSoldo;

DROP TABLE IF EXISTS `Ordine`;

CREATE TABLE `Ordine` (
  `idOrdine` int NOT NULL AUTO_INCREMENT,
  `idUtente` varchar(45) DEFAULT NULL,
  `data` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idOrdine`)
);

DROP TABLE IF EXISTS `OrdineContieneProdotto`;

CREATE TABLE `OrdineContieneProdotto` (
  `idOrdine` int NOT NULL,
  `idProdotto` int NOT NULL,
  KEY `fk2` (`idProdotto`),
  KEY `fk1` (`idOrdine`)
);

DROP TABLE IF EXISTS `OrdiniCompletati`;

CREATE TABLE `OrdiniCompletati` (
  `idOrdine` int NOT NULL,
  `data` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idOrdine`),
  CONSTRAINT `fk111` FOREIGN KEY (`idOrdine`) REFERENCES `Ordine` (`idOrdine`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Prodotto`;

CREATE TABLE `Prodotto` (
  `idProdotto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `prezzoUnitario` double DEFAULT NULL,
  `tipoProdotto` int DEFAULT NULL,
  `percorso` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idProdotto`),
  KEY `fk_idx` (`tipoProdotto`)
);

DROP TABLE IF EXISTS `TipiProdotti`;

CREATE TABLE `TipiProdotti` (
  `idTipiProdotti` int NOT NULL AUTO_INCREMENT,
  `descrizione` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTipiProdotti`)
);

DROP TABLE IF EXISTS `Utente`;

CREATE TABLE `Utente` (
  `idUtente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `admin` tinyint DEFAULT '0',
  PRIMARY KEY (`idUtente`),
  UNIQUE KEY `mail_UNIQUE` (`mail`)
);

DROP VIEW IF EXISTS `v_ordini`;

DROP VIEW IF EXISTS `v_prodotti`;

CREATE VIEW `v_ordini` AS
select
  `T`.`idOrdine` AS `idOrdine`,
  `T`.`data` AS `data`,
  `T`.`nomeProdotto` AS `nomeProdotto`,
  `T`.`idProdotto` AS `idProdotto`,
  `T`.`nomeUtente` AS `nomeUtente`,
  `T`.`email` AS `email`,
  `T`.`tipoProdotto` AS `tipoProdotto`,
  (rand() * 1000) AS `random`
from
  (
    select
      `Ordine`.`idOrdine` AS `idOrdine`,
      `Ordine`.`data` AS `data`,
      `Prodotto`.`nome` AS `nomeProdotto`,
      `Prodotto`.`idProdotto` AS `idProdotto`,
      `Utente`.`nome` AS `nomeUtente`,
      `Utente`.`mail` AS `email`,
      `TipiProdotti`.`descrizione` AS `tipoProdotto`
    from
      (
        (
          (
            (
              `Ordine`
              join `OrdineContieneProdotto` on(
                (
                  `Ordine`.`idOrdine` = `OrdineContieneProdotto`.`idOrdine`
                )
              )
            )
            join `Prodotto` on(
              (
                `OrdineContieneProdotto`.`idProdotto` = `Prodotto`.`idProdotto`
              )
            )
          )
          join `Utente` on((`Utente`.`idUtente` = `Ordine`.`idUtente`))
        )
        join `TipiProdotti` on(
          (
            `Prodotto`.`tipoProdotto` = `TipiProdotti`.`idTipiProdotti`
          )
        )
      )
    where
      `Ordine`.`idOrdine` in (
        select
          `OrdiniCompletati`.`idOrdine`
        from
          `OrdiniCompletati`
      ) is false
  ) `T`;

CREATE VIEW `v_prodotti` AS
select
  `Prodotto`.`idProdotto` AS `idProdotto`,
  `Prodotto`.`nome` AS `nome`,
  `Prodotto`.`prezzoUnitario` AS `prezzoUnitario`,
  `Prodotto`.`tipoProdotto` AS `tipoProdotto`,
  `Prodotto`.`percorso` AS `percorso`,
  `TipiProdotti`.`idTipiProdotti` AS `idTipiProdotti`,
  `TipiProdotti`.`descrizione` AS `descrizione`
from
  (
    `Prodotto`
    join `TipiProdotti` on(
      (
        `Prodotto`.`tipoProdotto` = `TipiProdotti`.`idTipiProdotti`
      )
    )
  );

ALTER TABLE
  Prodotto
ADD
  CONSTRAINT `fk` FOREIGN KEY (`tipoProdotto`) REFERENCES `TipiProdotti` (`idTipiProdotti`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE
  OrdineContieneProdotto
ADD
  CONSTRAINT `fk1` FOREIGN KEY (`idOrdine`) REFERENCES `Ordine` (`idOrdine`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE
  OrdineContieneProdotto
ADD
  CONSTRAINT `fk2` FOREIGN KEY (`idProdotto`) REFERENCES `Prodotto` (`idProdotto`) ON DELETE CASCADE ON UPDATE CASCADE;