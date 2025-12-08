import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export function getAllChampions(req: Request, res: Response) {
    const filePath = path.join(__dirname, "..", "data", "champion.json");

    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(raw);

        return res.json({
            message: "Campeões carregados com sucesso",
            total: Object.keys(data.data).length,
            champions: data.data,
        });

    } catch (error) {
        return res.status(500).json({
            error: "Erro ao ler o arquivo champion.json",
        });
    }
}

export function getChampionById(req: Request, res: Response){
    const id = req.params.id; // pega o nome da url
    const filePath = path.join(__dirname, "..", "data", "champions.json");

    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(raw);

        const champion = data.data[id];

        if(!champion) {
            return res.status(404).json({error: "Campeão não encontrado!"});
        }

        return res.json({
            message: "Campeão encontrado",
            champion
        });
    } catch (error) {
        return res.status(500).json({
            error: "Erro ao ler o arquivo champions.json",
        });
    }
}

export function searchChampion(req: Request, res: Response){
    const query = req.query.name as string;

    if(!query) {
        return res.status(400).json({
            error: "Parâmetro 'name' é obrigatório. exemplo: /champions/search?name=ahri"
        });
    }


    const filePath = path.join(__dirname, "..", "data", "champions.json");

    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(raw);

        //Joga tudo pra minúsculo

        const search = query.toLowerCase();

        const results = Object.values(data.data).filter((champ: any) =>
        champ.name.toLowerCase().includes(search) 
    );

    return res.json({
        query,
        results,
        total: results.length
    });

    } catch (error) {
    return res.status(500).json({
        error: "Erro ao ler champions.json"
    });
    }
}