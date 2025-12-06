"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function fetchLeagueData() {
    try {
        //Versão recente
        const versions = await axios_1.default.get("https://ddragon.leagueoflegends.com/api/versions.json");
        const latest = versions.data[0];
        console.log("Versão do LoL encontrada: ", latest);
        //URL dos dados
        const championUrl = `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`;
        const itemUrl = `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/item.json`;
        //Baixa champ e itens
        const champions = await axios_1.default.get(championUrl);
        const items = await axios_1.default.get(itemUrl);
        //Caminho da pasta /src/data
        const dataDir = path_1.default.join(__dirname, "data");
        //criar pasta
        if (!fs_1.default.existsSync(dataDir)) {
            fs_1.default.mkdirSync(dataDir);
        }
        //Salva arquivos
        fs_1.default.writeFileSync(path_1.default.join(dataDir, "champion.json"), JSON.stringify(champions.data, null, 2));
        fs_1.default.writeFileSync(path_1.default.join(dataDir, "item.json"), JSON.stringify(items.data, null, 2));
        console.log("Dados baixados e salvo com sucesso!");
    }
    catch (error) {
        console.error("Erro ao buscar dados: ", error);
    }
}
fetchLeagueData();
//# sourceMappingURL=fetchData.js.map