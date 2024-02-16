# VK-Angular-Ngrx

## Navigation

- [VK-Angular-Ngrx](#vk-angular-ngrx)
  - [Navigation](#navigation)
  - [Description](#description)
  - [Guidelines for running VK-Angular-Ngrx](#guidelines-for-running-vk-angular-ngrx)
  - [The application containment](#the-application-containment)
    - [Sign Up Page](#sign-up-page)
    - [Login Page](#login-page)
    - [Profile Page](#profile-page)
    - [Audio Page](#audio-page)
    - [Messages Page](#messages-page)
    - [Navigation](#navigation-1)

## Description

This project had inspiration to be build from Russian social media website - https://vk.com. The project is written with [Angular Framework](https://angular.io/) help. The purpose of VK-Angular-Ngrx was to show the power of Angular Framework and [Ngrx state managment](https://ngrx.io/). The above mentioned tools are not the only ones which were used in this project, VK-Angular-Ngrx is written with [bootstrap](https://getbootstrap.com/), [bootstrap-icons](https://icons.getbootstrap.com/); BackEnd part of the application is written with [json-server](https://www.npmjs.com/package/json-server) and [json-server-uploader](https://www.npmjs.com/package/json-server-uploader) help.

## Guidelines for running VK-Angular-Ngrx

1. Run `npm install` for installing all the packages
2. Replace 'index.js' file in 'node_modules/json-server-uploader/' with 'index.js' file in root directory
   [image](https://github.com/MatthewKulyabin/VK-Angular-Ngrx/assets/53336418/33658190-f520-4e52-a8b7-cb15977e35f0)
3. Run `json-server --watch -p 8000 db.json --middlewares ./node_modules/json-server-uploader/` for starting json-server with json-server-uploader
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## The application containment

#### Sign Up Page

The 'Sign Up Page' contains two fields 'email' and 'password'. The fields have validations: 'email' - required, must be an email; 'password' - required, must contain lowerCase, upperCase, numbers, symbols. [The code](./src/app/features/signup-page/).
![image](https://github.com/MatthewKulyabin/VK-Angular-Ngrx/assets/53336418/0a408303-d101-45a1-a7dc-1785d1dea84d)

#### Login Page

The 'Login Page' contains two fields 'email' and 'password' as the [Sign Up Page](#sign-up-page). The fields have validations: 'email' - required, must be an email; 'password' - required, must contain lowerCase, upperCase, numbers, symbols. [The Code](./src/app/features/login-page/).
![image](https://github.com/MatthewKulyabin/VK-Angular-Ngrx/assets/53336418/1349920f-e1c1-478c-8537-3cdf7eeb9e93)

#### Profile Page

The 'Profile Page' contains several components: [Header](./src/app/share/components/header/), [Navigation](./src/app/share/components/nav/), [User](./src/app/features/profile-page/user/), [Posts](./src/app/share/components/posts-list/), [Followers](./src/app/share/components/followers/). On this page you can find other users by using 'Search' field at the [Header](./src/app/share/components/header/).

You can change you're profile by clicking 'Edit Icon'[(code)](./src/app/share/components/icons/edit-icon/) at the left corner and delete you're profile by clicking 'Delete Icon'[(code)](./src/app/share/components/icons/delete-icon/) at the right corner. You can navigate to other pages like [Audio Page](#audio-page), [Messages Page](#messages-page) or other profiles by using 'Search' field at the [Header](./src/app/share/components/header/) or by clicking on Icons of you're 'You Follow' list.

Current User Page Image.
![image](https://github.com/MatthewKulyabin/VK-Angular-Ngrx/assets/53336418/467e978c-0be0-4e5a-93c4-8353bcf71a82)

Other User Page Image. Here, you can follow the user and send a Message[(code)](./src/app/share/components/message-form/) to one.
![image](https://github.com/MatthewKulyabin/VK-Angular-Ngrx/assets/53336418/ef86f594-faf8-4631-8aae-5ec984b44115)

User Form [(code)](./src/app/features/audio-page/audio-form/). Fields and validations: 'Name' - required, min length - 3, max length - 70; 'Email' - required, must be an email, 'Password' - required, must contain lowerCase, upperCase, numbers, symbols; 'Birth Date' - required, have to be 14 years old at least; 'Mobile' - min length - 4, max length - 15; 'Address' - max length - 50; photo.

![image](https://github.com/MatthewKulyabin/VK-Angular-Ngrx/assets/53336418/cf63b1ee-4092-43fc-a3a4-c8c66b4ea350)

#### Audio Page

The 'Audio Page' contains several components: [Header](./src/app/share/components/header/), [Navigation](./src/app/share/components/nav/), [Audio Player](./src/app/share/components/audio/), [Audio List](./src/app/share/components/audio/audio-list/), [Followers](./src/app/share/components/followers/).

On this page you can: search for audio by using 'search field', add you're own audio [(code)](./src/app/features/audio-page/audio-form/), delete you're audio, play the audio by clicking on 'Play Icon'[(code)](./src/app/share/components/icons/play-icon/), search for audio which were added by the users you follow by clicking on their icons in 'You Follow' section.

Audio Player. You can: pause the audio which is currently playing, mute the audio, change volume, change progress by manipulating the progress length.
![image](https://github.com/MatthewKulyabin/VK-Angular-Ngrx/assets/53336418/4ae6fac4-34b1-4264-8a22-c57a0b675877)

Audio Form [(code)](./src/app/features/audio-page/audio-form/). Fields and validations: 'Title' - required, max length - 25; 'Author' - required, max length - 25, 'Audio File' - required.  
![image](https://github.com/MatthewKulyabin/VK-Angular-Ngrx/assets/53336418/df2147f0-d31e-4121-8078-2e28c1e574d0)

#### Messages Page

The 'Message Page' contains several components: [Header](./src/app/share/components/header/), [Navigation](./src/app/share/components/nav/), [Diologs List](./src/app/features/messages-page/message-left-side/), [Current Diolog](./src/app/features/messages-page/message-right-side/).

On this page you can: choose diolog, search for diolog and choosing it; send a message to the user which diolog you had with previously, delete message you sent, edit message you sent.

The message itself has one validation - required.
![image](https://github.com/MatthewKulyabin/VK-Angular-Ngrx/assets/53336418/afa04abc-76ef-49d5-a49b-b8da2bf9a5f9)

#### Navigation

- [VK-Angular-Ngrx](#vk-angular-ngrx)
  - [Navigation](#navigation)
  - [Description](#description)
  - [Guidelines for running VK-Angular-Ngrx](#guidelines-for-running-vk-angular-ngrx)
  - [The application containment](#the-application-containment)
    - [Sign Up Page](#sign-up-page)
    - [Login Page](#login-page)
    - [Profile Page](#profile-page)
    - [Audio Page](#audio-page)
    - [Messages Page](#messages-page)
    - [Navigation](#navigation-1)
=======
This project had inspiration to be build from Russian social media website - https://vk.com. The project is written with [Angular Framework](https://angular.io/) help. The purpose of VK-Angular-Ngrx was to show the power of Angular Framework and [Ngrx state managment](https://ngrx.io/). The above-mentioned tools are not the only ones which were used in this project, VK-Angular-Ngrx is written with [bootstrap](https://getbootstrap.com/), [bootstrap-icons](https://icons.getbootstrap.com/); BackEnd part of the application is written with [json-server](https://www.npmjs.com/package/json-server) and [json-server-uploader](https://www.npmjs.com/package/json-server-uploader) help.

## Guidelines for running VK-Angular-Ngrx

1. Run `npm install` for installing all the packages
2. Replace 'index.js' file in 'node_modules/json-server-uploader/' with 'index.js' file in root directory
 [image](https://github.com/MatthewKulyabin/VK-Angular-Ngrx/assets/53336418/33658190-f520-4e52-a8b7-cb15977e35f0)
3. Run `json-server --watch -p 8000 db.json --middlewares ./node_modules/json-server-uploader/` for starting json-server with json-server-uploader
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
>>>>>>> 61a00e31083f8587f3775d4bb716bdb512c22a4a
