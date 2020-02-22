import axios, { AxiosError, AxiosResponse, AxiosInstance } from 'axios';

import {
  NoApiKeyProvidedException,
  NotFoundException,
  UnauthorizedException,
  GenericServerException,
} from './common/exceptions';
import { version } from '../package.json';
import { Krypton86Options } from './common/interfaces';

const DEFAULT_HOSTNAME = 'krypton86.com';

interface Properties {
  [key: string]: string | boolean | number;
}

export default class Krypton86 {
  readonly baseURL: string;
  private readonly client: AxiosInstance;

  constructor(readonly key?: string, readonly options: Krypton86Options = {}) {
    if (!key) {
      this.key = process.env.KRYPTON86_API_KEY;

      if (!this.key) {
        throw new NoApiKeyProvidedException();
      }
    }

    if (this.options.https === undefined) {
      this.options.https = true;
    }

    const protocol: string = this.options.https ? 'https' : 'http';
    const apiHostname: string = this.options.apiHostname || DEFAULT_HOSTNAME;
    const port: number | undefined = this.options.port;
    this.baseURL = `${protocol}://${apiHostname}`;

    if (port) {
      this.baseURL = this.baseURL + `:${port}`;
    }

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.key}`,
        'User-Agent': `krypton-node/${version}`,
      },
    });
  }

  async incrUnit(
    customerRef: string,
    unitRef: string,
    properties: Properties,
    amount: number = 1,
  ) {
    return this.post('/units', {
      customerRef,
      unitRef,
      properties,
      amount,
    });
  }

  async post(path: string, entity: any): Promise<AxiosResponse> {
    try {
      return await this.client.post(path, entity);
    } catch (error) {
      const { response } = error as AxiosError;

      if (response) {
        const { status, data, headers } = response;
        const requestID = headers['X-Request-ID'];

        switch (status) {
          case 401: {
            throw new UnauthorizedException(requestID);
          }
          case 404: {
            throw new NotFoundException(path, requestID);
          }
          default: {
            throw new GenericServerException(status, data.message, requestID);
          }
        }
      }

      throw error;
    }
  }
}
