import { createCookieSessionStorage } from "@remix-run/node";

const secrets = process.env.SESSION_SECRET as string;

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "session",
    secrets: [secrets],
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    path: "/",
  },
});

export { getSession, commitSession, destroySession };
