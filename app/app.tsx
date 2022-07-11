import { Counter } from "./Counter.tsx";
import LumeLogo from "../assets/lume.tsx";

export default function () {
  return (
    <div class="container">
      <LumeLogo />
      <h1>Hello from Lume/Preact</h1>
      <Counter />
    </div>
  );
}
