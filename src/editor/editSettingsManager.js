import Ref from './editorRef.js';
import editorUtils from './editorUtils.js';
const {defineAsUnEnumerable, excludedProperties, generateId} = editorUtils;

// the edit settings panel in the menu
export default class EditSettingsManager {
    constructor(client, editManager){
        this.client = client;
        this.editManager = editManager;
    }
    start(){
        this.defineEditorProperties();

        Ref.gui.appendChild(this.createSettingsFolder());
    }
    defineEditorProperties(){
        this.properties = [
            // {object: this.client.selectionManager.settings, key: 'snapDistance'},
            // {object: this.client.selectionManager.settings, key: 'toSnap'},
            {object: this.client.game.map.settings.dimensions, key: 'x', keyName: 'map width'},
            {object: this.client.game.map.settings.dimensions, key: 'y', keyName: 'map height'},
            {object: this.client.editorManager.snapGridManager, key: 'snapDistance', keyName: 'snap distance'},
            {object: this.client.editorManager.snapGridManager, key: 'enabled', keyName: 'snap enabled'},
            /*, {object: window, key: 'isFullScreen', keyName: 'toggle full screen'}*/
        ];
    }
    createSettingsFolder(){
        const settingsObject = {isEditorProperties: true};
        defineAsUnEnumerable(settingsObject, 'propData', {});

        // object format: {[hidden] propData: {[key]: {value, object: [object reference], [optional] keyName}, [key]: {...getters and setters...}, ...}}
        for(let i = 0; i < this.properties.length; i++){
            const prop = this.properties[i];
            const key = prop.key;
            if(prop.keyName === undefined){
                prop.keyName = prop.key;
            }

            settingsObject.propData[prop.keyName] = prop;
            settingsObject.propData[prop.keyName].value = prop.object[key];

            Object.defineProperty(settingsObject, prop.keyName, {
                get(){
                    return settingsObject.propData[prop.keyName].value;
                },
                set(v){
                    settingsObject.propData[prop.keyName].value = v;
                    settingsObject.propData[prop.keyName].object[key] = v;
                },
                enumerable: true,
            });
        }

        return this.editManager.createFolder(settingsObject, 'Editor Settings');
    }
}