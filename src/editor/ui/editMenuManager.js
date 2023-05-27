// right side menu that can be used to edit obstacles and their parameters after they have been placed
export default class editMenuManager {
    constructor(client){
        this.client = client;
    }
    toggleMenu(event) {
        event.preventDefault();
        if (Ref.toggleGui.dataset.usage === 'off') {
            Ref.toggleGui.innerText = 'Close Menu';
            Ref.toggleGui.dataset.usage = 'on';
            Ref.gui.classList.remove('hidden');
            Ref.guiContainer.classList.add('gui-on');
            // settingsDiv.style.right = '300px';
        } else if (Ref.toggleGui.dataset.usage === 'on') {
            Ref.toggleGui.innerText = 'Open Menu';
            Ref.toggleGui.dataset.usage = 'off';
            Ref.gui.classList.add('hidden');
            Ref.guiContainer.classList.remove('gui-on');
            // settingsDiv.style.right = '0px';
        }
    }
    // TODO: ideally we'll want a createFolder as well so that we can have structured obstacles
    // this should be able to be read from a structure that's defined for obstacle init in !initObstacle.js
    createProperty(
        name = 'property name',
        type = 'text',
        value = 'ZeroTix',
        input = document.createElement('input'),
        readonly = false,
        obProp = null
    ) {
        const property = document.createElement('div');
        property.classList.add('property');
        property.classList.add('text');
        const propName = document.createElement('span');
        propName.classList.add('property-name');
        propName.innerText = name;
        property.appendChild(propName);
        input.type = type;
        input.maxLength = 500;
        input.spellcheck = 'false';
        input.value = value;
        if (readonly) {
            input.readOnly = true;
        }
        if (type === 'color') {
            input.classList.add('property-color-input');
            const label = document.createElement('label');
            const text = document.createTextNode(input.value);
            text.nodeValue = input.value;
            label.appendChild(text);
            input.id = generateId();
            label.htmlFor = input.id;
            label.appendChild(input);
            label.classList.add('color-label');
            label.style.background = input.value;
            property.appendChild(label);
            label.addEventListener('input', () => {
                text.nodeValue = input.value;
                label.style.background = input.value;
            });
        } else if (type === 'checkbox') {
            const label = document.createElement('label');
            label.classList.add('switch');
            input.checked = value; // can u help fix css xd ooh theres a checkboxc ok
            label.classList.add('property-checkbox-input');
            label.appendChild(input);
            const span = document.createElement('span');
            span.classList.add('slider');
            label.appendChild(span);
            property.appendChild(label);
        } else if (type === 'directions') {
            input.classList.add('property-text-input');
            input.style.width = '0px';
            input.style.height = '0px';
            input.classList.add('dir-prop');
            input.readOnly = true;
            property.appendChild(input);
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('directional-button-container');
            const dirs = Array(4)
                .fill(null)
                .map((unusedRefproperty, i) => {
                    const btn = document.createElement('button');
                    btn.classList.add('dir-btn');
                    const text = document.createElement('span');
                    const t = document.createElement('span');
                    t.innerHTML = '>';
                    text.appendChild(t);
                    text.classList.add(['left', 'down', 'up', 'right'][i]);
                    btn.appendChild(text);
                    btn.dataset.dir = ['left', 'down', 'up', 'right'][i];
                    return btn;
                });
            const index = ['left', 'down', 'up', 'right'].findIndex(
                (d) => d === value
            );
            if (index > -1) {
                dirs[index].classList.add('dir-selected');
            }
            appendChildren(buttonContainer, dirs);
            property.appendChild(buttonContainer);
        } else if (type === 'option') {
            // console.log(value)
            // const select = document.createElement('select');
            // input -> select element
            input.classList.add('property-option-input');
            // value => array ([0] is the intiial value)
            let first = false;
            let arr = value;
            if (!Array.isArray(arr) && obProp != null) {
                arr = obProp.value.slice(1);
            }
            arr.forEach((data) => {
                if (!first) {
                    first = true;
                    return; // skips first index because thats the default
                }
                const option = document.createElement('option');
                option.value = data;
                option.classList.add('select-items');
                option.innerText = data;
                input.appendChild(option);
            });
            property.appendChild(input);
        } else {
            input.classList.add('property-text-input');
            property.appendChild(input);
        }
        return property;
    }
} 