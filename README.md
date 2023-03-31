# Paw

## Project description

Paw is a web application similar to Tinder, but Paw focuses on pet adoption. There are two types of users; keepers and animal shelters. Keepers are users who want to adopt or help with caring for pets that they liked. They can filter pets by species, location, distance, and age. Keepers as well have access to a list of all liked animals, and their acceptance status. On the other hand, users who are representing animal shelters can add new pets to share with keepers. To add a new pet, they have to provide its image, name, breed, age, and optional description. Animal shelters have also a list of their animals with a list of all interested keepers, and they can accept or discard keepers who liked a specified pet.

## Technology stack

- React.js
- Typescript
- Tailwind CSS
- React Router
- Formik
- Yup
- Supabase
- Vite
- Vitest

## Progress

### Authentication

A new user can sign up via:

- Google
- Discord
- Magic Link by providing his email address

Next, he creates his profile, where he has to choose what type of account he wants to make (Keeper or Animal Shelter). Based on his pick he has to provide some basic profile information like name, avatar image, etc.

### Authorization

Authorization is based on the profile type which the user created. "Keeper" users have access to other functionalities than "Animal Shelter" users.

### Profile type "Keeper" functionalities

- Discover available for adoptions pets
  - Like the ones that interest you
  - Mark ​​the ones you are not interested in
  - Display a description of an animal
  - Filter by species, age, location, and what type of pet you are interested in
- Check the status of liked animals
  - Filter liked animals by species, age, location, and name
  - Unlike liked animal
- Edit profile data
- Chat with animal shelter's user of approved pet

### Profile type "Animal shelter" functionalities

- Display list of added animals to the animal shelter
  - Delete animals from the animal shelter
  - Filter animals by species, age, name
- Add new animals to the animal shelter
- Display list of requests of liked animals sent by keepers
  - Change the like request status
- Edit profile data
- Edit animal data
- Chat with approved keepers

## ToDo list:

- [x] - Add animal description functionality
- [ ] - Add pagination functionality to lists
- [x] - Add edit animal functionality
- [x] - Add edit profile functionality
- [x] - Add chat functionality
