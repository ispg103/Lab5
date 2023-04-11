import styles from './card.css'

export enum Attribute {
    "name" = "name",
    "gender" = "gender",
}

class Card extends HTMLElement {
    name?: string;
    gender?: string;


    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            name: null,
            gender: null,
        };
        return Object.keys(attrs);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {

                default:
                this[propName] = newValue;
                break;
            }

            this.render();
        }

        render() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <style>
                ${styles}
                </style>

                <section>
                <h1>${this.name}</h1>
                <p>${this.gender}</p>
                </section>
                `;
            }
        }
    }

customElements.define("my-card", Card);
export default Card;