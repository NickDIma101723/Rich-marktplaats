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

CREATE TABLE [dbo].[Cars] (
    [Id] INT IDENTITY (1, 1) NOT NULL,
    [car] VARCHAR(255) NOT NULL,
    [car_type] VARCHAR(255) NOT NULL,
    [build_year] INTEGER NOT NULL,
    [about] VARCHAR(500) NOT NULL,
    [location] VARCHAR(255) NOT NULL,
    [mileage] INTEGER NOT NULL,
    [engine] VARCHAR(255) NOT NULL,
    [gearbox] VARCHAR(255) NOT NULL,
    [drive_train] VARCHAR(255) NOT NULL,
    [power] INTEGER NOT NULL,
    [condition] VARCHAR(255) NOT NULL,
    [color] VARCHAR(255) NOT NULL,
    [interior_color] VARCHAR(255) NOT NULL,
    [internal_refrence] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id]),
);



