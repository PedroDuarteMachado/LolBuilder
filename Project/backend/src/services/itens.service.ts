import axios from "axios";
import fs from "fs";
import path from "path";

type ItemResponse = {
    "id": number;
    "name": string;
    "description": string;
    "price": number;
    "tags": string[];
}


export async function fetchItemsAndSave(){

    const versionsUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
    const itensUrlBase = "https://ddragon.leagueoflegends.com/cdn";

    //buscar versões

    const versionsResponse = await axios.get<string[]>(versionsUrl);
    const latest = versionsResponse.data[0];

    //buscar lista de itens

    const itensResponse = await axios.get<ItemResponse>(
        `${itensUrlBase}/${latest}/data/en_US/item.json`
    );

    //caminho para salvar

    const filePath = path.join(__dirname, "..", "data", "items.json");

    //Salvar no Json

    fs.writeFileSync(filePath, JSON.stringify(itensResponse.data, null, 2));

    return {
        version: latest,
        total: Object.keys(itensResponse.data).length,
    }
}