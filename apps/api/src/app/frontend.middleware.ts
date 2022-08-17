import * as path from 'path';

import { DEFAULT_LANGUAGE_CODE } from '@ghostfolio/common/config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/api/') || this.isFileRequest(req.url)) {
      // Skip
      next();
    } else if (req.path.startsWith('/de/')) {
      res.sendFile(this.getPathOfIndexHtmlFile('de'));
    } else {
      res.sendFile(this.getPathOfIndexHtmlFile(DEFAULT_LANGUAGE_CODE));
    }
  }

  private getPathOfIndexHtmlFile(aLocale: string) {
    return path.join(__dirname, '..', 'client', aLocale, 'index.html');
  }

  private isFileRequest(filename: string) {
    if (filename === '/assets/LICENSE') {
      return true;
    } else if (filename.includes('auth/ey')) {
      return false;
    }

    return filename.split('.').pop() !== filename;
  }
}
