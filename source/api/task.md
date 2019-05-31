title: Task
---

# Task

Every crawling request is a task, you can generate one or some tasks by `Task` class.

Task should be sended by a producer instance to your task queue.

Here is an example:

```javascript
const Webster = require('webster');
const Task = Webster.task;
let task = new Task({
    spiderType: 'browser',
    url: 'https://www.baidu.com/s?wd=javascript',
    targets: [
        {
            selector: '.result.c-container h3',
            type: 'text',
            field: 'title'
        },
        {
            selector: '.result.c-container h3 a',
            type: 'attr',
            attrName: 'href',
            field: 'link'
        },
        {
            selector: '.result.c-container .c-abstract',
            type: 'html',
            field: 'htmlfrag'
        }
    ],
    actions: [
        {
            type: 'waitAfterPageLoading',
            value: 3000
        },
        {
            type: 'clickSelectorElement',
            selector: '.cr-title-sub'
        }
    ],
    referInfo: {
        para1: 'para1',
        para2: 'para2'
    }
});
```

## spiderType

This param is to tell the consumer which type of crawling you select, default value is `plain`.

value | meaning
---- | ---
plain | Fast and only html content. Your spider will crawl the page by a normal http request, just scrape the html page content, not any ajax or js rendered part of the page
browser |  Slow but reliable. Your spider will crawl the page by headless chrome browser, so you will got all ajax and js rendered part of the page.

## url

The url you want to crawl. This is a required param. You can set any url which start by `http` or `https` scheme.

## targets

This param need a array value which contains some target parts which you want to crawl in the page.

key | meaning
---- | ---
selector | A css selector to find your target dom element. Now version does not support xpath.
type | You can choose `text`, `attr` and `html`.
attrName | If you choose `attr` for type key, you should set this key for your option.
field | This is the description of your crawling result.

## actions

This param requires Webster version >= 1.6.x

This param expects the `spiderType` param with a `browser` value, otherwise it will not works.

This param describe some actions when browser crawling the web page, the type attr determine the action, here is the valid type list:

- waitAfterPageLoading: The default value is 0(ms), which means the consumer inst will not wait for any time after the browser page loaded. If you set it 1000(ms), the browser will wait for 1 second after the page loaded and before the crawling action.
- clickSelectorElement: To click any element in the web page which you can specified by a css-query-selector.

## referInfo

This param is not required. If you want to pass some data for reference from `producer` to `consumer`, you can set them here.
