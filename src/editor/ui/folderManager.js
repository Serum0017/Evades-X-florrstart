import addObstacle from '../addObstacle.js';
import generateId from "../generateId.js";
import Ref from '../editorRef.js';

function menuToggle(event) {
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

function folderToggle(event, btn) {
    event.preventDefault();
    const divs = btn.parentElement.children; // we need to find folder-content!
    let folderContent = null;
    for (const div of divs) {
        if (div.classList.contains('folder-content')) {
            folderContent = div;
            break;
        }
    }
    folderContent.classList.toggle('hidden');
    if (btn.dataset.show === 'true') {
        btn.dataset.show = 'false';
        btn.innerHTML = '<span class="or">▸</span>&nbsp;' + btn.dataset.name;
    } else if (btn.dataset.show === 'false') {
        btn.innerHTML = '<span class="ro">▸</span>&nbsp;' + btn.dataset.name;
        btn.dataset.show = 'true';
    }
}

let topLevelCreateId = null;

function createSubProperty(
    name = 'property name',
    type = 'normal',
    uid = generateId()
) {
    const property = document.createElement('div');
    property.classList.add('sub-folder');
    property.classList.add('sub-property');
    property.dataset.uid = uid;
    property.dataset.type = type;
    property.innerText = name;
    property.onmousedown = (e) => subPropertyClick(e, property);
    return property;
}

function subPropertyClick(e, property) {
    // console.log(property.dataset.uid);
    Ref.createSubmenu.classList.add('hidden');
    for (const folder of Ref.createSubmenu.children) {
        if (folder.classList.contains('sub-folder')) {
            for (const fc of folder.children) {
                if (fc.classList.contains('sub-folder-data')) {
                    fc.classList.add('hidden');
                    for (const div of fc.children) {
                        closeSubs(div);
                    }
                }
            }
        }
    }
    // create obstacle! TODO: we'll have this enter into drag mode but for now we can just place the obs at 0,0
    // console.log(property.parentElement.parentElement.parentElement.parentElement.dataset.name);// shape
    // console.log(property.parentElement.parentElement.dataset.name);// simulate
    // console.log(property.innerText);// effect
    const obsTypes = {
        shape: property.parentElement.parentElement.parentElement.parentElement.dataset.name,
        simulate: property.parentElement.parentElement.dataset.name,
        effect: property.innerText
    }

    // we shouldn't have to add any more properties because that would mean that it was unsafe to begin with
    addObstacle({
        type: `${obsTypes.shape}-${obsTypes.simulate}-${obsTypes.effect}`//, r: 20, coins: 2, currentPoint: 2, path: [{x: 10, y: 10}, {x: 490, y: 10}, {x: 490, y: 490}, {x: 0, y: 490}], bounciness: 180, speed: 1
    }, this.map)
}

// addObstacle({
//     // shape: 'circle',
//     // simulate: [ 'normal' ],
//     // effect: 'normal',
//     // difference: { x: 500, y: 500 },
//     // type: 'circle-normal-normal',
//     // x: 0,
//     // y: 0,
//     // r: 250,
//     // pivot: { x: 0, y: 0 },
//     // rotation: 0,
//     // body: {
//     //     pos: { x: 0, y: 0 },
//     //     r: 250,
//     //     offset: { x: 0, y: 0 },
//     //     angle: 0
//     // }

//     // type: 'circle-normal-normal', x: 250, y: 250, r: 100
//     type: 'circle-move-coindoor', /*x: 150, y: 150,*/ r: 20, coins: 2, currentPoint: 2, path: [{x: 10, y: 10}, {x: 490, y: 10}, {x: 490, y: 490}, {x: 0, y: 490}], bounciness: 180, speed: 1
// }, this.map)

function createSubFolder(
    name = 'sub folder',
    props = [],
    show = 'false',
    toplevel = false
) {
    // ONLY FOR SUBMENU FOLDERS
    const folder = document.createElement('div');
    folder.classList.add('sub-folder');
    folder.id = generateId();
    folder.dataset.name = name;
    folder.dataset.toplevel = toplevel;
    const nameSpan = document.createElement('span');
    nameSpan.innerText = name;
    const gtSpan = document.createElement('span');
    gtSpan.classList.add('gt');
    gtSpan.innerText = '>';
    folder.appendChild(nameSpan);
    folder.appendChild(gtSpan);
    // folder.innerHTML = `<span>${name}</span><span class="gt">&gt;</span>`;
    folder.onmousedown = (e) => subFolderToggle(e, folder);
    const folderData = document.createElement('div');
    folderData.classList.add('sub-folder-data');
    for (const prop of props) {
        folderData.appendChild(prop);
    }
    folderData.classList.add('hidden');
    folder.appendChild(folderData);
    // console.log(absolute(folder).top)
    // OMG  I found the issude
    return folder;
}

function subFolderToggle(event, folder) {
    event.preventDefault();
    event.stopPropagation();
    for (const child of folder.children) {
        if (child.classList.contains('sub-folder-data')) {
            if (child.children.length > 0) {
                child.classList.toggle('hidden');
                const hidden = child.classList.contains('hidden');
                if (folder.dataset.toplevel === 'true') {
                    if (topLevelCreateId !== null) {
                        // close sub folder=
                        const openedFolder = findId(
                            Ref.createSubmenu,
                            topLevelCreateId
                        );
                        if (openedFolder) {
                            closeSubFolders(openedFolder);
                        }
                    }
                    topLevelCreateId = folder.id;
                }
                // im going insane
                if (
                    !folder.parentElement.classList.contains(
                        'create-submenu'
                    ) &&
                    folder.parentElement.parentElement.classList.contains(
                        'sub-folder'
                    )
                ) {
                    const upperFolder = folder.parentElement.parentElement;
                    function closeFolders(uf) {
                        for (const cf of uf.children) {
                            if (cf.classList.contains('sub-folder-data')) {
                                for (const div of cf.children) {
                                    // props/FOLDERS
                                    if (div.classList.contains('sub-folder')) {
                                        for (const c of div.children) {
                                            if (
                                                c.classList.contains(
                                                    'sub-folder-data'
                                                )
                                            ) {
                                                c.classList.add('hidden');
                                                for (const dc of c.children) {
                                                    closeSubs(dc);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    closeFolders(upperFolder);
                }
                if (!hidden && child.classList.contains('hidden')) {
                    child.classList.remove('hidden'); // supwer weird fix
                    // pls dont change this future zerotix
                }
                child.style.left = '120px';
                child.style.top = '-20.75px';
                // child.style.top = absolute(folder).top - 90 + 'px';
                // console.log(`(${child.style.left}, ${child.style.top})`)
                // folder.onmousedown = null;
            }
        }
    }
}

function createFolder(name = 'folder name', props = [], show = 'true') {
    const folder = document.createElement('div');
    folder.classList.add('folder');
    folder.id = generateId();
    const folderButton = document.createElement('button');
    folderButton.classList.add('folder-button');
    folderButton.dataset.show = show;
    folderButton.dataset.name = name;
    folderButton.addEventListener('mousedown', (e) =>
        folderToggle(e, folderButton)
    );
    folder.appendChild(folderButton);
    const folderContent = document.createElement('div');
    folderContent.classList.add('folder-content');
    props.forEach((prop) => {
        folderContent.appendChild(prop);
    });
    folder.appendChild(folderContent);

    if (show === 'false') {
        folderButton.innerHTML = '<span class="or">▸</span>&nbsp;' + name;
        folderContent.classList.add('hidden');
    } else if (show === 'true') {
        folderButton.innerHTML = '<span class="ro">▸</span>&nbsp;' + name;
    }
    Ref.gui.appendChild(folder);
    return folder;
}

function createProperty(
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

function closeSubs(dc) {
    for (const c of dc.children) {
        if (c.classList.contains('sub-folder-data')) {
            c.classList.add('hidden');
            for (const dfc of c.children) {
                closeSubs(dfc);
            }
        }
    }
}

export default {createSubFolder, createSubProperty};