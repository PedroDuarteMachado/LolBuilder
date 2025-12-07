import express from "express";
import fs from "fs";
import path from "path";
import championsRoutes from "../routes/champions.routes";

const app = express();
app.use(express.json());

// Caminho da pasta data
const dataDir = path.join(__dirname, "..", "data");


//Helper parar ler json
function readJson(fileName: string){
    const filePath = path.join(dataDir, fileName);
    if(!fs.existsSync(filePath)){
        return null;
    }
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
}

app.use("/champions", championsRoutes);


app.get("/items", (req, res) =>{
    const file = path.join(dataDir, "champion.json");
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    res.json(data);
});

app.listen(3333, () => {
    console.log(`Servidor rodando em http://localhost:3333`);
});

