const fs = require('fs');
const chalk = require('chalk');
const getNote = function (title) {
    const allNotes = getAllNotes();
    const noteByTitle = allNotes.find((note) => note.title === title);
    if (noteByTitle){
        console.log(chalk.inverse('Title', noteByTitle.title), 'Body: ', noteByTitle.body);
    } else {
        console.log(chalk.bgRed.inverse('No notes found!'))
    }
}
const addNote = (title, body) => {
    const allNotes = getAllNotes();
    const checkDuplicateNotes = allNotes.find((note) => note.title === title);
    if (!checkDuplicateNotes) {
        allNotes.push({
            title: title,
            body: body
        })
        saveNotes(allNotes);
        console.log(chalk.green.inverse('new note added'));
    } else {
        console.log(chalk.bgRed.inverse('Note already exists'));
    }
}
const saveNotes = (notes) => {
    const notesJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJson);
}
const getAllNotes = () => {
    try {
        const notes = fs.readFileSync('notes.json')
        const notesJson = notes.toString()
        const notesParsed = JSON.parse(notesJson);
        return notesParsed;
    } catch (error) {
        return [];
    }
}
const removeNote = (title) => {
    const allNotes = getAllNotes();
    const noteToKeep = allNotes.filter((note) => title !== note.title)
    if (allNotes.length > noteToKeep.length) {
        console.log(chalk.bgGreen('Note removed!'));
        saveNotes(noteToKeep)
    } else {
        console.log(chalk.bgRed('No note found!'));
    }
}
const listAllNotes = () => {
    const allNotes = getAllNotes();
    console.log(chalk.bgBlue('Your Notes'))
    allNotes.forEach(element => {
        console.log(chalk.bgGreen('Title: ' + element.title, 'Body: ' + element.body))
    });
}
module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote: removeNote,
    listAllNotes: listAllNotes
}