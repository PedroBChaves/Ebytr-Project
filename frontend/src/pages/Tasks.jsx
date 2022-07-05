/* eslint-disable camelcase */
import React from 'react';
import {
  tasksGet, tasksPost, tasksPut, tasksDelete,
} from '../helpers/fetchAPI';

export default class Tasks extends React.Component {
  constructor() {
    super();

    this.state = {
      allTasks: [],
      task: '',
      updating: false,
      id: 0,
      status: 'Pendente',
      statusOptions: ['Pendente', 'Em andamento', 'Pronto'],
    };
  }

  componentDidMount() {
    this.getAllTasks();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleUpdateButton = async () => {
    const {
      id, task, status, updating,
    } = this.state;
    await tasksPut(id, task, status);
    this.getAllTasks();
    this.setState({ updating: !updating });
  };

  handleAddButton = async () => {
    const { task, status } = this.state;
    await tasksPost(task, status);
    this.getAllTasks();
  };

  handleDeleteButton = async (id) => {
    await tasksDelete(id);
    this.getAllTasks();
  };

  getAllTasks = async () => {
    const getTasks = await tasksGet();
    this.setState({ allTasks: getTasks });
  };

  renderAllTasks = () => {
    const { allTasks, updating } = this.state;
    const tasks = allTasks.map(({
      id, name, status, created_at, updated_at,
    }) => (
      <tr key={id} id={id}>
        <td>{name}</td>
        <td>{status}</td>
        <td>{created_at}</td>
        <td>{updated_at}</td>
        <td>
          <button
            type="button"
            onClick={() => (this.setState({ updating: !updating, id }))}
          >
            Editar
          </button>
        </td>
        <td>
          <button
            type="button"
            onClick={() => (this.handleDeleteButton(id))}
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
    return tasks;
  };

  renderStatusOptions = () => {
    const { statusOptions } = this.state;
    return (
      <select
        name="status"
        onChange={this.handleChange}
      >
        {statusOptions.map((element) => (
          <option key={element} value={element}>{element}</option>
        ))}
      </select>
    );
  };

  render() {
    const { task, updating } = this.state;
    return (
      <div>
        <h3>Insira sua tarefa:</h3>
        <div>
          <input
            type="text"
            name="task"
            value={task}
            onChange={this.handleChange}
          />
          {this.renderStatusOptions()}
          {updating ? (
            <button
              type="button"
              onClick={this.handleUpdateButton}
            >
              Editar
            </button>
          ) : (
            <button
              type="button"
              onClick={this.handleAddButton}
            >
              Adicionar
            </button>
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Status</th>
              <th>Criação</th>
              <th>Atualizado em</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {this.renderAllTasks()}
          </tbody>
        </table>
      </div>
    );
  }
}
