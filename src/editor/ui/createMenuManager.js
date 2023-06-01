import Ref from '../editorRef.js';

export default class CreateMenuManager {
    constructor(client){
        this.client = client;
    }
    start(){
        this.map = this.client.game.map;
        this.topLevelCreateId = null;

        this.obstacleTypes = {
            shape: Object.keys(window.initShapeMap),
            simulate: Object.keys(window.initSimulateMap),
            effect: Object.keys(window.initEffectMap)
        };// defined manually for now, TODO: will eventually get ref
        // the reason its defined in start is bc maybe we'll need a getObstacles fn or something, and we want this to be at the time of start and not construct.

        Ref.createButton.onclick = () => {
            if(Ref.createSubmenu.children.length === 0){
                // create the menu's components
                for(let shapeType of this.obstacleTypes.shape){
                    this.createFolder(Ref.createSubmenu, shapeType, 'shape');
                }
                const createButtonBound = Ref.createButton.getBoundingClientRect();
                Ref.createSubmenu.style.left = (createButtonBound.left - Ref.createSubmenu.getBoundingClientRect().width/3) + 'px';
                Ref.createSubmenu.style.top = (createButtonBound.bottom - 25) + 'px';
            } else {
                Ref.createSubmenu.classList.remove('hidden');
                // its already open, close the folder
                this.closeFolder({folderData: Ref.createSubmenu});
            }
        }
    }
    addFolderChild(folder, child){
        if(folder.folderData !== undefined){
            folder.folderData.classList.remove('hidden');
            folder.folderData.appendChild(child);
        } else {
            folder.classList.remove('hidden');
            folder.appendChild(child);
        }
    }
    createProperty(parent, name) {
        const property = document.createElement('div');
        property.classList.add('sub-folder');
        property.classList.add('sub-property');
        property.innerText = this.formatName(name);
        property.name = name;
        property.onmousedown = (e) => this.clickProperty(e, property);

        this.addFolderChild(parent, property);

        return property;
    }
    createFolder(parent, name, layerType='simulate') {
        const folder = document.createElement('div');
        folder.classList.add('sub-folder');
        folder.onmousedown = (e) => this.clickFolder(e, folder);
        folder.layerType = layerType;
        folder.name = name;

        const nameSpan = document.createElement('span');
        nameSpan.innerText = this.formatName(name);
        folder.appendChild(nameSpan);

        const gtSpan = document.createElement('span');
        gtSpan.classList.add('gt');
        gtSpan.innerText = '>';
        folder.appendChild(gtSpan);
        
        const folderData = document.createElement('div');
        folderData.classList.add('sub-folder-data');
        folderData.classList.add('hidden');
        folderData.style.left = '120px';
        folderData.style.top = '-20.75px';
        folder.appendChild(folderData);
        folder.folderData = folderData;

        this.addFolderChild(parent, folder);
        
        return folder;
    }
    clickFolder(event, folder) {
        event.preventDefault();
        event.stopPropagation();
        
        if(folder.folderData.firstChild){
            // we already have the folder open; close it
            this.closeFolder(folder);
        } else {
            // if other folders are open, close them
            let parentFolder = folder.parentElement;
            if(folder.parentElement.folderData){
                parentFolder = folder.parentElement.folderData;
            }
            for(let i = 0; i < parentFolder.children.length; i++){
                this.closeFolder(parentFolder.children[i]);
            }

            // create the sub elements in the folder
            this.openFolder(folder);
        }
    }
    openFolder(folder){
        folder.folderData.classList.remove('hidden');
        if(folder.layerType === 'shape'){
            this.obstacleTypes.simulate.map(type => this.createFolder(folder, type, 'simulate'));
        } else if(folder.layerType === 'simulate'){
            this.obstacleTypes.effect.map(type => this.createProperty(folder, type));
        }
    }
    closeFolder(folder) {
        folder.folderData.classList.add('hidden');
        const parent = folder.folderData;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    clickProperty(event, property) {
        this.closeFolder({folderData: Ref.createSubmenu});
        Ref.createSubmenu.classList.add('hidden');

        // create obstacle! TODO: we'll have this enter into drag mode but for now we can just place the obs at 0,0
        const obsTypes = {
            shape: property.parentElement.parentElement.parentElement.parentElement.name,
            simulate: property.parentElement.parentElement.name,
            effect: property.name
        }
    
        // we shouldn't have to add any more properties because that would mean that it was unsafe to begin with
        this.client.selectionManager.addPreviewObstacle({type: `${obsTypes.shape}-${obsTypes.simulate}-${obsTypes.effect}`});
    }
    formatName(name){
        if(name.length > 1){
            name = name[0].toUpperCase() + name.slice(1);
        }
        
        for(let i = 0; i < name.length; i++){
            if(name[i].toUpperCase() === name[i]){
                name = name.slice(0, i) + ' ' + name[i] + name.slice(i+1);
                i += 2;
            }
        }
        return name;
    }
}