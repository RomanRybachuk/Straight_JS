import { Component } from "../straightjs/Component";
import { v } from "../straightjs/v";

export default class Counter extends Component<{
  arr: string[];
}> {
  name = "List";

  render() {
    return v(
      "div",
      {},
      this.props().arr.map((item) => {
        return v("div", {}, [item]);
      }),
    );
  }
}
