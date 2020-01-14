INSERT INTO department
  (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Sales Lead', 60000 , 1),
  ('Salesperson', 50000 , 1),
  ('Lead Engineer', 100000, 2),
  ('Software Enginner', 80000, 2),
  ('Accountant', 100000, 3),
  ('Legal Team Lead', 125000, 4),
  ('Lawyer', 100000, 4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Jim', 'Jam', 1, NULL),
  ('Bim', 'Bam', 2, 1),
  ('Lim', 'Lam', 3, NULL),
  ('Mim', 'Mam', 4, 3),
  ('Gim', 'Gam', 5, NULL),
  ('Nim', 'Nam', 6, NULL),
  ('Vim', 'Vam', 7, 6);