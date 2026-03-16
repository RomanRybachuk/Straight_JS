import type { VNode } from "./v";

export type ComponentOptions<P = Record<string, unknown>> = {
  root?: HTMLElement;
  props: () => P;
};

export abstract class Component<P = Record<string, unknown>> {
  name: string | undefined;
  static __component = true;
  private isMounted = false;
  root?: HTMLElement;
  props: () => P;
  components: Record<string, Component<unknown>> = {};
  el?: HTMLElement;
  constructor(options: ComponentOptions<P>) {
    this.root = options.root;
    this.props = options.props ?? (() => {});
  }

  abstract template(): VNode;

  onMounted?(): void;
  onUnmounted?(): void;
  onUnmount?(): void;

  setRoot(root: HTMLElement) {
    this.root = root;
  }

  setComponent(name: string, component: Component<P>) {
    this.components[name] = component;
  }

  private buildElement(vNode: VNode) {
    console.log("vNode", vNode);

    const element = document.createElement(vNode.type) as HTMLElement;

    for (const key in vNode.props) {
      if (key.startsWith("on")) {
        element.addEventListener(key.slice(2).toLowerCase(), vNode.props[key]);
      } else {
        element.setAttribute(key, vNode.props[key]);
      }
    }

    for (const child of vNode.children) {
      if (child.type) {
        if (child.type.__component) {
          console.log("child.props", child.props);
          const component = new child.type({ props: child.props });
          this.setComponent(component.name ?? child.type.name, component);
          component.setRoot(element);
          component.mount();
        } else if (child.__v) {
          element.appendChild(this.buildElement(child));
        } else {
          element.appendChild(this.buildElement(child));
        }
      } else {
        element.appendChild(document.createTextNode(child));
      }
    }

    return element;
  }

  render(vNode: any) {
    return vNode;

    const renderNode = (node: any): any => {
      if (node.type?.__component) {
        const component = new node.type({ props: node.props });
        return component.render(component.template());
      }

      if (node.__v) {
        const result: any = {
          type: node.type,
          props: node.props,
          children: [],
        };

        for (const child of node.children) {
          result.children.push(renderNode(child));
        }

        return result;
      }

      return node;
    };

    return renderNode(vNode);
  }

  mount() {
    this.unmount();

    console.log("this.render(this.template())", this.render(this.template()));

    this.el = this.buildElement(this.render(this.template())) as HTMLElement;

    this.root!.appendChild(this.el);

    this.isMounted = true;

    this.onMounted?.();
  }

  update() {
    this.mount();
  }

  unmount() {
    if (this.isMounted) {
      this.onUnmount?.();

      this.root!.removeChild(this.el as Node);

      this.onUnmounted?.();

      this.isMounted = false;
    }
  }
}
