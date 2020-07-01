import app from 'firebase/app'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY
};


class Firebase {
    constructor(){
        app.initializeApp(config)
    }
}

export default Firebase;