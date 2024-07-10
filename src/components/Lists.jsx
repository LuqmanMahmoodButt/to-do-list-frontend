import { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  newItem: ''
};

const TodoList = () => {
  const [formData, setFormData] = useState(initialState);
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [editText, setEditText] = useState('');
  const [priority, setPriority] = useState(0);
  const [newItems, setNewItems] = useState({});
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

  const handleAddList = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/lists/', {
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

  const handleAddItem = async (listId) => {
    try {
      const response = await axios.post('http://localhost:8000/api/items/', { item: newItems[listId], todolist: listId, priority }, {
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
      setNewItems(prevNewItems => ({
        ...prevNewItems,
        [listId]: ''
      }));
      setPriority(0);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (listId, itemId) => {
    try {
      await axios.delete(`http://localhost:8000/api/items/${itemId}/`, {
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
      const response = await axios.put(`http://localhost:8000/api/items/${itemId}/`, {
        item: editText,
        complete: false,
        todolist: listId},
          { headers: {
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
                      <button className="button is-small is-danger" onClick={() => handleDeleteItem(list.id, item.id)}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <form className="field has-addons" onSubmit={(e) => {
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
              <button className="button is-primary" type="submit">Add</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};

export default TodoList;