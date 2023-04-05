import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IWellKnownConfigurationResponse } from './interfaces';
import * as is from 'is_js';

@Injectable()
export default class FHIRAuthSetup {
  async getAuthConfig(serverAddress: string): Promise<{
    authURL: string;
    tokenURL: string;
  }> {
    let authURL = '';
    let tokenURL = '';
    const headersList = {
      Accept: 'application/json',
    };

    const reqOptions = {
      url: `${serverAddress}/.well-known/smart-configuration`,
      method: 'GET',
      headers: headersList,
    };

    const response = await axios.request(reqOptions);
    const serverAuthConfiguration: IWellKnownConfigurationResponse =
      response.data;
    if (is.existy(serverAuthConfiguration.authorization_endpoint)) {
      authURL = serverAuthConfiguration.authorization_endpoint;
    }
    if (is.existy(serverAuthConfiguration.token_endpoint)) {
      tokenURL = serverAuthConfiguration.token_endpoint;
    }

    return {
      authURL,
      tokenURL,
    };
  }
}
