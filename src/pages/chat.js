const chatDiv = document.querySelector('.chat-div');

function appendChatMessage(msg){
    const chatMessage = document.createElement('div');
    chatMessage.innerHTML = msg;
    chatMessage.className = "chat-message";
    chatDiv.prepend(chatMessage);
    setTimeout(() => {
        // animating fadeout after 5s
        chatMessage.animate([
            {
                opacity: 1,
            },
            {
                transform: 'rotateZ(2deg)',
                'font-size': '0rem',
                opacity: 0,
            },
        ], {
            duration: 1000,
            iterations: 1
        });
        
        setTimeout(() => {
            chatMessage.remove();
        }, 950)
    }, 5000);
}

// UNUSED
const chars = ['a','b','c','$'];
function generateChatMsg(){
    let str = '';
    for(let i = 0; i < 10; i++){
        str += chars[Math.floor(chars.length*Math.random())];
    }
    return str;
}