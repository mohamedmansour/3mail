require('dotenv-flow').config();
const { writeFile } = require('fs').promises;
const Ceramic = require('@ceramicnetwork/http-client').default;
const { createDefinition, publishSchema } = require('@ceramicstudio/idx-tools');
const { Ed25519Provider } = require('key-did-provider-ed25519');
const ThreeIdResolver = require('@ceramicnetwork/3id-did-resolver').default;
const KeyDidResolver = require('key-did-resolver').default;
const { Resolver } = require('did-resolver');
const { DID } = require('dids');
const fromString = require('uint8arrays/from-string');

const MessageSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Message',
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date-time',
      title: 'date',
      maxLength: 30,
    },
    subject: {
      type: 'string',
      title: 'text',
      maxLength: 500,
    },
    message: {
      type: 'string',
      title: 'text',
      maxLength: 4000,
    },
  },
};

const MessageListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'MessageList',
  type: 'object',
  properties: {
    messages: {
      type: 'array',
      title: 'messages',
      items: {
        type: 'object',
        title: 'MessageItem',
        properties: {
          id: {
            $ref: '#/definitions/CeramicStreamId',
          },
          subject: {
            type: 'string',
            title: 'subject',
            maxLength: 100,
          },
          content: {
            type: 'string',
            title: 'content',
            maxLength: 4000,
          },
        },
      },
    },
  },
  definitions: {
    CeramicStreamId: {
      type: 'string',
      pattern: '^ceramic://.+(\\\\?version=.+)?',
      maxLength: 150,
    },
  },
};

async function run() {
  // The seed must be provided as an environment variable
  const seed = fromString(process.env.SEED, 'base16');

  // Connect to the local Ceramic node
  const ceramic = new Ceramic(process.env.CERAMIC_URL);
  // Provide the DID Resolver and Provider to Ceramic
  const resolver = new Resolver({
    ...KeyDidResolver.getResolver(),
    ...ThreeIdResolver.getResolver(ceramic),
  });
  const provider = new Ed25519Provider(seed);
  const did = new DID({ provider, resolver });
  await ceramic.setDID(did);
  await ceramic.did.authenticate();
  console.log(did);

  // Publish the two schemas
  const [messageSchema, messageListSchema] = await Promise.all([
    publishSchema(ceramic, { content: MessageSchema }),
    publishSchema(ceramic, { content: MessageListSchema }),
  ]);

  // Create the definition using the created schema ID
  const messagesDefinition = await createDefinition(ceramic, {
    name: 'messages',
    description: 'Simple messages',
    schema: messageListSchema.commitId.toUrl(),
  });

  // Write config to JSON file
  const config = {
    definitions: {
      messages: messagesDefinition.id.toString(),
    },
    schemas: {
      Message: messageSchema.commitId.toUrl(),
      MessageList: messageListSchema.commitId.toUrl(),
    },
  };
  await writeFile('./config.json', JSON.stringify(config));

  console.log('Config written to ./config.json file', config);
  process.exit(0);
}

run().catch(console.error);
