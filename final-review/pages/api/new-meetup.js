import { MongoClient } from "mongodb";

// /api/new-meetup

async function handler(req, res) {
  // 입력 요청에 대한 데이터는 request객체
  // 응답을 다시 전송할 때 response객체
  if (req.method === 'POST') {
    const data = req.body;

  

    const { title, image, address, description} = data;
  
    const client = await MongoClient.connect('mongodb+srv://yuju0903:qwer1234@cluster0.usugtsx.mongodb.net/meetup?retryWrites=true&w=majority');
    const db = client.db();
    console.log(data);
    const meetupsCollection = db.collection('meetups');
    
    const result = await meetupsCollection.insertOne(data);
    
    console.log(result);
  
    client.close();

    res.status(201).json({message: 'Meetup inserted!'});
  }
}

export default handler;