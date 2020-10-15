# fullstack

This is a bundle of express.js as server and angular as client for build complete modern website. it's the template for a site that are ready for development and run, including usefull scripts that will help.

## installation

***All below instruction assumed you have nodejs installed***
1) Clone this repo `git clone https://github.com/shisho585/fullstack.git`.
2) Run `npm install` in root directory.
If everything went good, now you are ready to develop and run this site.

## dev-run
When you still develop your website, you will prefere to run angular in development mode without build it everytime you make changes in your code. for this you need to run `npm run start-dev` and it will run your express.js server by nodemon with DEBUG mode, so you can see all the requests to the server, and angular by `ng server` which compile all the files and serve them in [localhost:4200](http://localhost:4200/). both server and client are watching for changes and restarting automaticly when change is detect.

## build
When your development is end, it's time for build your angular code and plcae it inside the server. for this run `npm run build`.

## prod-run
After you builded your code you can now run it as prod, all in server. run `npm run start-prod` and only the server will run at localhost through the chosen port. (default is [localhost:3000](http://localhost:3000)).
