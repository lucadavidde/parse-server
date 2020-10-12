import ParseServer from './ParseServer';
import S3Adapter from '@parse/s3-files-adapter';
import FileSystemAdapter from '@parse/fs-files-adapter';
import InMemoryCacheAdapter from './Adapters/Cache/InMemoryCacheAdapter';
import NullCacheAdapter from './Adapters/Cache/NullCacheAdapter';
import RedisCacheAdapter from './Adapters/Cache/RedisCacheAdapter';
import LRUCacheAdapter from './Adapters/Cache/LRUCache.js';
import * as TestUtils from './TestUtils';
import { useExternal } from './deprecated';
import { getLogger } from './logger';
import { PushWorker } from './Push/PushWorker';
import { ParseServerOptions } from './Options';
import { ParseGraphQLServer } from './GraphQL/ParseGraphQLServer';
import firebaseAuthAdapter from 'parse-server-firebase-auth-adapter';

// Factory function
 const _ParseServer = function(options: ParseServerOptions) {
   const server = new ParseServer(options);
     auth: {
         firebase: firebaseAuthAdapter
           }
  return server.app;
};
// Mount the create liveQueryServer
_ParseServer.createLiveQueryServer = ParseServer.createLiveQueryServer;
_ParseServer.start = ParseServer.start;

const GCSAdapter = useExternal('GCSAdapter', '@parse/gcs-files-adapter');

Object.defineProperty(module.exports, 'logger', {
  get: getLogger,
});

export default ParseServer;
export {
  S3Adapter,
  GCSAdapter,
  FileSystemAdapter,
  InMemoryCacheAdapter,
  NullCacheAdapter,
  RedisCacheAdapter,
  LRUCacheAdapter,
  TestUtils,
  PushWorker,
  ParseGraphQLServer,
  _ParseServer as ParseServer,
};
