import axios from 'axios';
import resso from 'resso';
import React, { createContext, useState } from 'react';
import { useQuery } from 'react-query';

const ctx = createContext();

export const ctxResso = resso({
  module: {},
  a: 0,
  query: {},
});

export function DemoProvider(props) {
  const [state, setState] = useState();
  const query = useQuery('repoData', () =>
    axios
      .get('https://api.github.com/repos/tannerlinsley/react-query')
      .then((res) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(res.data), 2000);
        });
      }),
      {
        enabled: false
      }
  );
  const doA = () => {
    console.log('doA')
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
  return <ctx.Provider value={''}>{props.children}</ctx.Provider>;
}
