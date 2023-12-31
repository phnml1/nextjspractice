
import {connectDatabase, insertDocument} from '@/helpers/db-util';

async function handler(req,res) {
    let client;
    if(req.method === 'POST') {
        const userEmail = req.body.email;
        if(!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid email address'});
            return;
        }
    try{
        client = await connectDatabase();
    }catch(error){
        res.status(500).json({message:'Connecting to the databse failed!'});
        return;
    }

    try {

        await insertDocument(client,'newsletter',{email: userEmail});
        client.close();
    }catch(error){
        res.status(500).json({message: 'Inserting data failed!'});
        return;
    }

    res.status(201).json({message:'Signed up!'});
    }
}
export default handler;