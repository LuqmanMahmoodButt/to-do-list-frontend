import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TodoList = () => {
  const [lists, setLists] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newList, setNewList] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [editText, setEditText] = useState('');
  const [priority, setPriority] = useState(0);

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchLists() {
      try {
        const resp = await fetch('http://localhost:8000/api/lists/', {
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

    const savedLists = localStorage.getItem('lists');
    if (savedLists) {
      setLists(savedLists);
    } else {
      fetchLists();
    }
  }, [token]);

  const handleAddList = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/lists/', { 
        title: newList}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLists(prevLists => {
        const updatedLists = structuredClone(prevLists);
        updatedLists.push(response.data)
        return updatedLists;
      });
      setNewList('');
    } catch (error) {
      console.error('Error adding list:', error);
    }
  };

  const handleAddItem = async (listId) => {
    try {
      const response = await axios.post('http://localhost:8000/api/todoitems/', { item: newItem, todolist: listId, priority }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLists(prevLists => {
        const updatedLists = structuredClone(prevLists);
        const list = updatedLists.find(list => list.id === listId);
        if (list) {
          list.todoitem.push(response.data);
        }

        return updatedLists;
      });
      setNewItem('');
      setPriority(0);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (listId, itemId) => {
    try {
      await axios.delete(`http://localhost:8000/api/todoitems/${itemId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLists(prevLists => {
        const updatedLists = structuredClone(prevLists);
        const list = updatedLists.find(list => list.id === listId);
        if (list) {
          list.todoitem = list.todoitem.filter(item => item.id !== itemId);
        }
        return updatedLists;
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditItem = async (listId, itemId) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/todoitems/${itemId}/`, { item: editText }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLists(prevLists => {
        const updatedLists = structuredClone(prevLists);
        const list = updatedLists.find(list => list.id === listId);
        if (list) {
          const item = list.todoitem.find(item => item.id === itemId);
          if (item) {
            item.item = response.data.item;
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

  return (
    <div className="container">
      <h1 className="title has-text-centered">Todo Lists</h1>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            value={newList}
            onChange={(e) => setNewList(e.target.value)}
            placeholder="Add new list"
          />
        </div>
        <div className="control">
          <button className="button is-primary" onClick={handleAddList}>Add List</button>
        </div>
      </div>
      {lists.map((list) => (
        <div key={list.id} className="box">
          <h2 className="subtitle">List {list.name}</h2>
          <ul>
            {list.todoitem.map((item) => (
              <li key={item.id} className="block">
                {editItem === item.id ? (
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input
                        className="input"
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    </div>
                    <div className="control">
                      <button className="button is-primary" onClick={() => handleEditItem(list, item.id)}>Save</button>
                    </div>
                    <div className="control">
                      <button className="button" onClick={() => setEditItem(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="columns is-vcentered">
                    <div className="column">
                      <span>{item.item}</span>
                    </div>
                    <div className="column is-narrow">
                      <button className="button is-small is-info" onClick={() => {
                        setEditItem(item.id);
                        setEditText(item.item);
                      }}>Edit</button>
                    </div>
                    <div className="column is-narrow">
                      <button className="button is-small is-danger" onClick={() => handleDeleteItem(list, item)}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add new item"
              />

            </div>
            <div className="control">
              <button className="button is-primary" onClick={() => handleAddItem(list.id)}>Add</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;