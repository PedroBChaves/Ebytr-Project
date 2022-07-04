const connection = require('./connection');

const getAllTasks = async () => {
  const [tasks] = await connection.execute('SELECT * From TaskManager.tasks');

  return tasks;
};

const createTask = async (name, status) => {
  const [verify] = await connection
    .execute('SELECT name FROM TaskManager.tasks WHERE name = ?', [name]);

  if (verify[0] !== undefined) {
    const e = JSON.stringify(
      { code: 409, message: 'Task already exists' },
    );
    throw new Error(e);
  }

  const [res] = await connection
    .execute('INSERT INTO TaskManager.tasks (name, status) VALUES (?, ?)', [name, status]);

  return {
    id: res.insertId,
    name,
    status,
    createdAt: res.created_at,
    updatedAt: res.updated_at,
  };
};

const updateTask = async (id, name, status) => {
  const [res] = await connection
    .execute('UPDATE TaskManager.tasks SET name = ?, status = ? WHERE id = ?', [name, status, id]);

  return {
    id,
    name,
    status,
    createdAt: res.created_at,
    updatedAt: res.updated_at,
  };
};

const deleteTask = async (id) => {
  await connection
    .execute('DELETE FROM TaskManager.tasks WHERE id = ?', [id]);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
