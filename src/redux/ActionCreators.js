export const addBook = (book) => ({
    type: ActionTypes.ADD_BOOK,
    payload: book
});

export const editUser = (_id, firstname, lastname, roll, email) => (dispatch) => {

  const newUser = {
firstname: firstname,
lastname: lastname,
roll: roll,
email: email  };
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + 'users/' + _id, {
      method: "PUT"
    //  ,     credentials: 'same-origin'
      ,      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      } })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { 
    localStorage.removeItem('userinfo');
    localStorage.setItem('userinfo', JSON.stringify(response));
    return dispatch(editUserdispatch(response));})
  .catch(error =>  {  
  alert('Your profile could not be edited\nError: '+error.message+'\n May be someone has already registered with that Roll No. or Email'); });
};

export const editPassword = (_id,username,password) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'users/password/' + _id, {
      method: "PUT"
    //  ,     credentials: 'same-origin'
      ,      body: JSON.stringify({password: password}),
      headers: {
        "Content-Type": "application/json",
        'Authorization': bearer
      } })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText+'\n ');
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { 
    let newCreds={username: username, password: password};
    localStorage.removeItem('creds');
    localStorage.setItem('creds', JSON.stringify(newCreds));
    alert('Password changed successfully');
    return dispatch(editPasswordDispatch(newCreds));})
  .catch(error =>  {  
  alert('Your password could not be changed\nError: '+error.message); });
}

export const editUserdispatch = (USER) => ({
    type: ActionTypes.EDIT_USER,
    payload: USER
});

export const editPasswordDispatch = (CREDS) => ({
    type: ActionTypes.EDIT_PASSWORD,
    payload: CREDS
})