"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function getChampions() {
    try {
        //Buscar todas as versões do DDragon
        const versionsURL = "https://ddragon.leagueoflegends.com/api/versions.json";
        const versionsResponse = await axios_1.default.get(versionsURL);
        const latestVersion = versionsResponse.data[0];
        console.log("Usando versão:", latestVersion);
        // Buscar dados dos campeões dessa versão
        const championsURL = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`;
        const championsResponse = await axios_1.default.get(championsURL);
        const champions = Object.keys(championsResponse.data.data);
        console.log("Campeões carregados:", champions.length);
        console.log(champions);
        return champions;
    }
    catch (err) {
        console.error("Erro ao buscar campeões:", err);
    }
}
getChampions();
//# sourceMappingURL=index.js.map