import { Router } from "express";
import { getAllChampions, getChampionById, searchChampion } from "../controllers/champions.controller";
import { fetchChampionsAndSave } from "../services/champions.service";





const router = Router();

router.get("/update", async (req, res) =>{
    
    try{
        const result = await fetchChampionsAndSave();
        res.json({
            message: "Campeões atualizados com sucesso!",
            version: result.version,
            total: result.total
        });
    } catch (error){
        console.log(error);
        res.status(500).json({ error: "Erro ao atualizar campeões"});
    }
});

router.get("/", (req, res) =>{
    return res.json({message: "Listando Campeões..."});
});

router.get("/all", getAllChampions);

router.get("/:id", getChampionById);

router.get("/search", searchChampion);

export default router;
