# AddressBook

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3. 

It was done By; Cristhian Da Silva

The time it took to do the whole project was:
    Setup: 30mins
    Form Implementation: 6hours (Including unit test)
    Styles: 30min
    Backend integration: 2hours
    total: around 10hours

## Before starting

first, run ```npm install``` to get all the dependencies needed for the project.
Then, run ```npx wiremock``` to ensure you have wiremock standalone, if you don't please run ```npm i wiremock-standalone```, this is used for the mock-backend. once the wiremock server starts you can close it by pressing cntrl+c in the command line

## Running unit tests
To run the unit test just type the command ```npm run test```, all the test should be green. All the implementation was done following a TDD aproach as red/green/refactor, this ensured that all the functionality required was met.

## Running end-to-end tests
Regretfully, since it is my first time using electron I didn't build any e2e test to not spend time on the setup. However, in a daily basis scenario, this would be the first thing I've had built, this ensures the quality of the software as a whole and helps testing the integraton!

## Running locally
To run the application first we need to start the mock backend, to do so just type:
```npm run start:mock-backend```
once this is done, we can run the application with
```npm run start:electron```
once the window is open, you can start playing with the application

Overall, the application was fun to build, it took me more than expected since I haven't worked with form arrays in a long time.

## Shortcommings
You can add empty contacts, I'd fix this by check that the formGroup is valid before allowing to add the contact (actually is partly done, the formgroup already has the validators in place, just adding an if statement would have been enough to make it work, Didn't do it because I don't have time)

You can add any string in the phone number, the same fix for the previous point would apply here, the validator is done, is just missing the check.

you can not sort filtered values, for the filtering I had to return a new object to avoid overriding the formArray, I could have design it in a way that the list would always check for a different object and filter in that new object without touching the formArray, I realised about my mistake too late, thus, generating delays :(

I could have used the power of the subscriptions a bit more, listening to changes in the form instead of triggering events, but that would have required a bit more of time and is a bit of an overkill for the required criteria.

The mock backend actually does not store, there are ways in wiremock to add them, but again, it was a bit of an overkill.

The address-book.component.html is too big, I could have stracted more components to make it better and reusable. However, due to the nature of the task I just extracted a few to show how it is done. a good example of how I could have improve this would be by making an input component that acepted both the label and the input name, or creating a contact-form component that has the inputs for adding new contacts.

It could have had a prettier design. I hope you enjoy the simplicity of what I did and the name. I know is a horrible pun, but I could not resist the temptation.

Finally, I wanted to add an edit functionality, but it was taking too long so I stopped.
