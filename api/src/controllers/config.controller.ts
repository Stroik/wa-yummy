import { Request, Response } from 'express';
import { Config, PrismaClient } from '../lib/prisma';

const prisma = new PrismaClient();

export const setConfig = async (req: Request, res: Response) => {
  const { user } = req;
  const { key, value } = req.body;
  try {
    const userConfigs = await prisma.config.findMany({
      where: {
        userId: user?.id ?? '',
      },
    });

    if (userConfigs) {
      const filtered = userConfigs.find((c: Config) => c.key === key);

      if (filtered) {
        const updated = await prisma.config.update({
          where: {
            id: filtered.id,
          },
          data: {
            value,
          },
        });
        return res.json(updated);
      }

      const created = await prisma.config.create({
        data: {
          key,
          value,
          userId: user?.id ?? '',
        },
      });

      return res.json(created);
    } else {
      const created = await prisma.config.create({
        data: {
          key,
          value,
          userId: user?.id ?? '',
        },
      });
      return res.json(created);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error' });
  }
};

export const getPlans = async (req: Request, res: Response) => {
  try {
    const plans = await prisma.plan.findMany();
    return res.json(plans);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error' });
  }
};
