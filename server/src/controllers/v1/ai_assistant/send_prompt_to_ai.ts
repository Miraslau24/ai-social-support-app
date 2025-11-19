import { Request, Response } from 'express';
import config from '@/config';
import { logger } from '@/lib/winston';

const generateAiSuggestion = async (req: Request, res: Response) => {
  const { messages } = req.body;
  const controller = new AbortController();

  req.on('close', () => {
    logger.info('Client closed connection, Aborting external request...');
    controller.abort();
  })

  if (!messages) {
    res.status(400).json({ message: 'Messages are required' });
    return;
  }

  try {
    const aiResponse = await fetch(config.API_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${config.OPEN_AI_KEY}`,
        'Content-Type': 'application/json',
        'Accept-Language': 'en, ar;q=0.9',
      },
      body: JSON.stringify({
        model: config.API_MODEL,
        messages: messages,
        temperature: 1.0
      }),
    })

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(`External API Error: ${aiResponse.status} ${errorText}`);
    }
    const data = await aiResponse.json();
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        logger.warn('External request aborted successfully.');
        return;
      }

      logger.error('AI Proxy Error:', error.message);
      if (!res.headersSent) {
        res.status(500).json({
          message: 'Failed to fetch AI response',
          error: error.message
        });
      }
    } else {
      logger.error('Unknown error type:', error);

      if (!res.headersSent) {
        res.status(500).json({
          message: 'An unknown error occurred',
          error: String(error),
        });
      }
    }
  }
};

export default generateAiSuggestion;