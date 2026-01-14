import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import codingActivity from './codingCalendar/main.js'
import sendMail from './reachOut/main.js';
import { EmailBody } from './types.js';

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

app.get('/coding-activity',async (req,res)=>{
    const data  = await codingActivity(); // data: {date: string, count: number}
    res.json({data});
})

app.post('/reach-out',async (req,res)=>{
    const parsedResult = EmailBody.safeParse(req.body);
    if(!parsedResult.success){
        return res.status(400).json({error: parsedResult.error.message,type:'parseError'});
    }
    try {
        await sendMail(parsedResult.data);
        return res.status(200).json({message: 'success'});
    } catch (error) {
        if(error instanceof Error) return res.status(500).json({error: error.message??'Error Occurred'});
        return res.status(500).json({error: "Unexpected Error!"});
    }
});

// app.listen(3000,()=>console.log('server listening on port 3000')); // keeping app.ts for local testing


