import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export default class FHIRAuthToken {
  constructor(private configService: ConfigService) {}

  //#region global variables
  private hostIPAddress = this.configService.get<string>('HOST_IP_ADDRESS');
  //#endregion

  async getAuthUrl(
    authServerAddress: string,
    fhirServerAddress,
  ): Promise<string> {
    // https://ehr/authorize?
    //         response_type=code&
    //         client_id=app-client-id&
    //         redirect_uri=https%3A%2F%2Fapp%2Fafter-auth&
    //         launch=xyz123&
    //         scope=launch+patient%2FObservation.rs+patient%2FPatient.rs+openid+fhirUser&
    //         state=98wrghuwuogerg97&
    //         aud=https://ehr/fhir

    const scopes: string[] = [
      'openid',
      'fhirUser',
      'profile',
      'launch/patient',
      'patient/*.read',
    ];
    const scopesParameterString = scopes.reduce(
      (finalString, scope) => `${finalString} ${scope}`,
      '',
    );

    const authUrl =
      `${authServerAddress}` +
      `?response_type=code` +
      `&client_id=fhir_demo_id` +
      `&redirect_uri=${encodeURIComponent(this.hostIPAddress)}` +
      `&scope=${encodeURIComponent(scopesParameterString)}` +
      // `&scope=launch+patient%2FObservation.rs+patient%2FPatient.rs+openid+fhirUser` +
      `&state=local_state` +
      `&aud=${fhirServerAddress}`;

    return authUrl;
  }
}
