import axios from "axios";

async function getChampions(){

    const versionsRes = await axios.get(
        "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const latest = versionsRes.data[0];

    const url = `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`;

    const response = await axios.get(url);


    console.log("Versão utilizada: ", latest);
    console.log("Campeões carregados:");
    console.log(Object.keys(response.data.data));
}

getChampions();