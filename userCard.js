const template = document.createElement('template');
template.innerHTML = `
    <style>
    .user-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 500px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 10px;
		margin-bottom: 15px;
		border-bottom: darkorchid 5px solid;
	}

	.user-card img {
		width: 100%;
	}

	.user-card button {
		cursor: pointer;
		background: darkorchid;
		color: #fff;
		border: 0;
		border-radius: 5px;
		padding: 10px 10px;
	}
    </style>

    <div class="user-card">
        <img />
        <div>
            <h1></h1>
            <div class="info">
                <p> <slot name="email"/> </p>
                <p> <slot name="phone"/> </p>
            </div>
            <button id="toggle-info">Hide Info</button>
        </div>    
    </div>
`

class userCard extends HTMLElement {
    constructor() {
        super();

        this.showInfo = true;
        //Shadow DOM
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true)) //added the tempalte to shadow dom
        this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
        // The below line will not work because we have to create a template to attach in the shado root
        // this.innerHTML = `<h1>${this.getAttribute('name')}</h1>`
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;
        const info = this.shadowRoot.querySelector('.info')
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info')
        if(this.showInfo) {
            info.style.display = 'block';
            toggleBtn.innerText = 'Hide Info'
        }
        else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Show Info'
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => {
            this.toggleInfo()
        })
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}

window.customElements.define('user-card', userCard);