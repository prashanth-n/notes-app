const yargs = require('yargs');
const notes = require('./notes')
const log = console.log;
yargs.version('1.0.1')
yargs.command({
    command: 'add',
    description: 'Add a new note',
    builder: {
        title: {
            description: 'Title of the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})
yargs.command({
    command: 'remove',
    description: 'remove note',
    builder: {
        title: {
            description: 'Title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})
yargs.command({
    command: 'list',
    description: 'listing all notes',
    handler() {
        notes.listAllNotes()
    }
})
yargs.command({
    command: 'read',
    description: 'reading a note',
    builder: {
        title: {
            description: 'Title of the note to be showed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.getNote(argv.title);
    }
})
yargs.parse();