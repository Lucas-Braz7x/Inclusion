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

