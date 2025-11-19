import { Router } from 'express';
import applicationRoutes from "@/routes/v1/application";
import aiRoutes from '@/routes/v1/ai_assistant';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

router.use('/application', applicationRoutes);
router.use('/ai', aiRoutes)

export default router;
