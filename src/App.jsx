import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data)
      })
  }, [])


  const handleForm = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user)
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUser = [...users, data];
        setUsers(newUser);
        form.reset();
      })
  }


  return (
    <>
      <div>
        <h1>Client Managment</h1>
        <p>Total User : {users.length}</p>
        <form onSubmit={handleForm}>
          <input type="text" name='name' /><br />
          <input type="email" name='email' /><br />
          <button>submit</button>
        </form>
        {
          users.map(user => <p key={user.id}>{user.id} = {user.name}: {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
