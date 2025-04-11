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
    },

    getMessages() {
      const messageObjectsIterator = this.getMessageObjectsIterator();

      const newMessageObjects = [];
      for (const { object } of messageObjectsIterator) {
        console.log("this is the message abt to be pushed", object.value.content);
        if (object.value.content == "") {
          console.log("bad message, skipping")
        }
        else {
          console.log("good message (not empty)");
          newMessageObjects.push(object);
        }

      }

      // Sort here

      this.messageObjects = newMessageObjects;
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


  // changes made:
  
