
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://aibrwsnxbuklshdpwvzv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnJ3c254YnVrbHNoZHB3dnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzc1NTQsImV4cCI6MjAxNTIxMzU1NH0.dIHvOVjRuvG_ja4SgVrLQFDQPrKAjs4g5w0mKue3dlA';


const supabase = createClient(supabaseUrl, supabaseKey);


//chat jai rajouter lattribut type envoyer a partir du front ! chat or groupe 

  async function createChat(Title, From , type) {
    try {
        const { data, error } = await supabase.from("Chat").insert({
            Admin: From,
            Titre: Title,
            State:"Down",
            type:type

        }).select();

        if (error) {
            throw new Error(error.message);
        }
       console.log(data)
        return data[0].id; 

    } catch (error) {
        console.error('Error creating chat:', error.message);
        throw new Error('Failed to create chat');
    }
}

//----------------------- envoyer invit des deux cas chat and group , en vas garder cella la 
async function Sentinvitchat(req, res) {
    const { Title, From, to , type } = req.body;

    try {
       
        const chatId = await createChat(Title, From , type);

       
        const { error: inviteError } = await supabase.from("Invitation").insert({
            From: From,
            idchat: chatId,
            To: to
        });

        if (inviteError) {
            console.error('Error sending invitation:', inviteError.message);
            return res.status(500).json({ message: 'Internal server error' });
        }

       
        return res.status(200).json({ message: 'Invitation sent successfully', chatId });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


//----------------------la fonction qui permet de supprimer le chat ! en cas de rejet dinvitation 
async function RejectInvit(req, res) {
  const { id } = req.body;
  try {
    const { data, error } = await supabase
      .from('Chat')
      .delete()
      .eq("id", id);
    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.error('Error updating invitation:', error.message);
    res.status(500).json({ error: 'Error updating invitation' });
  }
}

//----------------------la fonction qui permet de modifier le chat lors de lacceptation de linvitation 
async function AcceptInvit(req, res) {
  const { id } = req.body;
  try {
    const { data, error } = await supabase
      .from('Chat')
      .update({ State: "Up" })
      .eq("id", id);
    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.error('Error updating invitation:', error.message);
    res.status(500).json({ error: 'Error updating invitation' });
  }
}


async function getConversation(req, res) {
  try {
    const { data, error } = await supabase
      .from('Chat')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

//groupe 

async function createGroup(Title, Admin) {
  try {
    const { data, error } = await supabase
      .from('Groupe')
      .insert({ Titre:Title
        , From:Admin
       }).select();

    if (error) {
      throw error;
    }

    return data[0].id
  } catch (error) {
    console.error('Error creating group:', error.message);
    throw new Error('Failed to create group');
  }
}

//------------------------------ on va pas lutiliser dans c cas 
async function sendGroupInvitation(req, res) {
  const { Title, Admin, members  } = req.body;

  try {
    let groupId = req.body.idGroup; 

    if (!groupId) {
      groupId = await createGroup(Title, Admin);
    }

 
    for (const member of members) {
      await supabase.from('Member').insert({ id: member, groupId : groupId });
    }

    
    await supabase.from('Invitation').insert({ idGroupe: groupId, Admin :Admin , User:members});

    return res.status(200).json({ message: 'Group invitation sent successfully', groupId });
  } catch (error) {
    console.error('Error sending group invitation:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



//------------------ rien a faire 

async function AcceptInvitGroupe(req, res) {
 // jsp quoi faire ? 
}


//--------------- HADA MAKAN 

module.exports = { getConversation ,
  sendGroupInvitation, 
  RejectInvit ,
   AcceptInvit , 
   Sentinvitchat,
   AcceptInvitGroupe


};
