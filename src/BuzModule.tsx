import axios from 'axios';
import resso from 'resso';
import React, { createContext, useState } from 'react';
import { useQuery } from 'react-query';

export function useGithub(enabled = true) {
  return useQuery(
    'repoData',
    () =>
      axios
        .get('https://api.github.com/repos/tannerlinsley/react-query')
        .then((res) => {
          return new Promise((resolve) => {
            setTimeout(() => resolve(res.data), 2000);
          });
        }),
    {
      enabled,
    }
  );
}
type Ctx = {
  doA(): void;
  doB(): void;
};

const ctx = createContext<Ctx>({} as Ctx);

export const ctxResso = resso({
  module: {} as Ctx,
  a: 0,
  query: {},
});

export function DemoProvider(props) {
  const [state, setState] = useState();
  const query = useGithub(false);
  const doA = () => {
    console.log('doA');
    setTimeout(() => {
      console.log(ctxResso.a);
      ctxResso.a = ctxResso.a + 1;
      console.log(ctxResso);
    }, 1000);
  };
  const value = {
    doA,
    doB() {
      query.refetch();
    },
  };
  ctxResso.query = query;
  ctxResso.module = value;
  return (
    <ctx.Provider value={'' as unknown as Ctx}>{props.children}</ctx.Provider>
  );
}
