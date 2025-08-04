import "./base-button.css";
import { BaseComponent } from "../base-component";
import "../main";

/**
 * BaseButton Web Component
 *
 * Usage in HTML:
 * <base-button
 *   label="Click Me"
 *   variant="primary"
 *   type="button"
 *   action="submit-form"
 *   href="your-path"
 *   disabled
 * ></base-button>
 *
 * Attributes:
 * - label (string): Text displayed on the button.
 * - variant (string): Visual style of the button (e.g. "primary", "secondary", etc.).
 * - type (string): Affects styling; supported values: "button" (default), "status".
 * - action (string): Custom identifier dispatched with "base-button" event on click.
 * - href (string): URL to link to when button is clicked.
 * - disabled (boolean): If set, disables the button and blocks user interaction.
 *
 * Examples:
 * <!-- Default button -->
 * <base-button label="Submit" variant="primary"></base-button>
 *
 * <!-- Disabled secondary button -->
 * <base-button label="Delete" variant="secondary" disabled></base-button>
 *
 * <!-- Status style -->
 * <base-button label="Online" type="status" variant="success"></base-button>
 *
 * <!-- With action event -->
 * <base-button label="Open Panel" action="side-panel"></base-button>
 *
 * <!-- With href -->
 * <base-button label="Open Panel" href="../pages/product-list.html"></base-button>
 *
 * In JavaScript:
 * const btn = document.querySelector('base-button');
 *
 * // Listen for dispatched action
 * btn.addEventListener("base-button", e => {
 *   console.log("Button action triggered:", e.detail.action);
 * });
 *
 * // Dynamically update attributes
 * btn.setAttribute("label", "Updated Label");
 * btn.setAttribute("disabled", "");
 * btn.removeAttribute("disabled");
 *
 * Event:
 * - "base-button": dispatched on click if 'action' is set.
 *   Event.detail contains: { action: actionValue }
 *
 * Accessibility:
 * - Disabled button prevents click interaction and stops event propagation.
 */

class BaseButton extends BaseComponent {
  static get observedAttributes() {
    return ["label", "variant", "disabled", "type", "action", "href"];
  }

  constructor() {
    super();
    this.label = "";
    this.variant = "primary";
    this.disabled = false;
    this.type = "button";
    this.href = "#";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("click", (event) => {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (this.action) {
        this.dispatchEvent(
          new CustomEvent("base-button", {
            bubbles: true,
            detail: { action: this.action },
          })
        );
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "label":
          this.label = newValue;
          break;
        case "variant":
          this.variant = newValue;
          break;
        case "type":
          this.type = newValue;
          break;
        case "action":
          this.action = newValue;
          break;
        case "href":
          this.href = newValue;
          break;
        case "disabled":
          this.disabled = newValue !== null && newValue !== "false";
          break;
        default: {
          console.warn(`Unhandled observed attribute: ${name}`);
          break;
        }
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    let classes = " rounded-sm  text-center w-full whitespace-nowrap ";

    classes += `button-${this.variant} `;

    if (this.type === "button") {
      classes += "py-3 px-4 font-semibold text-base";
    } else if (this.type === "status") {
      classes += "py-1  px-2 font-normal text-xs ";
    }

    this.template = `
      <a href="${this.href}">
        <button class="${classes}">${this.label}</button>
      </a>
  
    `;
    this.render();
  }
}

customElements.define("base-button", BaseButton);
