# VK-Angular-Ngrx

This project had inspiration to be build from Russian social media website - https://vk.com. The project is written with [Angular Framework](https://angular.io/) help. The purpose of VK-Angular-Ngrx was to show the power of Angular Framework and [Ngrx state managment](https://ngrx.io/). The above-mentioned tools are not the only ones which were used in this project, VK-Angular-Ngrx is written with [bootstrap](https://getbootstrap.com/), [bootstrap-icons](https://icons.getbootstrap.com/); BackEnd part of the application is written with [json-server](https://www.npmjs.com/package/json-server) and [json-server-uploader](https://www.npmjs.com/package/json-server-uploader) help.

## Guidelines for running VK-Angular-Ngrx

1. Run `npm install` for installing all the packages
2. Replace 'index.js' file in 'node_modules/json-server-uploader/' with 'index.js' file in root directory
 [image](https://github.com/MatthewKulyabin/VK-Angular-Ngrx/assets/53336418/33658190-f520-4e52-a8b7-cb15977e35f0)
3. Run `json-server --watch -p 8000 db.json --middlewares ./node_modules/json-server-uploader/` for starting json-server with json-server-uploader
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
