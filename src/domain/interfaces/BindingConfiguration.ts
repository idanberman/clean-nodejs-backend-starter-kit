import { Constructor } from '../kernel/building-blocks/types';

export type InjectionToken = string | symbol | Constructor;

type DependencyResolver = {
  resolve(token: InjectionToken): any;
};
type BoundedFactoryOf<T> = () => (resolver: DependencyResolver) => T;

type BaseInjectionBindingConfiguration<T> = {
  bindingToken: InjectionToken;
  scope: 'singleton' | 'childContainer' | 'instance';
};

type FactoryInjectionBindingConfiguration<
  T
> = BaseInjectionBindingConfiguration<T> & {
  bindType: 'factory';
  scope: 'singleton' | 'instance';
  factoryOf: BoundedFactoryOf<T>;
};

type ClassInstanceInjectionBindingConfiguration<
  T
> = BaseInjectionBindingConfiguration<T> & {
  scope: 'singleton' | 'instance';
  toBeBound: Constructor<T>;
  classInstanceOf: Constructor<T>;
};

type AliasTokenInjectionBindingConfiguration<
  T
> = BaseInjectionBindingConfiguration<T> & {
  scope: 'singleton' | 'instance';
  aliasToken: InjectionToken;
};

type ConstantValueInjectionBindingConfiguration<
  T
> = BaseInjectionBindingConfiguration<T> & {
  scope: 'singleton' | 'instance';
  constantValue: T;
};
export type BindingConfiguration<T> =
  | FactoryInjectionBindingConfiguration<T>
  | ClassInstanceInjectionBindingConfiguration<T>
  | AliasTokenInjectionBindingConfiguration<T>
  | ConstantValueInjectionBindingConfiguration<T>;
