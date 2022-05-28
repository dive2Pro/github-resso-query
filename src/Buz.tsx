/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ctxResso } from './BuzModule';

export default function App() {
  const [state, setState] = useState();

  useEffect(() => {
    setTimeout(() => {
      setState({});
    }, 1000);
  }, []);
  return <Example />;
}

function Example() {
  const { isLoading, error, data, isFetching } = ctxResso.query;
  const memoedChildren = useMemo(() => {
    return (
      <Fragment>
        <ReactQueryDevtools initialIsOpen />
        <DD />
      </Fragment>
    );
  }, []);

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
      <strong>👀 {data?.subscribers_count}</strong>{' '}
      <strong>✨ {data?.stargazers_count}</strong>{' '}
      <strong>🍴 {data?.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <button onClick={ctxResso.module.doB}>Click</button>
      {memoedChildren}
    </div>
  );
}

function _DD() {
  const { a } = ctxResso;

  console.log('render DD', a);
  const renderAA = useMemo(() => <AA />, []);
  // return <AA />

  return (
    <>
      {renderAA}a = {a}
    </>
  );
}

const DD = memo(_DD);

function AA() {
  console.log('render AA ');

  return <button onClick={() => ctxResso.module.doA()}>AA</button>;
}
