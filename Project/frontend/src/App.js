import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getChampions } from "./services/league";
function App() {
    const [champions, setChampions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function load() {
            try {
                const data = await getChampions();
                setChampions(Object.values(data));
            }
            finally {
                setLoading(false);
            }
        }
        load();
    }, []);
    if (loading)
        return _jsx("h1", { children: "Carregando campe\u00F5es..." });
    return (_jsxs("div", { style: { padding: 20 }, children: [_jsx("h1", { children: "Campe\u00F5es do League of Legends" }), _jsx("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(150px, 1fr))",
                    gap: 20
                }, children: champions.map((champ) => (_jsxs("div", { style: { textAlign: "center" }, children: [_jsx("img", { src: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${champ.image.full}`, alt: champ.name, width: 120 }), _jsx("p", { children: champ.name })] }, champ.id))) })] }));
}
export default App;
//# sourceMappingURL=App.js.map