import { Component, type ComponentOptions } from "../straightjs/Component";
import { v } from "../straightjs/v";

class InputValueView extends Component<{
  value: string;
}> {
  name = "InputValueView";

  render() {
    return v("span", {}, [this.props().value]);
  }
}

export default class Counter extends Component<{
  arr: string[];
}> {
  name = "List";

  model_value = "11";

  constructor(options: ComponentOptions) {
    super(options);

    this.components.InputValueView = new InputValueView({
      props: () => {
        return {
          value: this.model_value,
        };
      },
    });
  }

  render() {
    return v(
      "div",
      {},
      this.props().arr.map((item) => {
        return v("div", {}, [
          v("span", {}, [item]),
          v(
            "input",
            {
              value: this.model_value,
              onInput: (event: Event) => {
                console.log("onChange", event.target);
                this.model_value = (event.target as HTMLInputElement).value;
                this.components.InputValueView.update();
              },
            },
            [],
          ),
          v(
            "span",
            {
              value: this.model_value,
            },
            [this.components.InputValueView],
          ),
        ]);
      }),
    );
  }
}
