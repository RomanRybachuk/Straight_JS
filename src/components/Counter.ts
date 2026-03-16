import { Component } from "../straightjs/Component";
import { v } from "../straightjs/v";

export default class Counter extends Component<{
  count: number;
}> {
  template() {
    return v(
      "div",
      {
        id: "counter",
      },
      [v("h2", {}, ["Result"]), v("div", {}, [this.props().count])],
    );
  }
}
