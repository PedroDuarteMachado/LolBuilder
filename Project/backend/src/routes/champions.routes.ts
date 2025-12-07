import { Router } from "express";
import { getAllChampions } from "../controllers/champions.controller";

const router = Router();


//GET /champions
router.get("/", (req, res) =>{
    return res.json({message: "Listando Campeões..."});
});

router.get("/all", getAllChampions);

export default router;