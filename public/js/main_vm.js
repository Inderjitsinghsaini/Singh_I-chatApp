// imports always go first - if we're importing anything
import chatMessage from "./modules/ChatMessage.js";
const socket = io();


function setUserId({sID, message})
{
    //debugger;
    vm.socketID = sID;
}

function runDisconnectMessage(packet)
{
    //debugger;
    console.log(packet);
}

function appendNewMessage(msg)
{
    //take the incoming message and push it into vue instance
    //
    vm.messages.push(msg);
}

//this is our new vue instance

const vm = new Vue({
    data:{
        socketID: "",
        messages:[],
        message: "",
        nickName: ""

    },

    components:{
        newmessage:chatMessage
    },

    methods:{
        dispatchMessage(){
            //emit a message event and send a message to the server
            console.log('handle send message')

            socket.emit('chat_message', {
                content: this.message,
                name: this.nickName || "anonymous"
                // || is called a double pipe operater an 'or' operator
                //if this.nickName is set use it as the value
                //or just make name anonymous
            })
            this.message= "";
        }
    },
    mounted: function() {
        console.log('mounted');
    }

}).$mount('#app');

// some  event handling -> these events are coming from the server
socket.addEventListener('connected', setUserId)
socket.addEventListener('user_discount', runDisconnectMessage)
socket.addEventListener('new_message', appendNewMessage)