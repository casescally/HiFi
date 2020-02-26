HiFi - music streaming app by Case Scally

The problem with almost all streaming sites and apps  today is they only stream at about 192 kbps (128 kbps for SoundCloud, about half the quality of a lossy mp3 file). The major competitor to my application would be Tidal, which offers lossless streaming, however artists must release their music through a label to publish music on their platform. HiFi will offer high quality 320 kbps streaming without transcoding  degradation of the original media. HiFI will offer anyone a free account where they can follow other users and share their high quality music.

Getting Started:

Install JSON Server

`npm install -g json-server`

Create a db.json file with these resources
```
{
  "users": [],
  "songs": [],
  "likes":[],
  "followers": []
}
```

Start JSON Server

`json-server --watch db.json`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
