CREATE TABLE company
(
    company_id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    ERP_system VARCHAR (50) NOT NULL
);

CREATE TABLE users
(
    user_id serial PRIMARY KEY,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    password VARCHAR (350) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    company_id INTEGER NOT NULL,
    company_name VARCHAR (50) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company (company_id),
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);

CREATE TABLE item_types
(
    item_type_id serial PRIMARY KEY,
    company_id INTEGER NOT NULL,
    item_type_name varchar (50) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company (company_id)
);

CREATE TABLE items
(
    item_id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    amount INTEGER NOT NULL,
    company_id INTEGER NOT NULL,
    item_type_id INTEGER NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company (company_id),
    FOREIGN KEY (item_type_id) REFERENCES item_types (item_type_id)
)

CREATE TABLE pictureclasses
(
    class_id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    item_type_id INTEGER NOT NULL,
    FOREIGN KEY (item_type_id) REFERENCES item_types (item_type_id),
    display_name VARCHAR (50) NOT NULL
)

CREATE TABLE project
(
    project_id serial PRIMARY KEY,
    project_number INT NOT NULL,
    company_id INTEGER NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company (company_id),
    items INT
    []
)

    CREATE TABLE transactions
    (
        transaction_id serial PRIMARY KEY
    )
    INSERT INTO users
        (first_name, last_name, password, email, company, created_on)
    VALUES
        ('test', 'test', 'test', 'test@test.no', 'testbedrift', '2019-02-27');
    INSERT INTO company
        (name, ERP_system)
    VALUES
        ('testbedrift', 'Visma ERP');

