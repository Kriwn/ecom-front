import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "session",
    secrets: ["your-secret-key"],
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    path: "/",
  },
});

export { getSession, commitSession, destroySession };
