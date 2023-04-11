import "./components/export";
import {get_api} from "./components/data"
import Card, { Attribute } from "./components/card/card"

class AppContainer extends HTMLElement {
    List: Card[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const data = await get_api();
        data.forEach((results: any) => {
            console.log(results);
        });

        data.forEach((card: any) => {
            const starCard = this.ownerDocument.createElement("my-card") as Card;
            starCard.setAttribute(Attribute.name, card.name);
            starCard.setAttribute(Attribute.gender, card.gender);
                this.List.push(starCard);
        });
        this.render(this.List);
    }

    render(List:any) {
        const starCards = this.ownerDocument.createElement("section")
        starCards.className = "starSection"
        this.List.forEach((starCard) => {
            starCards.appendChild(starCard)
        });
        this.shadowRoot?.appendChild(starCards);
    }
}

customElements.define("app-container", AppContainer);