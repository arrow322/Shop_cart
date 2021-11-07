import { ConfigurationModule } from '@ghostfolio/api/services/configuration.module';
import { CryptocurrencyModule } from '@ghostfolio/api/services/cryptocurrency/cryptocurrency.module';
import { GhostfolioScraperApiService } from '@ghostfolio/api/services/data-provider/ghostfolio-scraper-api/ghostfolio-scraper-api.service';
import { RakutenRapidApiService } from '@ghostfolio/api/services/data-provider/rakuten-rapid-api/rakuten-rapid-api.service';
import { YahooFinanceService } from '@ghostfolio/api/services/data-provider/yahoo-finance/yahoo-finance.service';
import { PrismaModule } from '@ghostfolio/api/services/prisma.module';
import { SymbolProfileModule } from '@ghostfolio/api/services/symbol-profile.module';
import { Module } from '@nestjs/common';

import { AlphaVantageService } from './alpha-vantage/alpha-vantage.service';
import { DataProviderService } from './data-provider.service';

@Module({
  imports: [
    ConfigurationModule,
    CryptocurrencyModule,
    PrismaModule,
    SymbolProfileModule
  ],
  providers: [
    AlphaVantageService,
    DataProviderService,
    GhostfolioScraperApiService,
    RakutenRapidApiService,
    YahooFinanceService,
    {
      inject: [
        AlphaVantageService,
        GhostfolioScraperApiService,
        RakutenRapidApiService,
        YahooFinanceService
      ],
      provide: 'DataProviderInterfaces',
      useFactory: (
        alphaVantageService,
        ghostfolioScraperApiService,
        rakutenRapidApiService,
        yahooFinanceService
      ) => [
        alphaVantageService,
        ghostfolioScraperApiService,
        rakutenRapidApiService,
        yahooFinanceService
      ]
    }
  ],
  exports: [DataProviderService, GhostfolioScraperApiService]
})
export class DataProviderModule {}
