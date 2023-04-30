import cx from 'classnames';
import { Component } from 'react';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      items: [],
    };
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleAddItem = () => {
    const { inputValue, items } = this.state;
    if (inputValue) {
      this.setState({
        inputValue: '',
        items: [...items, { text: inputValue, isDone: false }],
      });
    }
  };

  handleToggleItem = (index) => {
    const { items } = this.state;
    const newItems = [...items];
    newItems[index].isDone = !newItems[index].isDone;
    this.setState({ items: newItems });
  };

  render() {
    const { inputValue, items } = this.state;
    const remainingTasks = items.filter((item) => !item.isDone);
    const taskCounter = `${remainingTasks.length} remaining out of ${items.length} tasks`;

    return (
      <>
        <div>
          <h2>Todo List</h2>
          <input type="text" value={inputValue} onChange={this.handleInputChange} />
          <button onClick={this.handleAddItem}>Add Item</button>
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className={cx({ 'is-done': item.isDone })}
                onClick={() => this.handleToggleItem(index)}
              >
                {item.text}
              </li>
            ))}
          </ul>
          <p className="task-counter">{taskCounter}</p>
        </div>
        <style>
          {`
            .is-done {
              text-decoration: line-through;
            }
          `}
        </style>
      </>
    );
  }
}