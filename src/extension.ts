'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { JsonHelperCore } from './JsonHelperCore'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "jsonhelper" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.jsonStrFix', () => {
        // The code you place here will be executed every time your command is executed

        editStringReplace(function(h, doc): string {
            return h.formatJson(doc);
        });

        vscode.commands.executeCommand("editor.action.formatDocument");
    });

    let disposable2 = vscode.commands.registerCommand('extension.json2jsonMap', () => {
        editStringReplace(function(h, doc): string {
            let obj: Object;
            try {
                obj = JSON.parse(doc);
            } catch (error) {
                vscode.window.showErrorMessage("Fail to load Json, please check your json string");
                return null;
            }
            h.loopObj("", obj, "", -1);
            return JSON.stringify(h.entry);


        });

        vscode.commands.executeCommand("editor.action.formatDocument");
    });

    let disposable3 = vscode.commands.registerCommand('extension.json2jsonStr', () => {
        // The code you place here will be executed every time your command is executed

        editStringReplace(function(h, doc): string {
            let obj: Object;
            try {
                obj = JSON.parse(doc);
            } catch (error) {
                vscode.window.showErrorMessage("Fail to load Json, please check your json string");
                return null;
            }
            
            return h.jsonInLine(obj);
        });
    });



    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable3);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function editStringReplace(strProcess: (helper: JsonHelperCore, docStr: string) => string) {
    var editor = vscode.window.activeTextEditor;
    var doc = editor.document;
    var jsonStr = doc.getText();

    let helper = new JsonHelperCore();
    jsonStr = strProcess(helper, jsonStr);
    if (jsonStr != null && jsonStr != "") {
        var start = new vscode.Position(0, 0);
        var end = new vscode.Position(doc.lineCount + 1, 0);
        var range = new vscode.Range(start, end);

        editor.edit(function(e) {
            e.replace(range, jsonStr);
        });

        
    }

}