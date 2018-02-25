export const environment = {
  production: true,
  origin: 'https://apiagentools.azurewebsites.net/api/',
  filescontainer: 'https://teritechsrl.blob.core.windows.net/agentools',
  redirectUrl: 'https://agentools.azurewebsites.net',
  b2cClientId: '97bb76c2-4287-4377-b473-5bb5aa017a4c',
  b2cauthority: 'https://login.microsoftonline.com/tfp/teritechsrl.onmicrosoft.com/B2C_1_MainPolicy_PROD',
  b2cScopes: ['https://teritechsrl.onmicrosoft.com/user.read'],
  b2cextraQueryParameter: 'p=B2C_1_MainPolicy_PROD&scope=openid&nux=1'
};
