import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import remove from './assets/img/remove.svg';
import check from './assets/img/check.svg';

function Todo(props) {
  return (
    <div className='todolist_item_parent'>
      <div className='todolist_content'>
        {/* Todolist text */}
        {props.isStrike ? <p className='text strike'>{props.value}</p> : <p className='text'>{props.value}</p>}
        {/* Button */}
        <div className='button'>
          <input className='validate' type='checkbox' onClick={() => props.onClick2()} checked={props.isStrike ?? false} onChange={e => { }} />
          <img className='remove' src={remove} onClick={() => props.onClick()} alt='trash-remove-btn' />
        </div>
      </div>
    </div >
  )
}

class Todolist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: [],
      errors: "",
    }
  }
  componentDidMount() {
    const saved = localStorage.getItem('todo')
    if (saved !== null) {
      const value = JSON.parse(saved)
      this.setState({
        todo: value
      })
    }
  }

  saveData(todo) {
    localStorage.setItem('todo', JSON.stringify(todo))
  }

  handleClick() {
    const todoInput = document.getElementById('todoInput').value
    if (todoInput !== "" && todoInput.length >= 3) {
      let newTodo = this.state.todo
      newTodo.push([todoInput, false])

      this.setState({
        todo: newTodo,
        errors: "",
      })
      document.getElementById('todoInput').value = ""
      this.saveData(newTodo)
    } else {
      this.setState({
        errors: "Require 3 or more characters",
      })
    }
  }

  removeTodo(idx) {
    const oldTodo = this.state.todo
    const newTodo = oldTodo.filter((item, i) => i !== idx)
    this.setState({
      todo: newTodo,
    })
    this.saveData(newTodo)
  }

  strike(idx) {
    let todo = this.state.todo
    todo.map((item, index) => {
      if (index === idx) {
        item[1] = !item[1]
      }
    })

    this.setState({
      todo: todo
    })
    this.saveData(todo)
  }

  render() {
    return (
      <div className='todolist'>
        <h1>Todo List !</h1>
        {
          this.state.errors ? (
            <h3 className='errors'>{this.state.errors}</h3>
          ) : null
        }
        <div className='addNewItem'>
          <input id='todoInput' placeholder='Add todo here.' />
          <img src={check} onClick={() => this.handleClick()} alt="check-img" />
        </div>
        {
          this.state.todo.length > 0 && this.state.todo.map((ele, idx) => {
            return (<Todo value={ele} onClick={() => this.removeTodo(idx)} onClick2={() => this.strike(idx)} isStrike={ele[1]} key={'ele' + idx} />)
          })
        }
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Todolist />);