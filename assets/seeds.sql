use cms;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Production'),
    ('Distribution');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Salesperson', 75000, 1),
    ('Sales manager', 100000, 1),
    ('Production specialist', 50000, 2),
    ('Production manager', 100000, 2),
    ('Distributor', 50000, 3),
    ('Distribution manager', 100000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Daffy', 'Duck', 1, 2),
    ('Micky', 'Mouse', 2, NULL),
    ('Wiley', 'Coyote', 3, 4),
    ('Roger', 'Rabbit', 4, NULL),
    ('Buggs', 'Bunny', 5, 6),
    ('Donald', 'Duck', 6, NULL);