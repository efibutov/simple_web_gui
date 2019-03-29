import ReconnectingWebSocket from "reconnecting-websocket";

function logger(msg) {
    console.log("\n\n\n===============================");
    console.log(msg);
    console.log("===============================\n\n\n");
}

function createWebSocket(url, port, onMessageCallback, setLocalGUIWebServer) {
    let webSocket = new ReconnectingWebSocket(`ws://${url}:${port}/websocket`);

    webSocket.onopen = () => {
        setLocalGUIWebServer(true);
    };

    webSocket.onclose = () => {
        setLocalGUIWebServer(false);
    };

    webSocket.onmessage = (msg) => {
        onMessageCallback(msg);
    };
    return webSocket;
}


export { logger, createWebSocket };
