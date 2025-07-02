import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config, // keeps everything in app.json
    extra: {
      API_NINJAS_KEY: process.env.API_NINJAS_KEY || '',
    },
  };
};
