/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
// import { ctxResso, useGithub } from './BuzModule';
import { useDemoContext } from './modules';
import { BizResso } from './modules/biz';
import { BuzResso } from './modules/buz';

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
  // useGithub(true);
  // const aModule = useDemoContext('A');
  const { isLoading, error, data, isFetching } = BizResso.query;
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
      <button onClick={BizResso.module.doB}>Click</button>
      {memoedChildren}
    </div>
  );
}

function _DD() {
  const { a } = BizResso;

  console.log('render DD', a);
  const renderAA = useMemo(() => <AA />, []);
  const renderBuz = useMemo(() => <Buz />, []);
  // return <AA />

  return (
    <>
      {renderAA}a = {a}
      {renderBuz}
    </>
  );
}

function Buz() {
  const { a } = BuzResso;
  console.log(' buz render~~~~~');
  return null;
}

const DD = memo(_DD);

function AA() {
  console.log('render AA ');
  const aModule = BizResso;
  const { query } = aModule;
  return <button onClick={() => aModule.module.doA()}>AA</button>;
}
