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
