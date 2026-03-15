import type { ComponentOptions } from "./straightjs/Component";
import { Component } from "./straightjs/Component";
import { v } from "./straightjs/v";
import Counter from "./components/Counter";
import List from "./components/List";

export default class App extends Component {
  name = "App";
  arr = ["Item 1"];
  count = 0;

  constructor(options: ComponentOptions) {
    super(options);

    this.components.Counter = new Counter({
      props: () => {
        return {
          count: this.arr.length,
        };
      },
    });

    this.components.List = new List({
      props: () => {
        return {
          arr: this.arr,
        };
      },
    });
  }

  render() {
    return v("div", {}, [
      v("h1", {}, ["Hello, World"]),
      v(
        "button",
        {
          onClick: () => {
            this.count++;
            this.arr.push("Item " + Date.now());

            this.components.Counter.update();
            this.components.List.update();
          },
        },
        ["Click me"],
      ),
      v("div", {}, [this.components.Counter]),
      v("div", {}, [this.components.List]),
    ]);
  }
}
