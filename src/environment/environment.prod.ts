import { api } from '@env/api';

export const environment = {
    production: true,
    baseUrlAPI: '',
    mocks: false,
    api: {
      baseUrl: '',
      ...api,
    },
    version: '1.0.0',
    protocol: 'https',
    estilosAlerta: 'alert alert-danger',
  };