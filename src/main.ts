import App from "./App";

const app = new App({
  root: document.querySelector("#app") as HTMLElement,
});

app.mount();
