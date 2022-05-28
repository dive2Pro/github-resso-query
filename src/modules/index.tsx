import React, { createContext, useContext, useMemo, useState } from 'react';
import { ObjectManipulator } from '../ObjectManipulate';
import { useModuleBiz } from './biz';
import { useModuleBuz } from './buz';

let newModuleManipulator = new ObjectManipulator({});

const moduleManipulator = newModuleManipulator
  .set('A', useModuleBiz)
  .set('B', useModuleBuz);
const modules = moduleManipulator.getObject();

type Modules = typeof modules;
type Ctx = Modules extends { [key in keyof Modules]: infer Fn }
  ? Fn extends () => any
    ? { [key in keyof Modules]: ReturnType<Fn> }
    : never
  : never;

const ctx = createContext<Ctx>({} as Ctx);

const ObjectTypedKeys = <T extends {}>(o: T) => {
  return Object.keys(o) as (keyof T)[];
};

export function DemoProvider(props) {
  const value = {} as Ctx;
  useMemo(() => {}, []);

  ObjectTypedKeys(modules).forEach((key) => {
    value[key] = modules[key]();
  });
  console.log('Provider ----- ');
  return <ctx.Provider value={''}>{props.children}</ctx.Provider>;
}

export function useDemoContext<T extends keyof Ctx>(k: T) {
  return useContext(ctx)[k];
}
