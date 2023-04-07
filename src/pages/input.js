window.chatOpen = false;

function trackKeys(event, input) {
    if(document.activeElement === ref.chatInput){
        chatOpen = true;
        ref.chatInput.placeholder = "";
    } else {
        chatOpen = false;
    }
    if (event.repeat && !chatOpen) return event.preventDefault();

    // dealing with chat
    if (event.code === 'Enter') {
        if (chatOpen && event.type === 'keydown') {
            // send chat message
            ref.chatDiv.classList.add('hidden');
            const text = ref.chatInput.value.trim();
            send({chat: text});
            
            chatOpen = false;
            ref.chatInput.value = '';
            ref.chatInput.blur();
        } else if (event.type === 'keydown') {
            // focus chat
            chatOpen = true;
            ref.chatDiv.classList.remove('hidden');
            ref.chatInput.focus();
        }
        return;
    }
    if (chatOpen) return;
}

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
}

window.addEventListener('mousemove', (e) => {
	mouse.x = e.x;
    mouse.y = e.y;

    if(connected === true){
        const player = players[selfId];
        const dY = mouse.y - player.y + camera.y;
        const dX = mouse.x - player.x + camera.x;
        send({angle: Math.atan2(dY, dX), magnitude: Math.min(300,Math.sqrt(dY**2+dX**2))});
    }
});

document.body.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    // mouse movement
    mouse.x = touch.pageX;
    mouse.y = touch.pageY;

    if(connected === true){
        const player = players[selfId];
        const dY = mouse.y - player.y + camera.y;
        const dX = mouse.x - player.x + camera.x;
        send({angle: Math.atan2(dY, dX), magnitude: Math.min(300,Math.sqrt(dY**2+dX**2))});
    }
}, false);

ref.canvas.addEventListener('mousedown', (e) => {
	// attacking = true;
    if (e.button === 0) {
        send({attack: true});
    } else if (e.button === 2){
        send({defend: true});
    }
    event.preventDefault();
});

ref.canvas.addEventListener('mouseup', (e) => {
    // attacking = false;
    if (e.button === 0) {
        send({attack: false});
    } else if (e.button === 2){
        send({defend: false});
    }
    event.preventDefault();
});

window.addEventListener("contextmenu", e => e.preventDefault());

let mobileAttackingState = false;
let mobileDefendingState = false;

ref.attackButton.addEventListener('click', (e) => {
    mobileAttackingState = !mobileAttackingState;
    send({attack: mobileAttackingState});
}, false);

ref.defendButton.addEventListener('click', (e) => {
    mobileDefendingState = !mobileDefendingState;
    send({defend: mobileDefendingState});
}, false);