import Application from "@/models/Application";
import { logger } from '@/lib/winston';
import { Request, Response } from 'express';

const createApplication = async (req: Request, res: Response) => {
    try {
        const newApplication = new Application(req.body);

        const savedApplication = await newApplication.save();

        res.status(201).json({
            message: 'Application submitted successfully',
            applicationId: savedApplication._id,
        });
    } catch (error) {
        logger.error('Error saving application:', error);
        res.status(500).json({message: 'Failed to submit application'})
    }
}

export default createApplication;