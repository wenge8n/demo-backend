import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';

import { DEVICES } from '../models/device.model';

export class ApiRoutes {
  public static path = '/api';
  private static instance: ApiRoutes;
  private router = Router();

  private constructor() {
    logger.info('[ApiRoute] Creating api routes.');

    this.router.get('/getDevices', (req, res, next) => {
      res.status(200).json({ success: true, data: DEVICES });
    });

    this.router.post('/getDevices', (req, res, next) => {
      const status = req.body.status;
      const deviceId = req.body.deviceId;
      logger.info(deviceId);

      if (status !== undefined) {
        return res.status(200).json({
          success: true,
          data: DEVICES.filter(device => {
            return device.status === +status;
          }),
        });
      } else if (deviceId !== undefined) {
        return res.status(200).json({
          success: true,
          data: DEVICES.filter(device => {
            return device.id === +deviceId;
          })[0],
        });
      }
      return res.send({ code: 400, msg: 'param is missing' });
    });
  }

  static get router() {
    if (!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes();
    }
    return ApiRoutes.instance.router;
  }

  private getDevices = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, data: DEVICES });
  };
}
