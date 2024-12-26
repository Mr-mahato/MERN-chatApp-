## for establishing the connection between websocket server

-- we need to send the first http request then the http server gets converted to the websocket server
and websocket server sends back 101 switicing protocol response.

## websocket is persistent, bidirectional , full duples communication protocoal.

(both client and server receive messages asynchronously)

<h3>Handshake in websoket connection </h3>
a "handshake" in WebSocket refers to an initial HTTP request sent by a client to a server, essentially asking to upgrade the connection from standard HTTP to the WebSocket protocol, allowing for real-time, bidirectional communication
img address: https://www.cuelogic.com/wp-content/uploads/2021/06/websocket_29394_l1.png

## differente phases that happen while creating the websocket server protocl

a. HTTP Upgrade Request: The client initiates the handshake by sending an HTTP upgrade request to the server, indicating its intention to switch to the Websocket protocol.

b. Server Response: Upon receiving the upgrade request, the server responds with an HTTP 101 status code, indicating a successful upgrade to the Websocket protocol.

c. Headers and Key Generation: During the handshake, both the client and server exchange headers containing information required for establishing the Websocket connection. The client generates a random key, which is combined with a predefined Websocket GUID and then base64-encoded.

d. Verification and Acceptance: The server verifies the received key, constructs a response key by concatenating the client key with the GUID, and then base64-encodes it. If the server accepts the client’s request, it includes the response key in the response headers.

e. Connection Establishment: Once the client receives the server’s response, it verifies the response key to ensure the connection is established with the correct server. If the verification is successful, the Websocket connection is considered open and ready for bidirectional communication.
