import { useState } from 'react';

function SignInUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
   
    e.preventDefault();

   
  
    try {
      const response = await fetch('/api/Signin', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      setMessage(data.message);

     // localStorage.setItem('accessToken', data.session.access_token);
        


    } catch (error) {
      setMessage('Error signing in user: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignInUser;




/* const accessToken = localStorage.getItem('accessToken');
    
    try {
        const response = await fetch('/api/data', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        */