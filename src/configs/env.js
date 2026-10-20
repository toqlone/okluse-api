import "dotenv/config";

// ─── UTILS ─────────

// Validate PORT
const getPort = () => {
  const rawPort = (process.env.PORT ?? "3000").trim();

  if (rawPort === "") {
    throw new Error("PORT must not be empty");
  }

  const port = Number(rawPort);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  return port;
};

// Validate NODE_ENV
const getNodeEnv = () => {
  const nodeEnv = (process.env.NODE_ENV ?? "development").trim();

  const allowedNodeEnvs = ["development", "test", "production"];

  if (!allowedNodeEnvs.includes(nodeEnv)) {
    throw new Error(`NODE_ENV must be one of ${allowedNodeEnvs.join(", ")}`);
  }

  return nodeEnv;
};

// Validate required environment variable
const getRequiredEnv = (env) => {
  const envName = env.toUpperCase();
  const envVariable = process.env[envName];

  if (envVariable == null || undefined) {
    throw new Error(`${envName} is not configured`);
  }

  const value = envVariable.trim();

  if (value === "") {
    throw new Error(`${envName} must not be empty`);
  }

  return value;
};

const getMongoDbUri = (nodeEnv) => {
  let mongoDbUri;
  const allowedNodeEnvs = ["development", "test", "production"];

  if (!allowedNodeEnvs.includes(nodeEnv)) {
    throw new Error(`NODE_ENV must be one of ${allowedNodeEnvs.join(", ")}`);
  }

  if (nodeEnv === "development") {
    mongoDbUri = process.env.MONGODB_DEVELOPMENT_URI;
  } else if (nodeEnv === "test") {
    mongoDbUri = process.env.MONGODB_TEST_URI;
  } else {
    mongoDbUri = process.env.MONGODB_PRODUCTION_URI;
  }

  return mongoDbUri;
};

// Configure application
const env = {
  PORT: getPort(),
  NODE_ENV: getNodeEnv(),
  MONGODB_URI: getMongoDbUri(getNodeEnv()),
  SESSION_SECRET: getRequiredEnv("SESSION_SECRET"),
};

export default Object.freeze(env);
