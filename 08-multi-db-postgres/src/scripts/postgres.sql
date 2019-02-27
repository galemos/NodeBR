--deleta tabela se já existir
DROP TABLE IF EXISTS TB_HEROIS;

--cria tabela
CREATE TABLE TB_HEROIS(
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
  NOME TEXT NOT NULL ,
  PODER TEXT NOT NULL
);

--insere valor
INSERT INTO TB_HEROIS(NOME, PODER)
VALUES ('Flash', 'Velocidade'),
       ('Lanterna Verde', 'Anel do Poder'),
       ('Batman', 'Tecnologia')

--seleciona valor
SELECT * FROM TB_HEROIS;
SELECT * FROM TB_HEROIS WHERE NOME = 'Flash';

--atualiza valor
UPDATE TB_HEROIS
SET NOME = 'Pikashu', PODER = 'Choque do Trovão'
WHERE ID = 1;

DELETE FROM TB_HEROIS
WHERE ID = 2;