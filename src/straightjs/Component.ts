import type { VNode } from "./v";

export type ComponentOptions<P = Record<string, unknown>> = {
  root?: HTMLElement;
  props?: () => P;
  components?: Record<string, Component<unknown>>;
};

export abstract class Component<P = Record<string, unknown>> {
  name: string | undefined;
  __component = true;
  private isMounted = false;
  root?: HTMLElement;
  components: Record<string, Component<unknown>> = {};
  props: () => P;

  constructor(options: ComponentOptions<P>) {
    this.root = options.root;
    this.props = options.props || ((() => ({})) as () => P);
    this.components = options.components || {};
  }

  abstract render(): VNode;

  onMounted?(): void;
  onUnmounted?(): void;
  onUnmount?(): void;

  setRoot(root: HTMLElement) {
    this.root = root;
  }

  private buildElement(vNode: VNode) {
    const element = document.createElement(vNode.type) as HTMLElement;

    for (const key in vNode.props) {
      if (key.startsWith("on")) {
        element.addEventListener(key.slice(2).toLowerCase(), vNode.props[key]);
      } else {
        element.setAttribute(key, vNode.props[key]);
      }
    }

    for (const child of vNode.children) {
      if (child.__v) {
        element.appendChild(this.buildElement(child));
      } else if (child.__component) {
        child.setRoot(element);
        child.mount();
      } else {
        element.appendChild(document.createTextNode(child));
      }
    }

    return element;
  }

  mount() {
    this.unmount();

    this.root!.appendChild(this.buildElement(this.render()));

    this.isMounted = true;

    this.onMounted?.();
  }

  update() {
    this.mount();
  }

  unmount() {
    if (this.isMounted) {
      this.onUnmount?.();

      this.root!.innerHTML = "";

      this.onUnmounted?.();

      this.isMounted = false;
    }
  }
}
