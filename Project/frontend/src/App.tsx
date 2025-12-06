import { useEffect, useState } from "react";
import { getChampions } from "./services/league";


function App() {
  const [champions, setChampions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()  =>{
    async function load(){
      try{
        const data = await getChampions();
        setChampions(Object.values(data));
      } finally{
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <h1>Carregando campeões...</h1>;


  return (
    <div style={{ padding: 20}}>
      <h1>Campeões do League of Legends</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(150px, 1fr))",
        gap: 20
      }}>
        {champions.map((champ) => (
          <div key={champ.id} style={{ textAlign: "center" }}>
            <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${champ.image.full}`}
                alt={champ.name}
                width={120}
                />
                <p>{champ.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
