import { Router } from 'express';
import createApplication from "@/controllers/v1/application/create_application";

const router = Router();

router.post('/', createApplication)

export default router;