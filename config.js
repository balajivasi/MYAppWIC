import ENV from './env';

const getEnvVars = (env = 'dev') => {
  if (env === 'dev') {
    return ENV.dev;
  }
  if (env === 'qa') {
    return ENV.qa;
  }
  if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
