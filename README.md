# Service workers and Sensitive Functions

Service workers are an essential component of Progressive Web Applications(PWA). They support offline loading, background code execution, and push notifications.

<img width="500" alt="sw-architecture" src="https://github.com/SkandaSiva/service-worker/assets/54946169/ad10f7c7-7d78-462d-8bb2-0b44004bb5b1 style="border: 2px solid  gray;">

Sensitive functions in Javascript are often used maliciously to perform actions with an undesirable outcome. 

Our work outlines the misuse of service workers with sensitive JavaScript functions. To that extent, we developed an extension to notify users of registered service workers in their browsers, and extend it to show possible attacks that can be mounted.

Our current research focuses on implementing a Cross Site Request Forgery attack (CSRF) using a malicious service worker. Our final goal is to establish a connection between the victim and our server which operates as a C&C.

![Screenshot from 2024-02-12 14-45-12](https://github.com/SkandaSiva/service-worker/assets/54946169/24f56ee9-632d-4dd2-baf1-614eb5e5d3a4)
