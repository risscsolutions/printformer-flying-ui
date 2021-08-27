import React, {Component, ErrorInfo} from "react";
import {
    Dialog, DialogContent, DialogContentText, DialogTitle,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Theme,
} from "@material-ui/core";

import Fab from "@material-ui/core/Fab";
import {Backspace, ExitToApp, Help} from "@material-ui/icons";
import {EditorLoadedEvent} from "@rissc/printformer-editor-client/dist/Objects/EditorLoadedEvent";
import Events from "@rissc/printformer-editor-client/dist/Events";
import {Props} from "./Common";
import {ContextMenu} from "./Components/ContextMenu";
import {BlockMenu} from "./Components/BlockMenu";
import {ElementInformation} from "./Components/ElementInformation";
import {Settings} from "./Components/Settings";
import {KeyboardShortcut} from "@rissc/printformer-editor-client/dist/Objects";
import { ThemeProvider } from '@material-ui/styles';

type AppState = {
    openHelp: boolean,
    messages: Array<string>
    editorSteps: any,
    editorConfiguration: any,
}

type AppProps = Props & { draft: string, theme: Theme };

class App extends Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            openHelp: false,
            messages: [],
            editorSteps: null,
            editorConfiguration: null,
        };
        this.props.editor.getEvents().on(Events.EDITOR_LOADED, (event: EditorLoadedEvent) => {
            this.setState({
                editorConfiguration: event.configuration,
                editorSteps: event.editorSteps,
            });
        })
        this.registerShortCuts();
    }

    private registerShortCuts() {
        const service = this.props.editor.getKeyboardShortcutService();

        service.registerShortcutWithCallBack(new KeyboardShortcut(["KeyS"], true), () => {
            this.props.editor.save()
                .then(
                    () => this.setState({messages: [...this.state.messages, 'Entwurf wurde gespeichert']}),
                    () => this.setState({messages: [...this.state.messages, 'Entwurf konnte nicht gespeichert werden']}),
                );
        });
        service.registerShortcutWithCallBack(new KeyboardShortcut(['KeyZ'], true), () => {
            this.props.editor.getUndoRedo().undo();
        });
        service.registerShortcutWithCallBack(new KeyboardShortcut(['KeyR'], true), () => {
            this.props.editor.getUndoRedo().redo();
        });
        service.registerShortcutWithCallBack(new KeyboardShortcut(['BracketRight'], true), () => {
            this.props.editor.getZoom().in();
        });
        service.registerShortcutWithCallBack(new KeyboardShortcut(['Slash'], true), () => {
            this.props.editor.getZoom().out();
        });
        service.registerShortcutWithCallBack(new KeyboardShortcut(['KeyH'], true), () => {
            this.setState({openHelp: true});
        });
    }

    public componentDidCatch(error: Error, info: ErrorInfo) {
        console.debug(error, info);
    }

    public render() {
        return (
            <ThemeProvider theme={this.props.theme}>
                <ContextMenu editor={this.props.editor}/>
                <BlockMenu editor={this.props.editor}/>
                <Fab color="primary"
                     style={{
                         position: 'absolute',
                         top: "16px",
                         left: "16px",
                     }} onClick={() => this.goToPreviousStep()}>
                    <Backspace/>
                </Fab>
                <Fab color="primary"
                     style={{
                         position: 'absolute',
                         top: "16px",
                         right: "16px",
                     }} onClick={() => this.goToNextStep()}>
                    <ExitToApp/>
                </Fab>
                <Fab color="primary"
                     style={{
                         position: 'absolute',
                         bottom: "16px",
                         right: "16px",
                     }} onClick={() => this.setState({openHelp: true})}>
                    <Help/>
                </Fab>
                <Dialog open={this.state.openHelp}
                        onClose={() => this.setState({openHelp: false})}
                        aria-labelledby="help-title"
                        aria-describedby="help-description">
                    <DialogTitle id="help-title">
                        How goes dis editor?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="help-description">
                            Keyboard Shortcuts
                        </DialogContentText>
                        <TableContainer>
                            <Table aria-label="Keyboard Shortcuts">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tastenkombination</TableCell>
                                        <TableCell>Funktion</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow>
                                        <TableCell>
                                            cmd / s
                                        </TableCell>
                                        <TableCell>Speichert den Entwurf</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            cmd / z
                                        </TableCell>
                                        <TableCell>Macht die letzte Änderung rückgängig</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            cmd / r
                                        </TableCell>
                                        <TableCell>wiederholt die zuletzt rückgängig gemachte änderung</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            cmd / +
                                        </TableCell>
                                        <TableCell>vergrößert den Editor</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            cmd / -
                                        </TableCell>
                                        <TableCell>verkleinert den Editor</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            cmd / i
                                        </TableCell>
                                        <TableCell>Zeigt informationen über das aktuell ausgewählte element</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            cmd / .
                                        </TableCell>
                                        <TableCell>Öffnet die Einstellungen</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            cmd / h
                                        </TableCell>
                                        <TableCell>Zeigt diese Hilfe</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                </Dialog>
                <ElementInformation editor={this.props.editor}/>
                <Settings editor={this.props.editor}/>
                {this.state.messages.map((message, index) => {
                    return (<Snackbar
                            key={index + message}
                            color="primary"
                            open={true} autoHideDuration={6000}
                            message={message}
                            onClose={() => this.removeMessage(message)}/>
                    )
                })}
            </ThemeProvider>
        );
    }

    private removeMessage(message: string) {
        const messages = [...this.state.messages];
        messages.splice(
            messages.indexOf(message), 1
        )
        this.setState({messages});
    }

    private goToPreviousStep() {
        this.goToStep(this.state.editorSteps.cancel);
    }

    private async goToNextStep() {
        await this.props.editor.goToNextStep();
        this.goToStep(this.state.editorSteps.next);
    }

    private goToStep(step: any) {
        if (step.method === 'POST') {
            let form = document.createElement('form');
            form.method = step.method;
            form.action = `/editor/${this.props.draft}/${step.action}`;
            form.target = "_top";

            document.body.appendChild(form);

            form.submit();
        } else {
            window.location.assign(`/editor/${this.props.draft}/${step.action}`);
        }
    }
}

export default App;
