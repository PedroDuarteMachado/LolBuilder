import axios from "axios";

async function getChampions() {
    try {
        const versionsResponse = await axios.get<string[]>(
            "https://ddragon.leagueoflegends.com/api/versions.json"
        );

        const latestVersion = versionsResponse.data[0];

        const championsURL =
            `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`;

        const championsResponse = await axios.get<{ data: Record<string, any> }>(
            championsURL
        );

        const champions = Object.keys(championsResponse.data.data);

        console.log("Versão:", latestVersion);
        console.log("Total de campeões:", champions.length);

    } catch (err) {
        console.error("Erro:", err);
    }
}

getChampions();
