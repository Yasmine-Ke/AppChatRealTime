# Rapport sur l'implémentation des Sockets et l'Authentification Utilisateur

## Introduction
Ce rapport vise à documenter la mise en place des sockets pour la communication en temps réel dans une application, ainsi que les fonctionnalités d'authentification utilisateur utilisant Supabase. 

## Sockets
### Étape 1 : Connexion au Serveur Socket.io
- Établissement d'une connexion avec le serveur Socket.io à l'aide de la bibliothèque `socket.io-client`.
- Gestion de la connexion dans un composant React à l'aide de `useEffect`.

### Étape 2 : Réception et Envoi de Messages
- Réception des messages du serveur à l'aide de l'événement `'message'`.

 socket.on('message', async (data) => { 
        console.log('Message received from client:', data);})

- Envoi des messages au serveur à l'aide de la méthode `emit`.     socket.emit('message', {//vos attributs });

### Étape 3 : Enregistrement des Messages dans la Base de Données
- Utilisation d'une requête HTTP pour enregistrer les messages dans la base de données.
- Utilisation d'une condition pour n'enregistrer les messages que pour un chat spécifique.

## Authentification Utilisateur avec Supabase
### Création d'Utilisateur (`createUser`)
- Gestion de la création d'un nouvel utilisateur en utilisant l'API Supabase.
- Insertion des informations utilisateur dans la base de données après la création du compte.
-pour la creaction user jai utiliser la fonction supabase.auth.signUp de supabase qui permet denvoyer un message de verification a lemail de lutilisateur de tel maniere suivant :
![Confirme ur email from supabase ](image.png)
-et voila la fonction 
     const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

### Connexion Utilisateur (`SignInUser`)
- Gestion de la connexion d'un utilisateur existant en utilisant l'adresse e-mail et le mot de passe.
- Retour des informations de session et de l'utilisateur connecté.
- voila la fonction : 
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
- permet de retourner la session de lutilisateur et lenvoyer au client 
### Déconnexion Utilisateur (`signOut`)
- Gestion de la déconnexion de l'utilisateur actuellement connecté.
- Utilisation de la méthode `signOut` de Supabase pour terminer la session.
-en utilisant la fonction signout de supabase 

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
### Réinitialisation de Mot de Passe (`resetPassword`)
- Implémentation de la réinitialisation du mot de passe en cas d'oubli.
- Envoi d'un e-mail de réinitialisation et mise à jour du mot de passe dans la base de données.
-en utilisant la fonction resetpassword de suabase qui permet de verifier dabors votre email si il existe puis de vous envoyer un email a votre compte apres la confirmation vous allez deriger vers la page "choisit par le code" pour modifier votre password ; 
 la fonction : const { error1 } = await supabase.auth.resetPasswordForEmail("kechidyasmine2@gmail.com")
 ![Verification Email](image-1.png)
 -qlq modification sur supabase qui permet de rederiger vert la page que vous vouler apres la verification de email 
 ![alt text](image-2.png)  ![alt text](image-3.png)
 -   ![vous pouvez tjr choisir tout depend le cas](image-4.png)
### Suppression de Compte Utilisateur (`DeleteUser`)
- Gestion de la suppression d'un compte utilisateur à partir de la base de données.
-une simple fonction qui permet de supprimer un utilisateur 

### Récupération des Utilisateurs (`getUsers`)
- Récupération de la liste des utilisateurs enregistrés dans la base de données.
- de meme une simpl efonction qui permet de recuperer la liste 

## Conclusion
Ce rapport a décrit  l'implémentation des sockets pour la communication en temps réel dans une application, ainsi que les fonctionnalités d'authentification utilisateur utilisant Supabase. Ces fonctionnalités sont essentielles pour assurer la sécurité et la convivialité de l'application.




------------------------------------------



# Rapport sur l'implémentation des Sockets et l'Authentification Utilisateur

## Introduction
Ce rapport vise à documenter la mise en place des sockets pour la communication en temps réel dans une application, ainsi que les fonctionnalités d'authentification utilisateur utilisant Supabase.

## Sockets
### Étape 1 : Connexion au Serveur Socket.io
- Établissement d'une connexion avec le serveur Socket.io à l'aide de la bibliothèque `socket.io-client`.
- Gestion de la connexion dans un composant React à l'aide de `useEffect`.

### Étape 2 : Réception et Envoi de Messages
- Réception des messages du serveur à l'aide de l'événement `'message'`.

```javascript
socket.on('message', async (data) => { 
    console.log('Message received from client:', data);
})
```

- Envoi des messages au serveur à l'aide de la méthode `emit`.    

```javascript
socket.emit('message', {//vos attributs });
```

### Étape 3 : Enregistrement des Messages dans la Base de Données
- Utilisation d'une requête HTTP pour enregistrer les messages dans la base de données.
- Utilisation d'une condition pour n'enregistrer les messages que pour un chat spécifique.

## Authentification Utilisateur avec Supabase
### Création d'Utilisateur (`createUser`)
- Gestion de la création d'un nouvel utilisateur en utilisant l'API Supabase.
- Insertion des informations utilisateur dans la base de données après la création du compte.
- ![Confirme ur email from supabase ](image.png)
- Fonction :

```javascript
const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password
});
```

### Connexion Utilisateur (`SignInUser`)
- Gestion de la connexion d'un utilisateur existant en utilisant l'adresse e-mail et le mot de passe.
- Retour des informations de session et de l'utilisateur connecté.
- Fonction :

```javascript
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
    }
}
```

### Déconnexion Utilisateur (`signOut`)
- Gestion de la déconnexion de l'utilisateur actuellement connecté.
- Utilisation de la méthode `signOut` de Supabase pour terminer la session.
- Fonction :

```javascript
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
```

### Réinitialisation de Mot de Passe (`resetPassword`)
- Implémentation de la réinitialisation du mot de passe en cas d'oubli.
- Envoi d'un e-mail de réinitialisation et mise à jour du mot de passe dans la base de données.
- ![Verification Email](image-1.png)
- Fonction :

```javascript
const { error1 } = await supabase.auth.resetPasswordForEmail("kechidyasmine2@gmail.com");
```

### Suppression de Compte Utilisateur (`DeleteUser`)
- Gestion de la suppression d'un compte utilisateur à partir de la base de données.
- Fonction :

```javascript
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
```

### Récupération des Utilisateurs (`getUsers`)
- Récupération de la liste des utilisateurs enregistrés dans la base de données.
- Fonction :

```javascript
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
```

## Conclusion
Ce rapport a décrit  l'implémentation des sockets pour la communication en temps réel dans une application, ainsi que les fonctionnalités d'authentification utilisateur utilisant Supabase. Ces fonctionnalités sont essentielles pour assurer la sécurité et la convivialité de l'application.





