<template>
    <div class="hello">
        <h1>Общий чат</h1>

        <form @submit.prevent="onMessageSubmit">
            <input type="text" v-model="message" required>
            <button type="submit">Отправить</button>
        </form>

        <ul style="display: inline-grid;">
            <li v-for="(item, index) in chat" :key="index">
                <p>
                    <strong>Username:</strong> {{ item.user.name }}
                </p>
                <p>
                    <strong>Email:</strong> {{ item.user.email }}
                </p>
                <p>
                    <strong>CreatedAt:</strong> {{ item.created_at }}
                </p>
                <p>
                    <strong>Message:</strong> {{ item.message }}
                </p>
                <hr />
            </li>
        </ul>
    </div>
</template>

<script>
const { io } = require("socket.io-client");
const socket = io(process.env.VUE_APP_SOCKET_DOMAIN);

export default {
    name: 'ChatGeneral',
    data() {
        return {
            message: null,
            chat: [],
        }
    },
    mounted() {
        socket.on('connect', () => {
            console.log(`Connect SocketId: ${socket.id}`);
        });

        socket.on('chat-message_is_stored', (response) => {
            // TODO: Обновлять данные по чату из хранилища
            this.chat.push(response);
        });

        socket.on('disconnect', (reason) => {
            console.log(`Disconnect SocketId: ${socket.id}`);
            console.log(reason);
        });
    },
    methods: {
        onMessageSubmit() {
            socket.emit('chat-new_message', this.message);
            this.message = null;
        },
    },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
