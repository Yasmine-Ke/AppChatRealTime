import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate

function UpdatePasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [email, setNewemail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Utilisation du hook useNavigate pour la redirection

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch('/api/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword , email  })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la requête HTTP: ' + response.statusText);
      }

      const data = await response.json();
      setMessage(data.message); // Affichage du message de succès depuis le backend

      // Rediriger vers la page de connexion après la mise à jour du mot de passe
      navigate('/Connecter');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe depuis le frontend:', error.message);
      setMessage('Erreur lors de la mise à jour du mot de passe. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div>
      <h2>Mettre à jour le mot de passe</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setNewemail(e.target.value)}
        placeholder="Entrez votre email"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Entrez votre nouveau mot de passe"
      />
      <button onClick={handleUpdatePassword}>Mettre à jour le mot de passe</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdatePasswordForm;
