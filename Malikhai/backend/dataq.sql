CREATE TABLE [dbo].[Users] (
    [Id] INT IDENTITY (1, 1) NOT NULL,
    [first_name] VARCHAR(255) NOT NULL,
    [last_name] VARCHAR(255) NOT NULL,
    [birth_date] DATE NOT NULL,
    [email] VARCHAR(255) NOT NULL,
    [user_name] VARCHAR(100) NOT NULL,
    [password] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [UQ_email] UNIQUE ([email]),
    CONSTRAINT [UQ_user_name] UNIQUE ([user_name])
);
