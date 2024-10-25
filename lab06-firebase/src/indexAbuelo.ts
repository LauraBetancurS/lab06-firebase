import { addSongs, getSongs } from './utils/Firebase';
import Song, { Attribute } from './components/song/song';
import { songTypes } from './types/song';
import styles from './indexAbuelo.css';



const songInfo = {
    image: '',
    utitle: '',
    autor: '',
    album: '',
    dateadded: 0,
    duration: 0,
};

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    // Funciones para manejar cambios en los inputs
    changeImage(e: any) {
        songInfo.image = e.target.value;
    }

    changeUtitle(e: any) {
        songInfo.utitle = e.target.value;
    }

    changeAutor(e: any) {
        songInfo.autor = e.target.value;
    }

    changeAlbum(e: any) {
        songInfo.album = e.target.value;
    }

    changeDateadded(e: any) {
        songInfo.dateadded = e.target.value;
    }

    changeDuration(e: any) {
        songInfo.duration = e.target.value;
    }

    // Función para manejar el envío del formulario
    submitForm() {
        console.log('Song submitted:', songInfo);
        addSongs(songInfo); 
        this.render();
    }

    // Render principal
    async render() {
        if (this.shadowRoot) {
        
            // Limpiar contenido previo
            this.shadowRoot.innerHTML = '';
            const container = this.ownerDocument.createElement('form');
            // Crear el título del formulario
            const title = this.ownerDocument.createElement('h1');
            title.innerText = 'add your song ! ʕ•́ᴥ•̀ʔっ♡';
            this.shadowRoot.appendChild(title);

            // Inputs para agregar los datos de la canción
            const pImage = this.ownerDocument.createElement('input');
            pImage.placeholder = 'Image of the song';
            pImage.addEventListener('change', this.changeImage.bind(this));
            this.shadowRoot.appendChild(pImage);

            const pUtitle = this.ownerDocument.createElement('input');
            pUtitle.placeholder = 'Name of the song';
            pUtitle.addEventListener('change', this.changeUtitle.bind(this));
            this.shadowRoot.appendChild(pUtitle);

            const pAutor = this.ownerDocument.createElement('input');
            pAutor.placeholder = 'Name of the autor';
            pAutor.addEventListener('change', this.changeAutor.bind(this));
            this.shadowRoot.appendChild(pAutor);

            const pAlbum = this.ownerDocument.createElement('input');
            pAlbum.placeholder = 'Name of the album';
            pAlbum.addEventListener('change', this.changeAlbum.bind(this));
            this.shadowRoot.appendChild(pAlbum);

            const pDateadded = this.ownerDocument.createElement('input');
            pDateadded.placeholder = 'Date';
            pDateadded.addEventListener('change', this.changeDateadded.bind(this));
            this.shadowRoot.appendChild(pDateadded);

            const pDuration = this.ownerDocument.createElement('input');
            pDuration.placeholder = 'Duration of the song';
            pDuration.addEventListener('change', this.changeDuration.bind(this));
            this.shadowRoot.appendChild(pDuration);

            // Botón para enviar el formulario
            const save = this.ownerDocument.createElement('button');
            save.innerText = 'Send Song';
            save.addEventListener('click', this.submitForm.bind(this));
            this.shadowRoot.appendChild(save);

            // Obtener las canciones de Firebase
            const songs = await getSongs();



            // Mostrar cada canción en pantalla
            songs?.forEach((song) => {
                const container = this.ownerDocument.createElement('section');

                // Crear un elemento de imagen
                const img = this.ownerDocument.createElement('img');
                img.src = song.image;  // Usamos 'src' para la imagen
                container.appendChild(img);

                // Crear un título para la canción
                const title = this.ownerDocument.createElement('h1');
                title.innerText = song.utitle; 
                container.appendChild(title);

                const autor = this.ownerDocument.createElement('p');
                autor.innerText = song.autor;  
                container.appendChild(autor);

                const album = this.ownerDocument.createElement('p');
                album.innerText = song.album;
                container.appendChild(album);

                const date_added = this.ownerDocument.createElement('p');
                date_added.innerText = song.dateadded.toString();  
                container.appendChild(date_added);

                const duration = this.ownerDocument.createElement('p');
                duration.innerText = song.duration.toString();  
                container.appendChild(duration);

                // Agregar el contenedor de la canción al shadowRoot
                this.shadowRoot?.appendChild(container);
            });
        }
        const cssCard = this.ownerDocument.createElement('style');
        cssCard.innerHTML = styles;
        this.shadowRoot?.appendChild(cssCard);
    }
}

// Definir el custom element
customElements.define('app-container', AppContainer);
export default AppContainer;