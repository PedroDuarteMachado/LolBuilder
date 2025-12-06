"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function getChampions() {
    const versionsRes = await axios_1.default.get("https://ddragon.leagueoflegends.com/api/versions.json");
    const latest = versionsRes.data[0];
    const url = `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`;
    const response = await axios_1.default.get(url);
    console.log("Versão utilizada: ", latest);
    console.log("Campeões carregados:");
    console.log(Object.keys(response.data.data));
}
getChampions();
//# sourceMappingURL=index.js.map