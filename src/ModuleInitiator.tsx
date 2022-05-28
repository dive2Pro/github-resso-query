import { ObjectManipulator } from './ObjectManipulate';

const moduleManipulator = new ObjectManipulator({});

export function inject<K extends string, V, P>(manipulator: ObjectManipulator<P>, k: K, v: V) {
  return manipulator.set(k, v);
}

export function getModules() {
  return moduleManipulator.getObject();
}

inject(moduleManipulator, "a", () => {})


moduleManipulator.get('a')