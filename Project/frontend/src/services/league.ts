import axios from "axios";

export async function getChampions(){
    const url = 
        "https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json";

    const response = await axios.get(url);
    return response.data.data; //campeões

}