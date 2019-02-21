title: Consumer
---

# Consumer

The consumer is the most important part of webster. Actually, it is a spider inst waiting for task and crawl some web page whenever it gets task. The consumer is always watch the task queue untill gets any task. Webster framework expect at least one consumer inst and one producer inst, and of course, you can setup a lot of consumers and producer. This is why it called webster.

Notice that you should not directly use the `Consumer` class to build up your consumer inst, but inherit a subclass which extends the `Consumer`. There are some method which provided by `Consumer` class, you can override them to hook the lifecycle of a spider crawling action.

Here is an example.

You can set a subclass:
```javascript
const Webster = require('webster');
const Consumer = Webster.consumer;

class MyConsumer extends Consumer {
    constructor(option) {
        super(option);
    }
    afterCrawlRequest(result) {
        console.log('your scrape result:', result);
    }
    async beforeParseHtml(html) {
        console.log(/<\/html>/.test(html));
        if (/<\/html>/.test(html)) {
            return true;
        }
        else {
            return false;
        }
    }
    whenTaskFailed(task, reason) {
        console.log('your task has failed:', task, ', because of:', reason);
    }
}
```

And then new a inst:
``` javascript
let myConsumer = new MyConsumer({
    channel: 'baidu',
    sleepTime: 5000,
    deviceType: 'pc',
    dbConf: {
        redis: {
            host: '<your redis host>',
            port: 6379,
            password: '<your redis password>'
        }
    }
});
myConsumer.startConsume();
```

## channel

This is a required param. Every `consumer` must set a channel, channel is a unique identification of a task queue and this tells your consumer which task queue it should watch.

## sleepTime

This is not a required param. The default value is 5000(ms), which means the consumer inst will poll the task queue service (actually redis server) one time by 5 seconds. Too frequently polling may cause your task queue overload.

## deviceType
This is not a required param.

value | meaning
---- | ---
pc | Your spider will seems like a pc.
mobile | Your spider will seems like a mobile device.

## dbConf

Now webster is only support redis database to build up task queue. What you should do is only to provide a redis server for webster, and then the task queue will be founded and maintained by webster.

Notice that you should set a password for your redis.

## afterCrawlRequest

This is a hook method, which will be invoked after your spider crawling the page and parse your target information for you.

## beforeParseHtml

This is a hook method, which will be invoked after your spider crawling the page but before parse the page content. Why you should hook this method? Sometimes the service which you crawl may get some error and render a error page for you, so the page will not contains the target dom which you expect, you can `return false` to tell the spider this and let it recrawl the page by the hook `whenTaskFailed`.

## whenTaskFailed

This is a hook method, which will be invoked when your `beforeParseHtml` return false. You can record the error crawling or directly new a `producer` to send this task back to the task queue.

## changeOption
This method is inherited from `Consumer` class which can change the `sleepTime` and `userAgent` options which you have set when the consumer instance setup.
