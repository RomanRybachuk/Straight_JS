import { Component } from "../straightjs/Component";
import { v } from "../straightjs/v";

export default class Counter extends Component<{
  count: number;
}> {
  name = "Counter";

  render() {
    return v("div", {}, [this.props().count]);
  }
}
