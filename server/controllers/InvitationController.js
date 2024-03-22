
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://aibrwsnxbuklshdpwvzv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnJ3c254YnVrbHNoZHB3dnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzc1NTQsImV4cCI6MjAxNTIxMzU1NH0.dIHvOVjRuvG_ja4SgVrLQFDQPrKAjs4g5w0mKue3dlA';


const supabase = createClient(supabaseUrl, supabaseKey);




  async function createChat(Title, From) {
    try {
        const { data, error } = await supabase.from("Chat").insert({
            Admin: From,
            Titre: Title
        }).single();

        if (error) {
            throw new Error(error.message);
        }

        return data.id; 
    } catch (error) {
        console.error('Error creating chat:', error.message);
        throw new Error('Failed to create chat');
    }
}


async function Sentinvitchat(req, res) {
    const { Title, From, to } = req.body;

    try {
       
        const chatId = await createChat(Title, From);

       
        const { error: inviteError } = await supabase.from("Invitation").insert({
            Admin: From,
            idchat: chatId,
            User: to
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



async function Sentinvitchat2(req, res) {
  const { Title, From, to } = req.body;

  try {
      
      const { data: inviteData, error: inviteError } = await supabase.from("Invitation").insert({
          Admin: From,
          idchat: null, 
          User: to
      });

      if (inviteError) {
          console.error('Error sending invitation:', inviteError.message);
          return res.status(500).json({ message: 'Internal server error' });
      }

      if (!inviteData || inviteData.length === 0) {
          console.error('Error: No invitation data returned');
          return res.status(500).json({ message: 'Internal server error' });
      }

      const invitationId = inviteData[0].id; 


      const { data: chatData, error: chatError } = await supabase.from("Chat").insert({
          Titre: Title,
          State: "Down",
          Admin: From
      }).single();

      if (chatError) {
          console.error('Error creating chat:', chatError.message);
      
          await supabase.from("Invitation").delete().eq('id', invitationId);
          return res.status(500).json({ message: 'Internal server error' });
      }

      if (!chatData || chatData.length === 0) {
          console.error('Error: No chat data returned');
          return res.status(500).json({ message: 'Internal server error' });
      }

      const chatId = chatData.id;


      const { error: updateError } = await supabase.from("Invitation").update({ idchat: chatId }).eq('id', invitationId);

      if (updateError) {
          console.error('Error updating invitation:', updateError.message);
         
          await supabase.from("Chat").delete().eq('id', chatId);
          return res.status(500).json({ message: 'Internal server error' });
      }

     
      return res.status(200).json({ message: 'Invitation sent successfully', chatId });
  } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
  }
}
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
      .from('User')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}















async function createGroup(Title, Admin) {
  try {
    const { data, error } = await supabase
      .from('Groupe')
      .insert({ Titre:Title
        , From:Admin
       });

    if (error) {
      throw error;
    }

    return data[0].id
  } catch (error) {
    console.error('Error creating group:', error.message);
    throw new Error('Failed to create group');
  }
}


async function sendGroupInvitation(req, res) {
  const { Title, Admin, members } = req.body;

  try {
    let groupId = req.body.idGroup; 

    if (!groupId) {
      groupId = await createGroup(Title, Admin);
    }

 
    for (const member of members) {
      await supabase.from('Member').insert({ id: member, groupId : groupId });
    }

    
    await supabase.from('Invitation').insert({ groupId, Admin });

    return res.status(200).json({ message: 'Group invitation sent successfully', groupId });
  } catch (error) {
    console.error('Error sending group invitation:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}










module.exports = { getConversation ,sendGroupInvitation, RejectInvit , AcceptInvit , Sentinvitchat};
