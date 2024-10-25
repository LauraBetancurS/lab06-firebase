import styles from './song.css';

export enum Attribute {
    'image' = 'image',
    'utitle' = 'utitle',
    'autor' = 'autor',
    'album' = 'album',
    'dateadded' = 'dateadded',
    'duration' = 'duration',
}

class Song extends HTMLElement {
    image?: string;
    utitle?: string;
    autor?: string;
    album?: string;
    dateadded?: number;
    duration?: number;

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case Attribute.dateadded:
                this.dateadded = newValue ? Number(newValue) : undefined;
                break;
            case Attribute.duration:
                this.duration = newValue ? Number(newValue) : undefined;
                break;
            default:
                this[propName] = newValue;
                break;
        }
        this.render();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            // Insertar el estilo antes del HTML
            

            // Crear el contenido HTML
            this.shadowRoot.innerHTML = `
                <section class="track-container">
                    <img src="${this.image}" alt="track-thumbnail">
                    <p><strong>Title:</strong> ${this.utitle}</p>
                    <p><strong>Autor:</strong> ${this.autor}</p>
                    <p><strong>Album:</strong> ${this.album}</p>
                    <p><strong>Date Added:</strong> ${this.dateadded}</p>
                    <p><strong>Duration:</strong> ${this.duration} mins</p>
                </section>
            `;
        }
        const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
        
    }
    
}

customElements.define('song-component', Song);
export default Song;
