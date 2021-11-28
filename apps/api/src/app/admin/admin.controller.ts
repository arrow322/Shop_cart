import { DataGatheringService } from '@ghostfolio/api/services/data-gathering.service';
import {
  AdminData,
  AdminMarketData,
  AdminMarketDataDetails
} from '@ghostfolio/common/interfaces';
import {
  getPermissions,
  hasPermission,
  permissions
} from '@ghostfolio/common/permissions';
import type { RequestWithUser } from '@ghostfolio/common/types';
import {
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  public constructor(
    private readonly adminService: AdminService,
    private readonly dataGatheringService: DataGatheringService,
    @Inject(REQUEST) private readonly request: RequestWithUser
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async getAdminData(): Promise<AdminData> {
    if (
      !hasPermission(
        getPermissions(this.request.user.role),
        permissions.accessAdminControl
      )
    ) {
      throw new HttpException(
        getReasonPhrase(StatusCodes.FORBIDDEN),
        StatusCodes.FORBIDDEN
      );
    }

    return this.adminService.get();
  }

  @Post('gather/max')
  @UseGuards(AuthGuard('jwt'))
  public async gatherMax(): Promise<void> {
    if (
      !hasPermission(
        getPermissions(this.request.user.role),
        permissions.accessAdminControl
      )
    ) {
      throw new HttpException(
        getReasonPhrase(StatusCodes.FORBIDDEN),
        StatusCodes.FORBIDDEN
      );
    }

    await this.dataGatheringService.gatherProfileData();
    this.dataGatheringService.gatherMax();

    return;
  }

  @Post('gather/profile-data')
  @UseGuards(AuthGuard('jwt'))
  public async gatherProfileData(): Promise<void> {
    if (
      !hasPermission(
        getPermissions(this.request.user.role),
        permissions.accessAdminControl
      )
    ) {
      throw new HttpException(
        getReasonPhrase(StatusCodes.FORBIDDEN),
        StatusCodes.FORBIDDEN
      );
    }

    this.dataGatheringService.gatherProfileData();

    return;
  }

  @Get('market-data')
  @UseGuards(AuthGuard('jwt'))
  public async getMarketData(): Promise<AdminMarketData> {
    if (
      !hasPermission(
        getPermissions(this.request.user.role),
        permissions.accessAdminControl
      )
    ) {
      throw new HttpException(
        getReasonPhrase(StatusCodes.FORBIDDEN),
        StatusCodes.FORBIDDEN
      );
    }

    return this.adminService.getMarketData();
  }

  @Get('market-data/:symbol')
  @UseGuards(AuthGuard('jwt'))
  public async getMarketDataBySymbol(
    @Param('symbol') symbol
  ): Promise<AdminMarketDataDetails> {
    if (
      !hasPermission(
        getPermissions(this.request.user.role),
        permissions.accessAdminControl
      )
    ) {
      throw new HttpException(
        getReasonPhrase(StatusCodes.FORBIDDEN),
        StatusCodes.FORBIDDEN
      );
    }

    return this.adminService.getMarketDataBySymbol(symbol);
  }
}
