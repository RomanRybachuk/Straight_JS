import type { Component } from "./Component";

export type VNode = {
  type: keyof HTMLElementTagNameMap | Component<unknown> | any;
  props: Record<string, any>;
  children: any[];
  __v: true;
};

export function v(
  type: VNode["type"],
  props: VNode["props"],
  children: VNode["children"],
): VNode {
  return {
    type: type,
    props: props,
    children: children,
    __v: true,
  };
}
