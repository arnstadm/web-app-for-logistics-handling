const apiURL = 'http://localhost:5000/api/';

export const validate = async token => {
  try {
    const res = await fetch(apiURL + 'validate', {
      method: 'get',
      headers: new Headers({
        Authorization: 'Basic ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    return res.ok;
  } catch (error) {
    return error;
  }
};

export const login = async user => {
  try {
    const response = await fetch(apiURL + 'signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const registerCompany = async newCompany => {
  try {
    const response = await fetch(apiURL + 'register-company', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCompany)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const register = async newUser => {
  try {
    const response = await fetch(apiURL + 'register-user', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getProfile = async user => {
  try {
    const response = await fetch(apiURL + 'user-profile/' + user, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const uploadImage = async image => {
  try {
    const response = await fetch(apiURL + 'imageprocessing', {
      method: 'POST',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      body: JSON.stringify(image)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const registerItem = async newItem => {
  try {
    const response = await fetch(apiURL + 'register-item', {
      method: 'POST',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(newItem)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};
/*
export const registerItem = newItem => {
  return axios
    .post('http://localhost:5000/api/register-item', {
      name: newItem.name,
      item_type_id: newItem.item_type_id,
      amount: newItem.amount,
      company_id: newItem.company_id
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
*/
export const registerItemType = async newType => {
  try {
    const response = await fetch(apiURL + 'register-item-type', {
      method: 'POST',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(newType)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const registerProject = async newType => {
  try {
    const response = await fetch(apiURL + 'register-project', {
      method: 'POST',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(newProject)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};
/*
export const registerItemType = newType => {
  return axios
    .post('http://localhost:5000/api/register-item-type', {
      item_type_name: newType.item_type_name,
      company_id: newType.company_id
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
*/

export const getUsers = async () => {
  try {
    const response = await fetch(apiURL + 'users', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      })
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getItems = async () => {
  try {
    const response = await fetch(apiURL + 'items', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      })
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getProjects = async () => {
  try {
    const response = await fetch(apiURL + 'projects', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      })
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};


export const getItemTypes = async () => {
  try {
    const response = await fetch(apiURL + 'itemtypes', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      })
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getItemTypesName = async () => {
  try {
    const response = await fetch(apiURL + 'itemtypesname', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      })
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getUser = async user => {
  try {
    const response = await fetch(apiURL + 'user-profile' + user, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      })
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};


export const deleteUser = async user => {
  try {
    const response = await fetch(apiURL + 'delete-user/' + user, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      })
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

/*

export const deleteUser = user => {
  return axios
    .delete('http://localhost:5000/api/delete-user/' + user, {})
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

*/
export const updateUser = async user => {
  try {
    const response = await fetch(apiURL + 'update-user/' + user.user_id, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const updateUserPassword = async user => {
  try {
    const response = await fetch(
      apiURL + 'update-user-password/' + user.user_id,
      {
        method: 'PUT',
        headers: new Headers({
          Authorization: `Basic ${localStorage.getItem('usertoken')}`,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
      }
    );
    return await response.json();
  } catch (error) {
    return error;
  }
};
/*
export const updateUser = user => {
  return axios
    .put('http://localhost:5000/api/update-user/' + user.user_id, {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      user_level: user.user_level
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
*/
export const updateItem = async item => {
  try {
    const response = await fetch(apiURL + 'update-item/' + item.item_id, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(item)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const updateProject = async project => {
  try {
    const response = await fetch(apiURL + 'update-project/' + project.project_id, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(item)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};
/*
export const updateItem = item => {
  return axios
    .put('http://localhost:5000/api/update-item/' + item.item_id, {
      item_id: item.item_id,
      name: item.name,
      item_type_id: item.item_type_id,
      company_id: item.company_id,
      amount: item.amount
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
*/

export const updateItemType = async type => {
  try {
    const response = await fetch(
      apiURL + 'update-item-type/' + type.item_type_id,
      {
        method: 'PUT',
        headers: new Headers({
          Authorization: `Basic ${localStorage.getItem('usertoken')}`,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(type)
      }
    );
    return await response.json();
  } catch (error) {
    return error;
  }
};
/*
export const updateItemType = type => {
  return axios
    .put('http://localhost:5000/api/update-item-type/' + type.item_type_id, {
      item_type_id: type.item_type_id,
      item_type_name: type.item_type_name,
      company_id: type.company_id
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
*/
export const deleteItem = async item => {
  try {
    const response = await fetch(apiURL + 'delete-item/' + item, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      })
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const deleteProject = async project => {
  try {
    const response = await fetch(apiURL + 'delete-project/' + project, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      })
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};
/*
export const deleteItem = item => {
  return axios
    .delete('http://localhost:5000/api/delete-item/' + item, {})
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
*/
export const deleteItemType = async type => {
  try {
    const response = await fetch(apiURL + 'delete-item-type/' + type, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Basic ${localStorage.getItem('usertoken')}`,
        'Content-Type': 'application/json'
      })
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};
/*
export const deleteItemType = type => {
  return axios
    .delete('http://localhost:5000/api/delete-item-type/' + type, {})
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
*/
