import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function onLoginSubmit(ev) {
    ev.preventDefault();
    try {
     await axios.post('/login', { email, password })
      alert('login successful');
    } catch (e) {
     alert('login failed') ;
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={onLoginSubmit}>
          <input type="email" placeholder="youremail" 
          value={email}
          onChange ={ (ev)=> setEmail(ev.target.value) }
          />
          <input type="password" placeholder="password" 
          value={password}
          onChange ={ (ev)=> setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center text-gray-400 py-2">
            Don't have account yet? <Link className="underline text-black" to={"/register"}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
