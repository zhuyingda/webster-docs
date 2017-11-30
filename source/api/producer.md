title: Producer
---

# Producer

The producer send tasks to your task queue, you can do this in your server controller or after any consumer crawling the page. The webster framework must start by a producer sending some task to queue.

Here is an example:

```javascript
let myProducer = new Producer({
    channel: 'baidu-spider',
    dbConf: {
        redis: {
            host: '<your redis host>',
            port: 8888,
            password: '<your redis password>'
        }
    }
});
myProducer.sendTasksToQueue(tasks).then(() => {
    console.log('done');
});
```

## channel

This is a required param. Every `producer` must set a channel, channel is a unique identification of a task queue.

## dbConf

Now webster is only support redis database to build up task queue. What you should do is only to provide a redis server for webster, and then the task queue will be founded and maintained by webster.

Notice that you should set a password for your redis.

## sendTasksToQueue
This is a method which returns a promise object after all tasks have been sended to task queue. You should pass a task array to this method.