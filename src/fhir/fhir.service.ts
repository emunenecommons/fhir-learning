import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import FHIRAuthSetup from './fhir.auth-setup';
import FHIRAuthToken from './fhir.auth-token';

@Injectable()
export class FhirService implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    private fhirSetup: FHIRAuthSetup,
    private fhirAuthToken: FHIRAuthToken,
  ) {}
  onModuleInit() {
    this.getAuthEndpoints();
  }

  private FHIR_SMART_SERVER = this.configService.get<string>('FHIR_IP_ADDRESS');
  private authUrlEndpoint = '';
  private tokenUrlEndpoint = '';
  private host = this.configService.get<string>('HOST_IP_ADDRESS');

  //#region getters
  getAuthUrlEndpoint(): string {
    return this.authUrlEndpoint;
  }
  getTokenUrlEndpoint(): string {
    return this.tokenUrlEndpoint;
  }

  getHello(): string {
    return 'Hello fhir';
  }

  //#endregion

  async getAuthEndpoints(): Promise<void> {
    const authConfig = await this.fhirSetup.getAuthConfig(
      this.FHIR_SMART_SERVER,
    );
    this.authUrlEndpoint = authConfig.authURL;
    this.tokenUrlEndpoint = authConfig.tokenURL;
  }

  async getAuthRedirectUrl(): Promise<string> {
    const authToken: string = await this.fhirAuthToken.getAuthUrl(
      this.authUrlEndpoint,
      this.FHIR_SMART_SERVER,
    );

    return authToken;
  }

  // Connect to the FHIR server and get the metadata details
}
