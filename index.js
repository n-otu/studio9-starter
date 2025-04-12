import { createApp } from "vue";
import { GraffitiLocal } from "@graffiti-garden/implementation-local";
import { GraffitiRemote } from "@graffiti-garden/implementation-remote";
import { GraffitiPlugin } from "@graffiti-garden/wrapper-vue";

const channels = ["designftw"];

createApp({
  data() {
    return {
      myMessage: "",
      sentMessageObjects: [],
      messageObjects: [],
    };
  },

  methods: {
    sendMessage(session) {
      this.sentMessageObjects.push({
        value: {
          content: this.myMessage,
          published: Date.now(),
        },
        channels,
      });
      //  clear automatically
      this.myMessage = "";
      // refresh automatically
      this.getMessages();
    },

    getMessages() {
      const messageObjectsIterator = this.getMessageObjectsIterator();

      const newMessageObjects = [];
      for (const { object } of messageObjectsIterator) {
        console.log("this is the message abt to be pushed", object.value.content);
        if (object.value.content == "") {
          console.log("bad message, skipping");
        }
        else {
          console.log("good message (not empty)", object.value.published);
          newMessageObjects.push(object);
        }

      }

      // Sort here
      toSorted(first_came_first())

      this.messageObjects = newMessageObjects;

      function first_came_first(message_1, message_2) {
        let ret = 0;
        // message 1 is older than message 2
        if (message_1.value.published > message_2.value.published) {
          ret = -1
        }
      }



    },

    *getMessageObjectsIterator() {
      for (const object of this.sentMessageObjects) {
        yield { object };
      }
    },
  },
})
  .use(GraffitiPlugin, {
    graffiti: new GraffitiLocal(),
    // graffiti: new GraffitiRemote(),
  })
  .mount("#app");
