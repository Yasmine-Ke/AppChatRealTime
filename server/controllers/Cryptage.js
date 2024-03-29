const jwt = require('jsonwebtoken'); // Importez la bibliothèque JWT

async function SignInUser(req, res) {
  const { email, password } = req.body;

  try {
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Générez un JWT pour la session utilisateur
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    // Retournez le JWT avec les données de session dans la réponse JSON
    return res.status(200).json({ message: 'Successfully signed in', user: user, token: token });
  } catch (error) {
    console.error('Error signing in user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



async function Addmessage(req, res) {
    const { Contenu, date, heure } = req.body;
  
    try {
      // Chiffrez le contenu du message avant de l'insérer dans la base de données
      const encryptedContent = encryptMessage(Contenu);
  
      const { data, error } = await supabase
        .from('Message')
        .insert({
          Content: encryptedContent,
          date: date,
          heure: heure
        });
  
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      
      // Diffuser le message à tous les clients connectés
      io.emit('message', { Contenu: encryptedContent, date, heure });
  
      // Retourner uniquement les données de session dans la réponse JSON
      return res.status(201).json({ message: 'Message added successfully', data });
    } catch (error) {
      console.error('Error adding message:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  // Fonction pour chiffrer le contenu du message
  function encryptMessage(message) {
    // Ici, vous pouvez utiliser n'importe quel algorithme de chiffrement de votre choix pour chiffrer le message
    // Par exemple, vous pouvez utiliser CryptoJS pour le chiffrement AES
    // Voici un exemple simple :
    // const encryptedMessage = CryptoJS.AES.encrypt(message, 'secret_key').toString();
    // return encryptedMessage;
    return message; // Pour l'instant, nous simulons le chiffrement en renvoyant simplement le message non chiffré
  }
  

  //----------------------------

  function decryptMessage(encryptedMessage) {
    // Ici, vous devez utiliser le même algorithme et la même clé de chiffrement que ceux utilisés pour chiffrer le message
    // Par exemple, si vous avez utilisé CryptoJS pour chiffrer AES, vous devez utiliser la même bibliothèque et la même clé pour déchiffrer
    // Voici un exemple simple :
    // const bytes  = CryptoJS.AES.decrypt(encryptedMessage, 'secret_key');
    // const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    // return decryptedMessage;
    return encryptedMessage; // Pour l'instant, nous simulons le déchiffrement en renvoyant simplement le message chiffré tel quel
  }

  
  async function getMessage(req, res) {
    try {
      const { data, error } = await supabase
        .from('Message')
        .select('*');
  
      if (error) throw error;
  
      // Déchiffrer les messages avant de les renvoyer au client
      const decryptedData = data.map(message => {
        return {
          id: message.id,
          Content: decryptMessage(message.Content), // Déchiffrer le contenu du message
          date: message.date,
          heure: message.heure
        };
      });
  
      res.json(decryptedData);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Error fetching messages' });
    }
  }
    