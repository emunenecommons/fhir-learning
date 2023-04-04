import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
// import * as is from 'is_js';

@Injectable()
export class FhirService {
  constructor(private configService: ConfigService) {}

  FHIR_SMART_SERVER =
    'https://launch.smarthealthit.org/v/r4/sim/WzIsIiIsImU0NDNhYzU4LThlY2UtNDM4NS04ZDU1LTc3NWMxYjhmM2EzNyIsIkFVVE8iLDAsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0/fhir';
  private authURL = '';
  private tokenURL = '';
  private host = this.configService.get<string>('HOST_IP_ADDRESS');

  getAuthUrl(): string {
    return this.authURL;
  }
  getTokenUrl(): string {
    return this.tokenURL;
  }

  getHello(): string {
    return 'Hello fhir';
  }
  private readonly logger = new Logger(FhirService.name);

  // Connect to the FHIR server and get the metadata details
  async getAuthMetadata() {
    const headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    const reqOptions = {
      url: `${this.FHIR_SMART_SERVER}/metadata`,
      method: 'GET',
      headers: headersList,
    };

    const response = await axios.request(reqOptions);
    const extensionUrls: any[] =
      response.data.rest[0].security.extension[0].extension;
    this.logger.log('authURL: ', extensionUrls);

    extensionUrls.forEach((extensionItem) => {
      switch (extensionItem.url) {
        case 'authorize':
          this.authURL = extensionItem.valueUri;
          break;
        case 'token':
          this.tokenURL = extensionItem.valueUri;
          break;
        default:
          break;
      }
    });

    return this.authURL;
  }
}
