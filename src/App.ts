import { Component } from "./straightjs/Component";
import { v } from "./straightjs/v";
import Counter from "./components/Counter";

export default class App extends Component<{}> {
  name = "App";

  count = 0;

  template() {
    return v("div", {}, [
      v("h1", {}, ["Hello, World"]),
      v(
        "button",
        {
          onClick: () => {
            this.count++;

            this.components.Counter.update();
          },
        },
        ["Click me"],
      ),
      v(
        Counter,
        () => ({
          count: this.count,
        }),
        [],
      ),
    ]);
  }
}
