
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://aibrwsnxbuklshdpwvzv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnJ3c254YnVrbHNoZHB3dnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzc1NTQsImV4cCI6MjAxNTIxMzU1NH0.dIHvOVjRuvG_ja4SgVrLQFDQPrKAjs4g5w0mKue3dlA';


const supabase = createClient(supabaseUrl, supabaseKey);
const { server, io } = require('../server.js')



async function DeleteMessage(req, res) {
   // Assurez-vous d'avoir bodyParser configuré pour traiter les requêtes POST
  
  const { idM} = req.body;
  
  try {
    const { data, error } = await supabase.from('Message')
    .delete()
    .eq('id', idM)

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Retourner uniquement les données de session dans la réponse JSON
    return res.status(200).json({ user, session });
  } catch (error) {
    console.error('Error signing in user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }

}
async function UpdateMesssage(req, res) {
    const { Contenu , date , heure , idM } = req.body;
  
  try {
    const { data, error } = await supabase
    .from('Message')
    .update({
      Contenu : Contenu,
      date : date,
      heure:heure
    }).eq('id', idM);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Retourner uniquement les données de session dans la réponse JSON
    return res.status(200).json({ user, session });
  } catch (error) {
    console.error('Error signing in user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
  
  }

async function Addmessage(req, res) {
  const { content , chatId } = req.body;
  
  try {
    const { data, error } = await supabase
    .from('Message')
    .insert({
      Content : content,
      chat:chatId
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }
      // Diffuser le message à tous les clients connectés
  //  io.emit('message', { content,  chat });









    // Retourner uniquement les données de session dans la réponse JSON
    return res.status(201).json({ message: 'Message added successfully', data });
  } catch (error) {
    console.error('Error signing in user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


async function getMessage(req, res) {
  try {
    const { data, error } = await supabase
      .from('Message')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}
module.exports = { getMessage , Addmessage , UpdateMesssage , DeleteMessage};
