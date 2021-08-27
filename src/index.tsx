import React from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from 'eventemitter3';
import EditorClient from "@rissc/printformer-editor-client/dist/EditorClient";
import Connector from "@rissc/printformer-editor-client/dist/Connector";
import App from "./App";
// @ts-ignore
import {createTheme} from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        }
    }
});

// @ts-ignore
window.events = new EventEmitter();

const connector = new Connector();
const editorIframe = document.getElementById('editor-iframe') as HTMLIFrameElement;

const query: { [key: string]: string } = location.search.substring(1)
    .split('&')
    .map(pair => pair.split('='))
    .reduce<{ [key: string]: string }>((acc, pair) => {
        acc[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        return acc;
    }, {});

let url;
if (process.env.NODE_ENV === 'development') {
    url = `${process.env.PRINTFORMER_URL}/editor/${query['draft']}/embed`;
} else {
    url = `${window.location.origin}/editor/${query['draft']}/embed`;
}

if (query['api_token']) {
    url += `?api_token=${query['api_token']}`
}

editorIframe.src = url;

// @ts-ignore
connector.connect(editorIframe, window.events)
    .then((editor: EditorClient) => {
        ReactDOM.render(<App theme={theme} draft={query['draft']} editor={editor}/>, document.querySelector('#app'));
    });
