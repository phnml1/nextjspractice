import { connectDatabase, insertDocument, getAllDocuments} from '@/helpers/db-util'
async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  }catch (error) {
    res.status(500).json('Coonecting to the database failed');
    return;
  }
  
  if (req.method === "POST") {
    //add server-side validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
      client.close();
    }
    console.log(email, name, text);
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    try {
    const result = await insertDocument(client,"comments",newComment);
    newComment._id = result.insertedId;

    res.status(201).json({ message: "Added comment", comment: newComment });
    } catch(error) {
        res.status(500).json({message: 'Inserting comment Failed'});
    }
    
  }
  if (req.method === "GET") {
    try {
    const document = await getAllDocuments(client,'comments',{_id:-1},{eventId: eventId});

    res.status(200).json({ comments: document });
    }catch(error){
        res.status(500).json({message: 'Getting documents failed'});
        return;
    }

  }
  client.close();
}

export default handler;
