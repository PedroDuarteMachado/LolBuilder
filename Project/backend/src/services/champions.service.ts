import fs from "fs";
import path from "path";

export class ChampionService{
    getAllChampions(){
        const filePath = path.join(__dirname, "..", "data", "champion.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const json = JSON.parse(raw);

        return Object.values(json.data);
    }
}