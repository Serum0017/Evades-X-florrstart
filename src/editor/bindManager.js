import Ref from './editorRef.js';
import editorUtils from './editorUtils.js';
const {excludedProperties} = editorUtils;

// responsible for adding stuff to the edit manager menu through intercepting calls to the object through proxies
export default class BindManager {
    constructor(client){
        this.client = client;
    }
    start(){
        this.editorManager = this.client.editorManager;
        this.editManager = this.client.editorManager.editManager;

        this.defineProxyHandler();
    }
    defineProxyHandler(){
        // el: {folder: [folder], sub: { [key1]: [folder/input], ... }}
        const bindManager = this;
        this.proxyHandler = {
            set(target, key, value) {
                if(excludedProperties[key] !== true){
                    if(key === 'rotation'){
                        value = value % (Math.PI * 2);
                    }
                    // console.log('setting ' + key);

                    if(typeof target[key] === typeof value){
                        if(typeof value === 'number'){
                            target.el.sub[key].querySelector("input").value = Math.round(value * 10000) / 10000;
                            // if(target.el.sub[key].querySelector("input").value === -0)target.el.sub[key].querySelector("input").value = 0;
                        } else {
                            target.el.sub[key].querySelector("input").value = value;
                        }
                        return Reflect.set(...arguments);
                    }

                    const parentFolder = target.el.folder.getElementsByClassName('folder-content')[0];//target.el.sub[key].parentElement;
                    if(target.el.sub[key] !== undefined){
                        target.el.sub[key].remove();
                    } 
    
                    // code review: this is not maintainable code. There's some logic of looping through params and excluded properties that doesn't exactly match this in editManager. Maybe call a function there instead so that stuff can be more maintainable. Also i dont like how sub isnt defined here but thats just more fuel to the flames rather than a problem in its own right 
                    // const folderContent = target.el.folder.getElementsByClassName('folder-content')[0];
                    target.el.sub[key] = /*folderContent*/parentFolder.appendChild(bindManager.editManager.createPropertyInFolder(target, key, target[key]));
                    if(target.el.folder.isOpen === false){
                        target.el.sub[key].classList.add("hidden");
                    }
                }
                
                return Reflect.set(...arguments);
            },
            deleteProperty(target, key) {
                if(excludedProperties[key] !== true){
                    target.el.sub[key].remove();
                    // delete target.el.sub[key];
                }
                
                return Reflect.deleteProperty(target, key);
            },
        };
    }
    bindToDOM(target, targetFolder=Ref.gui){
        targetFolder.appendChild(this.editManager.createFolder(target));

        return new Proxy(target, this.proxyHandler);
    }
}