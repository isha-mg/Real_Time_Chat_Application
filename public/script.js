const socket = io()

let name;

let textarea = document.querySelector('#textarea')

let messageArea = document.querySelector('.message_area')


do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter')
    {
        sendMessage(e.target.value)
    }
})

function sendMessage(msg) {
    let msgg = {
        user: name,
        message: msg.trim()
    }

    appendMessage(msgg, 'outgoing')

    textarea.value=''
    scrollToBottom()

    socket.emit('message',msgg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')

    let className = type
    mainDiv.classList.add(className, 'message')

    let markUp = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>

    `
    mainDiv.innerHTML = markUp

    messageArea.appendChild(mainDiv)
}

// recieve message

socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}