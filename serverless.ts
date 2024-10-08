import type { AWS } from '@serverless/typescript'

import fetch from '@functions/fetch'
import find from '@functions/find'
import put from '@functions/put'

const serverlessConfiguration: AWS = {
  service: 'api-lambda-invitations',
  frameworkVersion: '4',
  plugins: ['serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    profile: '${self:custom.profile.${opt:stage}}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      MONGODB: '${self:custom.env.${opt:stage}.MONGODB_URL}',
      VERSION: '${self:custom.version}',
      STAGE: '${opt:stage}',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { fetch, find, put },
  package: { individually: true },
  custom: {
    stage: '${opt:stage}',
    env: '${file(env.json)}',
    version: '1.0.0',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    profile: {
      prod: 'YaListoApp',
      dev: 'YaListoApp',
    },
  },
};

module.exports = serverlessConfiguration;
