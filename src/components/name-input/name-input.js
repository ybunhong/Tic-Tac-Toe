import "./name-input.css";
import { BaseComponent } from "../base-component";

export class NameInput extends BaseComponent {
  static get observedAttributes() {
    return ["label", "value"];
  }

  constructor() {
    super();
    this.label = "";
    this.value = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "label":
          this.label = newValue;
          break;
        case "value":
          this.value = newValue;
          break;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = `
      <input class="w-full bg-sky-300 rounded-sm pl-4 pr-4 h-12" type="text" value="${this.value}" placeholder="Input Name" enterkeyhint="done">
    `;

    this.render();

    const input = this.querySelector("input");

    input?.addEventListener("input", (event) => {
      this.value = event.target.value;
      this.dispatchEvent(
        new CustomEvent("name-change", {
          detail: this.value,
          bubbles: true,
          composed: true,
        })
      );
    });

    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        localStorage.setItem("playerName", this.value);
        console.log("Name entered:", this.value);
      }
    });
  }
}

customElements.define("name-input", NameInput);
