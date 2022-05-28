import axios from 'axios';
import resso from 'resso';
import { useQuery } from 'react-query';
import { useCallback, useMemo, useState } from 'react';

function useGithub(options) {
  return useQuery(
    'repoData',
    () =>
      axios
        .get('https://api.github.com/repos/DylanVann/react-native-fast-image')
        .then((res) => {
          return new Promise((resolve) => {
            setTimeout(() => resolve(res.data), 2000);
          });
        }),
    {
      ...options,
    }
  );
}

type Actions = {
  doA(): void;
  doB(): void;
};

export let BuzResso: ReturnType<typeof useModuleBuz>;

export function useModuleBuz() {
  const query = useGithub({
    enabled: false,
    // notifyOnChangeProps: [],
  });
  const doA = useCallback(() => {
    console.log('doA');
    setTimeout(() => {
      console.log(bizResso.a);
      bizResso.a = bizResso.a + 1;
      console.log(bizResso);
    }, 1000);
  }, []);
  const value = {
    doA,
    doB() {
      console.log('doB');
      query.refetch();
    },
  };
  console.log('render module Buzzzzzz');
  // bizResso.query = query;
  // bizResso.module = value;
  const [bizResso] = useState(() => {
    let r = resso({
      module: value,
      a: 0,
      query: query,
    });
    BuzResso = r;
    return r;
  });
  bizResso.query = query;
  return bizResso;
}
