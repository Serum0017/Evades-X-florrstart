function el(select){
    return document.querySelector(select);
}

export default {
    canvas: el('.canvas'),
    toggleGui: el('.toggle-gui'),
    gui: el('.data-gui'),
    allGui: el('.all-gui'),
    guiContainer: el('.gui'),
    folderButtons: document.querySelectorAll('.folder-button'),
    createButton: el('#create-button'),
    settingsDiv: el('#settings'),
    createSubmenu: el('.create-submenu'),
    deleteButton: el('#delete-button'),
    exportButton: el('#export'),
    importButton: el('#import-button'),
    resyncButton: el('#resync'),
    testButton: el('#test'),
    duplicateButton: el('#duplicate-button'),
    saveButton: el('#save'),
    clearButton: el('#clear'),
    resizeButton: el('#resize'),
    rotateButton: el('#rotate'),
    undoButton: el('#undo'),
    redoButton: el('#redo'),
    resizeText: el('#resize-text'),
    selectText: el('#select-text'),
    rotateText: el('#rotate-text'),
    selectButton: el('#select'),
    shortcutGui: el('.shortcut-gui'),
    moveButton: el('#move'),
    moveText: el('#move-text'),
};