import Ref from '../editorRef.js';
import createMenuManager from './createMenuManager.js';

// TODO: decide if any format is needed. Idk if this needs to be a class.

export default class UIManager {
    constructor(client){
        this.client = client;
    }
    start(){
        this.game = this.client.game;
        this.map = this.client.game.map;

        this.createMenuManager = new createMenuManager(this.client);
        this.createMenuManager.start();

        this.defineEventListeners();
    }
    defineEventListeners(){
        Ref.playButton.onclick = () => {
            this.client.playerActive = !this.client.playerActive;
            Ref.playButton.isPaused = !Ref.playButton.isPaused ?? true;
            const button = Ref.playButton.querySelector('.menu-button');
            const buttonText = Ref.playButton.querySelector('.menu-button-text');
            if(Ref.playButton.isPaused === true){
                this.client.me().respawn();// TODO: reset camera also when we get zooming working
                button.innerText = '';
                buttonText.innerText = 'Pause';
                for(let i = 0; i < 2; i++){
                    const span = document.createElement('span');
                    span.style.margin = '2px';
                    span.style.fontSize = '1.4rem';
                    span.innerText = 'l';
                    button.appendChild(span);
                }
            } else {
                buttonText.innerText = 'Play';
                while (button.firstChild) {
                    button.removeChild(button.firstChild);
                }
                button.innerText = '▶';
            }
        }

        Ref.deleteButton.onclick = (event) => {
            // this.selectionManager.deleteSelected();
            this.client.selectionManager.previewObstacle = null;
            event.stopPropagation();
            return event.preventDefault();
        }
    }
    // defineEventListeners(){
    //     // TODO: proper obstacle init. The idea is that we have shared init? <- if not we can define a format using some functions like vv
    //     /*
    //         map for effects for example: (effect, simulate, and shape will all be concatenated/ separated in 3 diff headings)
    //         grav: someFunctionThatOptimizesOrHomoginizesTheDataIntoAStandardFormat({
    //             force: {x: "number", y: "number", optional: [forceMult: {...}]},
    //             direction: "number",
    //             otherDirectionOption: {type: "number", minValue: 5, maxValue: 200, isRequired: true},
    //             directionKeyFrames: {isArray: true, data: ["number", "number"], minLength: 1, maxLength: Infinity, isRequired: false}
    //         })
    //     */
    //    // this should be the same as map init or very similar so making the directory shared will be challenging but rewarding if possible
    //    // PRO IDEA FOR SHARED DIRECTORY (adi pro ideas) if(module !== undefined){module.exports = data} else {window.data = data} <- for ss we just require and for cs we just use window!
        
    // }
}

// function createFolder(name = 'folder name', props = [], show = 'true') {
//     const folder = document.createElement('div');
//     folder.classList.add('folder');
//     folder.id = generateId();
//     const folderButton = document.createElement('button');
//     folderButton.classList.add('folder-button');
//     folderButton.dataset.show = show;
//     folderButton.dataset.name = name;
//     folderButton.addEventListener('mousedown', (e) =>
//         folderToggle(e, folderButton)
//     );
//     folder.appendChild(folderButton);
//     const folderContent = document.createElement('div');
//     folderContent.classList.add('folder-content');
//     props.forEach((prop) => {
//         folderContent.appendChild(prop);
//     });
//     folder.appendChild(folderContent);

//     if (show === 'false') {
//         folderButton.innerHTML = '<span class="or">▸</span>&nbsp;' + name;
//         folderContent.classList.add('hidden');
//     } else if (show === 'true') {
//         folderButton.innerHTML = '<span class="ro">▸</span>&nbsp;' + name;
//     }
//     Ref.gui.appendChild(folder);
//     return folder;
// }

// function createProperty(
//     name = 'property name',
//     type = 'text',
//     value = 'ZeroTix',
//     input = createEl('input'),
//     readonly = false,
//     obProp = null
// ) {
//     const property = createEl('div');
//     property.classList.add('property');
//     property.classList.add('text');
//     const propName = createEl('span');
//     propName.classList.add('property-name');
//     propName.innerText = name;
//     property.appendChild(propName);
//     input.type = type;
//     input.maxLength = 500;
//     input.spellcheck = 'false';
//     input.value = value;
//     if (readonly) {
//         input.readOnly = true;
//     }
//     if (type === 'color') {
//         input.classList.add('property-color-input');
//         const label = createEl('label');
//         const text = document.createTextNode(input.value);
//         text.nodeValue = input.value;
//         label.appendChild(text);
//         input.id = generateId();
//         label.htmlFor = input.id;
//         label.appendChild(input);
//         label.classList.add('color-label');
//         label.style.background = input.value;
//         property.appendChild(label);
//         label.addEventListener('input', () => {
//             text.nodeValue = input.value;
//             label.style.background = input.value;
//         });
//     } else if (type === 'checkbox') {
//         const label = createEl('label');
//         label.classList.add('switch');
//         input.checked = value; // can u help fix css xd ooh theres a checkboxc ok
//         label.classList.add('property-checkbox-input');
//         label.appendChild(input);
//         const span = createEl('span');
//         span.classList.add('slider');
//         label.appendChild(span);
//         property.appendChild(label);
//     } else if (type === 'directions') {
//         input.classList.add('property-text-input');
//         input.style.width = '0px';
//         input.style.height = '0px';
//         input.classList.add('dir-prop');
//         input.readOnly = true;
//         property.appendChild(input);
//         const buttonContainer = createEl('div');
//         buttonContainer.classList.add('directional-button-container');
//         const dirs = Array(4)
//             .fill(null)
//             .map((unused_property, i) => {
//                 const btn = createEl('button');
//                 btn.classList.add('dir-btn');
//                 const text = createEl('span');
//                 const t = createEl('span');
//                 t.innerHTML = '>';
//                 text.appendChild(t);
//                 text.classList.add(['left', 'down', 'up', 'right'][i]);
//                 btn.appendChild(text);
//                 btn.dataset.dir = ['left', 'down', 'up', 'right'][i];
//                 return btn;
//             });
//         const index = ['left', 'down', 'up', 'right'].findIndex(
//             (d) => d === value
//         );
//         if (index > -1) {
//             dirs[index].classList.add('dir-selected');
//         }
//         appendChildren(buttonContainer, dirs);
//         property.appendChild(buttonContainer);
//     } else if (type === 'option') {
//         // console.log(value)
//         // const select = document.createElement('select');
//         // input -> select element
//         input.classList.add('property-option-input');
//         // value => array ([0] is the intiial value)
//         let first = false;
//         let arr = value;
//         if (!Array.isArray(arr) && obProp != null) {
//             arr = obProp.value.slice(1);
//         }
//         arr.forEach((data) => {
//             if (!first) {
//                 first = true;
//                 return; // skips first index because thats the default
//             }
//             const option = document.createElement('option');
//             option.value = data;
//             option.classList.add('select-items');
//             option.innerText = data;
//             input.appendChild(option);
//         });
//         property.appendChild(input);
//     } else {
//         input.classList.add('property-text-input');
//         property.appendChild(input);
//     }
//     return property;
// }