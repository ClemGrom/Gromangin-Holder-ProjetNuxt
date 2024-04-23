<template>
    <div>
        <v-container>
            <v-card v-for="message in messages" :key="message.id" class="p-4 mb-4" color="blue-lighten-5">
                <div class="d-flex">
                    <v-card-title>{{ message.author_id }}</v-card-title>
                    <v-card-text>
                        <template v-if="inputMessageId === message.id">
                            <v-text-field v-model="newMessageContent" @keyup.enter="modifierMessage"></v-text-field>
                        </template>
                        <template v-else>
                            {{ message.content }}
                        </template>
                    </v-card-text>
                    <v-card-subtitle>{{ new Date(message.date).toLocaleDateString('fr-FR') }}</v-card-subtitle>
                    <v-btn color="primary" @click="showInput(message.id)">Changer msg</v-btn>
                </div>
            </v-card>
            <div style="height: 60px;"></div>

            <div class="d-flex" style="position: fixed; width: 100%; max-width: inherit; bottom: 0;">
                <v-text-field v-model="content" @keyup.enter="addMessage" class="mr-2"
                    style="flex-grow: 1;"></v-text-field>
                <v-btn color="primary" @click="addMessage">Envoyer</v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messages: [],
            error: '',
            inputMessageId: null,
            newMessageContent: '',
            content: '',
        };
    },
    async created() {
        await this.loadMessages();
    },
    methods: {
        async loadMessages() {
            const sujetId = this.$route.params.id;
            try {
                const response = await fetch(`http://localhost:3000/api/messages?sujet_id=${sujetId}`);
                const data = await response.json();
                console.log('Received data from API:', data);
                this.messages = data.messages;
            } catch (error) {
                console.error('Error loading messages:', error);
                this.error = error.message;
            }
        },
        async addMessage() {
            const sujetId = this.$route.params.id;
            const messageData = {
                user_id: 1,
                content: this.content,
                sujet_id: sujetId,
            };
            try {
                const response = await fetch(`http://localhost:3000/api/messages?sujet_id=${sujetId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messageData),
                });
                this.content = '';
                await this.loadMessages();
                window.scrollTo(0, document.body.scrollHeight);
            } catch (error) {
                console.error('Error adding message:', error);
                this.error = error.message;
            }
        },
        async modifierMessage() {
            const messageData = {
                id: this.inputMessageId,
                content: this.newMessageContent,
            };
            try {
                const response = await fetch(`http://localhost:3000/api/messages`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messageData),
                });

                this.inputMessageId = null;
                this.newMessageContent = '';
                await this.loadMessages();
            } catch (error) {
                console.error('Error updating message:', error);
                this.error = error.message;
            }
        },
        showInput(messageId) {
            if (this.inputMessageId === messageId) {
                this.modifierMessage();
            } else {
                this.inputMessageId = messageId;
                const message = this.messages.find(msg => msg.id === messageId);
                this.newMessageContent = message.content;
            }
        },
    },
};
</script>
