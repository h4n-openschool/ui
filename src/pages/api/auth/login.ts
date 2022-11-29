import type { NextApiHandler } from "next";
import { AuthApi, Configuration } from "../../../api";
import { env } from "../../../env/server.mjs";

const resolver: NextApiHandler = async (_, res) => {
  const authApi = new AuthApi(new Configuration({
    basePath: env.OPENSCHOOL_API_URL
  }));

  const login = await authApi.authLogin({
    email: 'john.doe@school.edu',
    password: 'password',
  });


  if (login.status !== 200) {
    res.end(JSON.stringify({ ok: false }));
    return;
  }

  res.setHeader('set-cookie', `token=${login.data.token}`);
  res.end(JSON.stringify({ ok: true }));
};

export default resolver;

