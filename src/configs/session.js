import MongoStore from "connect-mongo";
import env from "./env.js";

const sessionConfig = {
  name: "app.sid",
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: env.MONGODB_URI,
    collectionName: "sessions",
    ttl: 60 * 30, // 30 mins
  }),
  cookie: {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 30, // 30 mins
  },
};

export default sessionConfig;
