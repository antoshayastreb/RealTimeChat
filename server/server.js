const app = require('express')();

const server = require('http').createServer(app)

const port = 5000;

const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();

const { InMemoryMessageStore } = require("./messageStore");
const messageStore = new InMemoryMessageStore();

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

const io = require('socket.io')(server);
server.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
});

io.use((socket, next) => {
    //Регистрация имени пользователя в системе
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
      // Поиск существующей сессии
      const session = sessionStore.findSession(sessionID);
      if (session) {
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        socket.username = session.username;
        return next();
      }
    }
    const username = socket.handshake.auth.username ?? socket.handshake.headers?.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    // Создание новой сессии
    socket.sessionID = randomId();
    socket.userID = randomId();
    socket.username = username;
    next();
  });

io.on("connection", (socket) => {
  //Сохранить сессию пользователя
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });
  //Отправка id сессии
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.join(socket.userID);

  //Получение списка онлайн пользователей,
  //при подключении
  const users = [];

  const messagesPerUser = new Map();
  messageStore.findMessagesForUser(socket.userID).forEach((message) => {
    const { from, to } = message;
    const otherUser = socket.userID === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      userID: session.userID,
      username: session.username,
      connected: session.connected,
      messages: messagesPerUser.get(session.userID) || [],
    });
  });
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);

  //Уведомление пользователей о том, что 
  //подключился новый пользователь
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });

  socket.on("private message", ({ content, to }) => {
    //Обработчик "личных сообщений"
    const message = {
      content,
      from: socket.userID,
      to,
    };
    socket.to(to).to(socket.userID).emit("private message", {
      content,
      from: socket.userID,
      to,
    });
    messageStore.saveMessage(message);  
  });

  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });


});