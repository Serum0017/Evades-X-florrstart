const chatOpen = false;

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
    // actual input
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

window.addEventListener("contextmenu", e => e.preventDefault());