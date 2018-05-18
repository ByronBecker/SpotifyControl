
import Peer = require('peerjs');


export class PeerClient {
    public peer: Peer;
    protected id: string = null;
    //public messages = [];
    public connections = {};
    public recent_id:string = null;
    //messages = []
    public sender_message = null;
    public dataRelay;
    //public recent_message = null;
    //public newPeerInput: string = null;
    constructor(dataRelay: (event:string, data:any) => any) {  //type this out better later, really takes in a type Data (from ModelTypes in DP)
        this.dataRelay = dataRelay
        this.peer = new Peer({debug: 3, host: 'localhost', port:4000, path: '/myapp'}),
        this.peer.on('open', (id) => {
            this.id = id
            console.log("peer is now", this.peer, "with id = ", this.id)
            this.dataRelay("id", id);
        });
        this.peer.on('error', (err) => {
             if (err.type == 'peer-unavailable') {
                 alert('the peer ' + this.recent_id + ' does not exist');
                 this.removeConnection(this.recent_id);
             }
         });
 
         this.peer.on('connection', (dataConnection) => {
             console.log('data connection was made');
             console.log(dataConnection.id);
             this.connections[dataConnection.id] = {
                 role: 'sender',
                 connection: dataConnection,
             }
             //this.updateConnections();
             //this.connections[connection_id] = dataConnection
 
         });
    }
 
     setRecentConnection = (connection_id) => {
         this.recent_id = connection_id;
     }
 
     setSenderMessage = (e) => {
         this.sender_message = e.target.value
 
     }
 
     sendMessage = () => {
         //let message = <span> {this.sender_message} </span>
         //let span = document.createElement("SPAN");
         //let text = document.createTextNode(this.sender_message);
         //let messages = this.state.messages
         //messages.push(<p> {this.state.id}: {this.sender_message} </p>)
         //console.log("messages list is", messages)
         console.log("connections list is", this.connections);
 
         for (const id in this.connections) {
             if (this.connections[id].role == 'sender') {
                 console.log("sending", this.sender_message, "to", this.connections[id].peer)
                 this.connections[id].connection.send(this.sender_message)
 
             }
         }
     }
     
     removeConnection = (connection_id) => {
         console.log('closed connection to: ' + connection_id);
         delete this.connections[connection_id];
         console.log('connections are: ')
         console.log(this.connections);
         //this.updateConnections();
     }
 
     connectionExists = (id) => {
         if (id in this.connections) {
             alert('already connected to ' + id)
             return true;
         }
         return false;
     }
     
     connectP2P = (connection_id) => { //id of who are connection/subscribing to
         console.log("called connect with connection_id=", connection_id);
         if (this.connectionExists(connection_id))  {
             //if connection already exists, no need to reconnect
             return;
         }
 
         let connection = this.peer.connect(connection_id); //connection is a dataConnection
         console.log("on spotify side made connection", connection)
 
         connection.on('close', () => {
             this.removeConnection(connection_id)
         });
 
         connection.on('data', (data) => {
             //console.log('received ', data, "via connection", connection);
             this.dataRelay("data", data);
             //let messages = this.messages;
             //messages.push(<p> {connection.peer}: {data} </p>);
             //this.setState({
             //    messages: messages,
             //});
         });
         //console.log(connection);
 
         this.connections[connection_id] = {
             role: 'receiver',
             connection: connection,
         }
         console.log('adding connection: ');
         console.log(this.connections[connection_id].connection)
         //this.updateConnections();
     }

     disconnect = (connection_id) => {
        this.connections[connection_id].connection.close();
        this.removeConnection(connection_id);
    }
}