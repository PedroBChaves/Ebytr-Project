const connection = require('./connection');

const getAllTasks = async () => {
  const [tasks] = await connection.execute('SELECT * From Database.tasks');

  return tasks;
};

const createTask = async (name, status) => {
  const [verify] = await connection
    .execute('SELECT name FROM Database.tasks WHERE name = ?', [name]);

  if (verify[0] !== undefined) {
    const e = JSON.stringify(
      { code: 409, message: 'Task already exists' },
    );
    throw new Error(e);
  }

  const [res] = await connection
    .execute('INSERT INTO Database.tasks (name, status) VALUES (?, ?)', [name, status]);

  return {
    id: res.insertId,
    name,
    status,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
  };
};

const updateTask = async (id, name, status) => {
  const [res] = await connection
    .execute('UPDATE Database.tasks SET (name, status) VALUES (?, ?)', [name, status]);

  return {
    id,
    name,
    status,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
  };
};

const deleteTask = async (id) => {
  await connection
    .execute('DELETE FROM Database.tasks WHERE id = ?', [id]);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
