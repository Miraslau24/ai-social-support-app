import { Router } from 'express';
import generateAiSuggestion from '@/controllers/v1/ai_assistant/send_prompt_to_ai';

const router = Router();

router.post("/generate", generateAiSuggestion);

export default router;