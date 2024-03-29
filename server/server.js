/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);


const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';

const supabase = createClient(supabaseUrl, supabaseKey);
const { getUsers } = require('./controllers/userController'); // Importez la fonction getUsers depuis votre contrôleur


// Exemple d'utilisation dans un contrôleur
app.get('/api/users', getUsers);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
// server.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const userRoutes = require('./routes/userRoutes');
const InvitationRoutes = require('./routes/InvitationRoutes');
const MessageRoutes = require('./routes/MessageRoutes');
const FriendRoutes = require('./routes/FriendRoutes');






const app = express();


const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

app.use('/api', userRoutes);
app.use('/Invitation', InvitationRoutes);
app.use('/Friends', FriendRoutes);
app.use('/Message', MessageRoutes);


//sockets
const http = require('http');
const socketIo = require('socket.io');

//initialiser un server sockets
const server = http.createServer(app);
//pour ecouter les cnx entrantes du client
const io = socketIo(server);

// Gestion des connexions socket
io.on('connection', (socket) => {
    console.log('New client connected');

    // Gestion des événements
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Diffuser le message à tous les clients connectés
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Socket server listening on port 3000');
});


module.exports = { app, server, io };
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/



// Importer les dépendances

const express = require('express');
const cors = require('cors');
const app = express();

// Activer CORS

const http = require('http');
const socketIo = require('socket.io');




app.use(cors({
    origin: 'http://localhost:3000' // Autorise uniquement les requêtes provenant de localhost:3000
}));



const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';

const supabase = createClient(supabaseUrl, supabaseKey);








const userRoutes = require('./routes/userRoutes');
const InvitationRoutes = require('./routes/InvitationRoutes');
const MessageRoutes = require('./routes/MessageRoutes');
const FriendRoutes = require('./routes/FriendRoutes');

// Créer l'application Express


// Créer un serveur HTTP à partir de l'application Express
const server = http.createServer(app);

// Initialiser socket.io avec le serveur HTTP
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000", // Autoriser les connexions depuis ce domaine
      methods: ["GET", "POST"], // Autoriser les méthodes HTTP GET et POST
    },
  });


  io.on('connection', (socket) => {
    console.log('New client connected');

    // Envoyer un message de bienvenue au nouveau client
    socket.emit('welcome', 'Welcome to the chat room!');

    // Gestion de la réception des messages
    socket.on('message', async (data) => { // Ajoutez async ici
        console.log('Message received from client:', data);
       /* if (data.chatId === '42')
        
        
        {*/ io.emit('message', data);
    
    
   /*}*/
})








    // Gestion de la déconnexion des clients
    socket.on('disconnect', () => {
        console.log('Client disconnected');
     
    });
});

app.use(express.json());








// Définir les routes pour les différentes fonctionnalités de votre application
app.use('/api', userRoutes);
app.use('/Invitation', InvitationRoutes);
app.use('/Friends', FriendRoutes);
app.use('/Message', MessageRoutes);










// Écouter le serveur sur un port spécifique
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Exporter l'application, le serveur et io pour une utilisation dans d'autres fichiers
module.exports = { app, server, io };
