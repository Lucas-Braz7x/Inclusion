IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Doadores] (
    [id] int NOT NULL IDENTITY,
    [nome] nvarchar(max) NOT NULL,
    [email] nvarchar(max) NOT NULL,
    [idade] int NOT NULL,
    [telefone] nvarchar(max) NOT NULL,
    [endereco] nvarchar(max) NOT NULL,
    [estado] nvarchar(max) NOT NULL,
    [senha] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Doadores] PRIMARY KEY ([id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211221003133_Inicial', N'5.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

EXEC sp_rename N'[Doadores].[nome]', N'nomeDoador', N'COLUMN';
GO

CREATE TABLE [Ongs] (
    [id] int NOT NULL IDENTITY,
    [nomeOng] nvarchar(max) NOT NULL,
    [email] nvarchar(max) NOT NULL,
    [idade] int NOT NULL,
    [telefone] nvarchar(max) NOT NULL,
    [endereco] nvarchar(max) NOT NULL,
    [estado] nvarchar(max) NOT NULL,
    [senha] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Ongs] PRIMARY KEY ([id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211222223204_HerancaONG', N'5.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Ongs]') AND [c].[name] = N'idade');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Ongs] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Ongs] DROP COLUMN [idade];
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211223225930_CorrecaoDoador', N'5.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Ongs]') AND [c].[name] = N'telefone');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Ongs] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Ongs] ALTER COLUMN [telefone] nvarchar(20) NOT NULL;
GO

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Ongs]') AND [c].[name] = N'senha');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Ongs] DROP CONSTRAINT [' + @var2 + '];');
ALTER TABLE [Ongs] ALTER COLUMN [senha] nvarchar(50) NOT NULL;
GO

DECLARE @var3 sysname;
SELECT @var3 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Ongs]') AND [c].[name] = N'nomeOng');
IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Ongs] DROP CONSTRAINT [' + @var3 + '];');
ALTER TABLE [Ongs] ALTER COLUMN [nomeOng] nvarchar(50) NOT NULL;
GO

DECLARE @var4 sysname;
SELECT @var4 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Ongs]') AND [c].[name] = N'estado');
IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [Ongs] DROP CONSTRAINT [' + @var4 + '];');
ALTER TABLE [Ongs] ALTER COLUMN [estado] nvarchar(2) NOT NULL;
GO

DECLARE @var5 sysname;
SELECT @var5 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Ongs]') AND [c].[name] = N'endereco');
IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [Ongs] DROP CONSTRAINT [' + @var5 + '];');
ALTER TABLE [Ongs] ALTER COLUMN [endereco] nvarchar(100) NOT NULL;
GO

DECLARE @var6 sysname;
SELECT @var6 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Ongs]') AND [c].[name] = N'email');
IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [Ongs] DROP CONSTRAINT [' + @var6 + '];');
ALTER TABLE [Ongs] ALTER COLUMN [email] nvarchar(100) NOT NULL;
GO

DECLARE @var7 sysname;
SELECT @var7 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Doadores]') AND [c].[name] = N'telefone');
IF @var7 IS NOT NULL EXEC(N'ALTER TABLE [Doadores] DROP CONSTRAINT [' + @var7 + '];');
ALTER TABLE [Doadores] ALTER COLUMN [telefone] nvarchar(20) NOT NULL;
GO

DECLARE @var8 sysname;
SELECT @var8 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Doadores]') AND [c].[name] = N'senha');
IF @var8 IS NOT NULL EXEC(N'ALTER TABLE [Doadores] DROP CONSTRAINT [' + @var8 + '];');
ALTER TABLE [Doadores] ALTER COLUMN [senha] nvarchar(50) NOT NULL;
GO

DECLARE @var9 sysname;
SELECT @var9 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Doadores]') AND [c].[name] = N'nomeDoador');
IF @var9 IS NOT NULL EXEC(N'ALTER TABLE [Doadores] DROP CONSTRAINT [' + @var9 + '];');
ALTER TABLE [Doadores] ALTER COLUMN [nomeDoador] nvarchar(50) NOT NULL;
GO

DECLARE @var10 sysname;
SELECT @var10 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Doadores]') AND [c].[name] = N'estado');
IF @var10 IS NOT NULL EXEC(N'ALTER TABLE [Doadores] DROP CONSTRAINT [' + @var10 + '];');
ALTER TABLE [Doadores] ALTER COLUMN [estado] nvarchar(2) NOT NULL;
GO

DECLARE @var11 sysname;
SELECT @var11 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Doadores]') AND [c].[name] = N'endereco');
IF @var11 IS NOT NULL EXEC(N'ALTER TABLE [Doadores] DROP CONSTRAINT [' + @var11 + '];');
ALTER TABLE [Doadores] ALTER COLUMN [endereco] nvarchar(100) NOT NULL;
GO

DECLARE @var12 sysname;
SELECT @var12 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Doadores]') AND [c].[name] = N'email');
IF @var12 IS NOT NULL EXEC(N'ALTER TABLE [Doadores] DROP CONSTRAINT [' + @var12 + '];');
ALTER TABLE [Doadores] ALTER COLUMN [email] nvarchar(100) NOT NULL;
GO

CREATE TABLE [Equipamentos] (
    [id] int NOT NULL IDENTITY,
    [nomeEquipamento] nvarchar(50) NOT NULL,
    [descricao] nvarchar(200) NOT NULL,
    [doadorId] int NOT NULL,
    CONSTRAINT [PK_Equipamentos] PRIMARY KEY ([id]),
    CONSTRAINT [FK_Equipamentos_Doadores_doadorId] FOREIGN KEY ([doadorId]) REFERENCES [Doadores] ([id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Equipamentos_doadorId] ON [Equipamentos] ([doadorId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211229185333_ClasseEquipamento', N'5.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Equipamentos] ADD [imgUrl] nvarchar(200) NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20211229185528_ClasseEquipamentoIMG', N'5.0.0');
GO

COMMIT;
GO

