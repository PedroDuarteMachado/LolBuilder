import axios from "axios";
import fs from "fs";
import path from "path";

type ChampionResponse = {
    type: string;
    format: string;
    version: string;
    data: Record<string, any>;
}


export async function fetchChampionsAndSave(){
    
    const versionsUrl ="https://ddragon.leagueoflegends.com/api/versions.json";
    const championsUrlBase = "https://ddragon.leagueoflegends.com/cdn";

    // Buscar versões

    const versionsResponse = await axios.get<string[]>(versionsUrl);
    const latest = versionsResponse.data[0];

    // Buscar lista de campeões

    const championsResponse = await axios.get<ChampionResponse>(
        `${championsUrlBase}/${latest}/data/en_US/champion.json`
    );

    //Onde vai ser salvo

    const filePath = path.join(__dirname, "..", "data", "champion.json");


    //Salvar no JSON
    fs.writeFileSync(filePath, JSON.stringify(championsResponse.data, null,2));

    return {
        version:latest,
        total: Object.keys(championsResponse.data.data).length
    }
};