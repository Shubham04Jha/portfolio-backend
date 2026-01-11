import express, { application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import codingActivity from './codingCalendar/main.js'

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

const map = new Map<string, number>();

app.get('/coding-activity',async (req,res)=>{
    const data  = await codingActivity(); // data: {date: string, count: number}
    res.json({data});
})

app.listen(3000,()=>console.log('server listening on port 3000')); // keeping app.ts for local testing


