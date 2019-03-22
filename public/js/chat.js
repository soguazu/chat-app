const socket = io.connect('http://localhost:4000');


//Query Dom

let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback')


//Emit Event
btn.addEventListener('click', () => {
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});


//listen for an emittered message from the server

socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});


//Listening for who is typing
socket.on('typing', function(data) {
    feedback.innerHTML = `<p><em> ${data} is typing a message... </em></p>`;
});