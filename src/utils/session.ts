import { useState } from "react";
import { Teacher } from '../api';
import { trpc } from "./trpc";

export const useUser = () => {
  const [user, setUser] = useState<Teacher | null>();

  const query = trpc.auth.getUser.useQuery(undefined, {
    onSuccess(data) {
      setUser(data);
    }
  });

  return user;
}
