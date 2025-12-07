import axios from "axios";
import fs from "fs";
import path from "path";

export async function fetchLeagueData() {
    try {
        const versions = await axios.get<string[]>("https://ddragon.leagueoflegends.com/api/versions.json");
        const latest = versions.data[0];

        console.log("Versão do LoL encontrada:", latest);

        const championUrl = `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`;
        const itemUrl = `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/item.json`;

        const champions = await axios.get<{ data: any }>(championUrl);
        const items = await axios.get<{ data: any }>(itemUrl);

        const dataDir = path.join(__dirname, "../data");
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

        fs.writeFileSync(path.join(dataDir, "champion.json"), JSON.stringify(champions.data, null, 2));
        fs.writeFileSync(path.join(dataDir, "item.json"), JSON.stringify(items.data, null, 2));

        console.log("Dados baixados com sucesso!", dataDir);
    } catch (error) {
        console.error("Erro ao baixar os dados:", error);
        throw error;
    }
}

// Só executa quando rodar manualmente: npx ts-node src/utils/fetchData.ts
fetchLeagueData();
