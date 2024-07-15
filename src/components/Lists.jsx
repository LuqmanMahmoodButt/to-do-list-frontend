import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl} from "../config"

const TodoList = () => {
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [editText, setEditText] = useState('');
  const [newItems, setNewItems] = useState({});
  const [dueDate, setDueDate] = useState({}); // State for due dates
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchLists() {
      try {
        const resp = await fetch(`${ baseUrl}/api/lists/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await resp.json();
        setLists(data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    }
    fetchLists();
  }, [token]);

  const handleChange = (e, listId) => {
    const { value } = e.target;
    setNewItems((prevNewItems) => ({
      ...prevNewItems,
      [listId]: value
    }));
  };

  const handleNewListChange = (e) => {
    setNewList(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleDueDateChange = (e, listId) => {
    const { value } = e.target;
    setDueDate((prevDueDates) => ({
      ...prevDueDates,
      [listId]: value
    }));
  };

  const handleAddList = async () => {
    try {
      const response = await axios.post(`${ baseUrl}/api/lists/`, {
        title: newList
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLists(prevLists => [...prevLists, response.data]);
      setNewList('');
    } catch (error) {
      console.error('Error adding list:', error);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await axios.delete(`${ baseUrl}/api/lists/${listId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLists(prevLists => prevLists.filter(list => list.id !== listId));
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const handleAddItem = async (listId) => {
    try {
      const response = await axios.post(`${ baseUrl}/api/items/`, {
        item: newItems[listId],
        todolist: listId,
        due_date: dueDate[listId]
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Update the lists state to include the new item
      setLists(prevLists => {
        const updatedLists = prevLists.map(list => {
          if (list.id === listId) {
            return {
              ...list,
              todoitem: [...list.todoitem, response.data] // Append new item to the todoitem array of the specific list
            };
          }
          return list;
        });
        return updatedLists;
      });
  
      // Reset input fields and state
      setNewItems(prevNewItems => ({
        ...prevNewItems,
        [listId]: ''
      }));
      setDueDate(prevDueDates => ({
        ...prevDueDates,
        [listId]: ''
      }));
  
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (listId, itemId) => {
    try {
      await axios.delete(`${ baseUrl}/api/items/${itemId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLists(prevLists => {
        const updatedLists = [...prevLists];
        const listIndex = updatedLists.findIndex(list => list.id === listId);
        if (listIndex !== -1) {
          updatedLists[listIndex].todoitem = updatedLists[listIndex].todoitem.filter(item => item.id !== itemId);
        }
        return updatedLists;
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditItem = async (listId, itemId) => {
    try {
      const response = await axios.put(`${ baseUrl}/api/items/${itemId}/`, {
        item: editText,
        todolist: listId,
        due_date: dueDate[listId] // Include due date in the request
      },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      setLists(prevLists => {
        const updatedLists = [...prevLists];
        const listIndex = updatedLists.findIndex(list => list.id === listId);
        if (listIndex !== -1) {
          const itemIndex = updatedLists[listIndex].todoitem.findIndex(item => item.id === itemId);
          if (itemIndex !== -1) {
            updatedLists[listIndex].todoitem[itemIndex].item = response.data.item;
          }
        }
        return updatedLists;
      });
      setEditItem(null);
      setEditText('');
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const handleToggleComplete = async (listId, itemId) => {
    try {
      const listIndex = lists.findIndex(list => list.id === listId);
      const itemIndex = lists[listIndex].todoitem.findIndex(item => item.id === itemId);
      const response = await axios.put(`${ baseUrl}/api/items/${itemId}/`, {
        item: lists[listIndex].todoitem[itemIndex].item,
        complete: !lists[listIndex].todoitem[itemIndex].complete,
        todolist: listId,

      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLists(prevLists => {
        const updatedLists = [...prevLists];
        const listIndex = updatedLists.findIndex(list => list.id === listId);
        if (listIndex !== -1) {
          const itemIndex = updatedLists[listIndex].todoitem.findIndex(item => item.id === itemId);
          if (itemIndex !== -1) {
            updatedLists[listIndex].todoitem[itemIndex].complete = response.data.complete;
          }
        }
        return updatedLists;
      });
    } catch (error) {
      console.error('Error toggling complete status:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title has-text-centered">Todo Lists</h1>
      <div className="field has-addons mb-5">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            value={newList}
            onChange={handleNewListChange}
            placeholder="Add new list"
          />
        </div>
        <div className="control">
          <button className="button is-primary" onClick={handleAddList}>Add List</button>
        </div>
      </div>
      {lists.map((list) => (
        <div key={list.id} className="box">
          <h2 className="subtitle">List {list.title}</h2>
          <div className="buttons mb-3">
            <button className="button is-danger" onClick={() => handleDeleteList(list.id)}>Delete List</button>
          </div>
          <ul>
            {list.todoitem.map((item) => (
              <li key={item.id} className="block">
                {editItem === item.id ? (
                  <form className="field has-addons" onSubmit={(e) => {
                    e.preventDefault();
                    handleEditItem(list.id, item.id);
                  }}>
                    <div className="control is-expanded">
                      <input
                        className="input"
                        type="text"
                        value={editText}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="control">
                      <button className="button is-primary" type="submit">Save</button>
                    </div>
                    <div className="control">
                      <button className="button" onClick={() => setEditItem(null)}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="columns is-vcentered">
                    <div className="column is-four-fifths">
                      <span
                        className={item.complete ? 'has-text-danger' : ''}
                        style={{ textDecoration: item.complete ? 'line-through' : 'none', cursor: 'pointer' }}
                        onClick={() => handleToggleComplete(list.id, item.id)}
                      >
                        {item.item}
                      </span>
                      {item.due_date && ( // Display due date if available
                        <span className="ml-3 has-text-grey">
                          Due: {new Date(item.due_date).toLocaleDateString()} {/* Format due date */}
                        </span>
                      )}
                    </div>
                    <div className="column is-narrow">
                      <button className="button is-small is-info" onClick={() => {
                        setEditItem(item.id);
                        setEditText(item.item);
                      }}>Edit</button>
                    </div>
                    <div className="column is-narrow">
                      <button className="button is-small is-danger" onClick={() => handleDeleteItem(list.id, item.id)}>Delete</button>
                    </div>
                    <div className="column is-narrow">
                      <button className="button is-small is-success" onClick={() => handleToggleComplete(list.id, item.id)}>Done</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <form className="field has-addons mt-3" onSubmit={(e) => {
            e.preventDefault();
            handleAddItem(list.id);
          }}>
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                name="newItem"
                value={newItems[list.id] || ''}
                onChange={(e) => handleChange(e, list.id)}
                placeholder="Add new item"
              />
            </div>
            <div className="control">
              <input
                className="input"
                type="date"
                value={dueDate[list.id] || ''}
                onChange={(e) => handleDueDateChange(e, list.id)}
              />
            </div>
            <div className="control">
              <button className="button is-primary" type="submit">Add</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};

export default TodoList;