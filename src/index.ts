import express, { application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import codingActivity from './codingCalendar/main.js'

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

app.get('/codingActivity',async (req,res)=>{
    const data  = await codingActivity(); // data: {date: string, count: number}
    res.json({data});
})

const map = new Map<string, number>();

