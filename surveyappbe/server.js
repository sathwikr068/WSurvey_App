import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {createClient} from "@supabase/supabase-js";
import dotenv from "dotenv";

const app = express();
const port = 4000;
dotenv.config()

app.use(cors());
app.use(bodyParser.json());

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

app.get("/",(req,res)=>{
    res.send("welcome");
})


app.get("/api/questions", async (req,res) => {
    const {data,error} = await supabase.from("questions").select("*");
    if (error) return res.status(500).json({error: error.message});
    res.json(data);
});


app.post("/api/responses", async (req,res)=>{
    const responses = req.body;
    const rows = Object.entries(responses).map(([qid,answer]) => ({
        question_id : qid,
        answer,
    }));

    const {error} = await supabase.from("responses").insert(rows);
    if (error) return res.status(500).json({error:error.message});
    res.json({message: "responses are saved"})
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});