import React from 'react';
import APIFetch from '../helpers/fetchAPI';

export default class Tasks extends React.Component {
  constructor() {
    super();

    this.api = new APIFetch();

    this.state = {
      allTasks: [],
    };
  }

  componentDidMount() {
    this.getAllTasks();
  }

  async getAllTasks() {
    const allTasks = await this.api.tasksGet();
    console.log(this.getAllTasks);
    this.setState({ allTasks });
  }

  // renderAllTasks = () => {
  //  const { allTasks } = this.state;
  // }

  render() {
    return (
      <div>Tasks</div>
    );
  }
};
