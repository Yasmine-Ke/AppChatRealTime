/*const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'https://aibrwsnxbuklshdpwvzv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnJ3c254YnVrbHNoZHB3dnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzc1NTQsImV4cCI6MjAxNTIxMzU1NH0.dIHvOVjRuvG_ja4SgVrLQFDQPrKAjs4g5w0mKue3dlA';


const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction getUsers pour récupérer les utilisateurs depuis la base de données Supabase
async function getUsers(req, res) {
  const { data, error } = await supabase
    .from('user')
    .select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}



module.exports = { getUsers };*/


// userController.js

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://aibrwsnxbuklshdpwvzv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnJ3c254YnVrbHNoZHB3dnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzc1NTQsImV4cCI6MjAxNTIxMzU1NH0.dIHvOVjRuvG_ja4SgVrLQFDQPrKAjs4g5w0mKue3dlA';


const supabase = createClient(supabaseUrl, supabaseKey);


//-----------------------------------------------------------------createUser/signUp
async function createUser(req, res) {
  const { email, password, nom, prenom } = req.body; // Assurez-vous d'avoir bodyParser configuré pour traiter les requêtes POST
  
  try {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Insertion dans la table User
    const { data: user1, error: error1 } = await supabase.from("User").insert({
      Email: email,
      Nom: nom,
      Prenom: prenom
    }).single();

    if (error1) {
      return res.status(400).json({ message: error1.message });
    }

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



//------------------------------------------------------------------signInWithPassword

//--
async function SignInUser(req, res) {
  const { email, password } = req.body;
  
  try {
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email:email,
      password: password
    });
 
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { data } = await supabase.auth.getSession();

    // Retourner uniquement les données de session dans la )réponse JSON
    console.log(data)
    return res.status(200).json({ message: 'Successfully signed in', 
    user:data.session.user,
     access_token:data.session.access_token });
  } catch (error) {
    console.error('Error signing in user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}  
/*
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, subject, text) {
  const msg = {
    to: to,
    from: 'kechidyasmine2@gmail.com',
    subject: subject,
    text: text
  };
  try {
    await sgMail.send(msg);
    console.log('E-mail envoyé avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail:', error.response.body.errors);
    return false;
  }
}

sendEmail('yasminekechid@gmail.com', 'Sujet de l\'e-mail', 'Contenu de l\'e-mail');
*/
//--------------------------------------------------------signOut


async function signOut(req, res) {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ message: error.message });
    }
   
    return res.status(200).json({ message: 'Successfully signed out' });
  } catch (error) {
    console.error('Error signing out user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}  



//-------------------------------------------------------m a jr un utilisateur ; mdp oublie

const resetPassword = async (req, res) => {
  try {
    const { email, password, access_token, refresh_token } = req.body;

    // Set the user's session using the provided access_token and refresh_token
    const { data: userSession, error: sessionError } =
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

    if (sessionError) {
      throw new Error(sessionError.message);
    }
    //lenvoie de lemail et la redirection vers la page 
    const { error1 } = await supabase.auth.resetPasswordForEmail("kechidyasmine2@gmail.com")
    if (error1) {
      throw new Error(error1.message);
    } else {
      
      console.log('Email de réinitialisation du mot de passe envoyé avec succès.');
    }
    // Reset the user's password
    const { data, error } = await supabase.auth.updateUser({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Respond with a success message
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    res.status(500).json({ error: "An error occurred" });
  }
};


/*


// Fonction pour réinitialiser le mot de passe pour un email donné
async function resetPassword(email) {
  try {


    const { data } = await supabase.auth.getSession();
    if (!data) {
      throw new Error('Utilisateur non authentifié');
    }
    const { error } = await supabase.auth.resetPasswordForEmail("kechidyasmine2@gmail.com"
    
    
    
    );

    if (error) {
      throw new Error(error.message);
    } else {
      
      console.log('Email de réinitialisation du mot de passe envoyé avec succès.');
    }
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error.message);
  }
}
resetPassword("kechidyasmine2@gmail.com");



// Fonction pour mettre à jour le mot de passe de l'utilisateur
async function updatePassword(newPassword , email) {
  try {
     // Vérifiez d'abord la session d'authentification ou actualisez-la si nécessaire
     await supabase.auth.refreshSession();
    const { error } = await supabase.auth.updateUser({ 
      email:email,
      password: newPassword }); 

    if (error) {
      throw new Error(error.message);
    } else {
      console.log('Mot de passe mis à jour avec succès.');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error.message);
  }
}
*/
//--------------------------------------------------------------------------delete user 


async function updatePassword(newPassword , email) {
  try {
     // Vérifiez d'abord la session d'authentification ou actualisez-la si nécessaire
     await supabase.auth.refreshSession();
    const { error } = await supabase.auth.updateUser({ 
      email:email,
      password: newPassword }); 

    if (error) {
      throw new Error(error.message);
    } else {
      console.log('Mot de passe mis à jour avec succès.');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error.message);
  }
}

async function DeleteUser(req, res) {
  const { idu } = req.body;
  try {
    const { data, error } = await supabase
      .from('User')
      .delete()
      .eq("id", idu);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
}




//-----------------------------------------------------------------------getUsers
async function getUsers(req, res) {
  try {
    const { data, error } = await supabase
      .from('User')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}





//-----------------------------------------MFA -- en cours de production 

async function createMFAChallenge(userId) {
  try {
    const { data, error } = await supabase.auth.mfa.challenge({
      userId: userId,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data; // Le défi MFA généré
  } catch (error) {
    throw new Error('Failed to create MFA challenge: ' + error.message);
  }
}



async function verifyMFAChallenge(userId, challengeId, code) {
  try {
    const { data, error } = await supabase.auth.mfa.verify({
      userId: userId,
      challengeId: challengeId,
      code: code,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data; // Les informations de vérification MFA
  } catch (error) {
    throw new Error('Failed to verify MFA challenge: ' + error.message);
  }
}

//--------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------



module.exports = { getUsers , createUser , SignInUser , signOut , DeleteUser , createMFAChallenge , verifyMFAChallenge,
  resetPassword  , updatePassword}
