var MumpsDB = require('./mumpsdb');

// Supported types for 'MumpsDB' connection are: 'Cache' and 'GTM'
var db = MumpsDB.openConnection({
    type: 'GTM',
});

if (db.error) {
    console.log('An error has occurred connecting to the M database: ' + db.message);
    process.exit(db.code);
}
console.log('Successfully connected to the M database!');

console.log("\nBasic M database driver calls ...");
console.log('\tVersion: ' + db.version());
console.log('\tGlobal directory (list): ' + JSON.stringify(db.global_directory({})));
console.log('\tGlobal directory (just the l\'s): ' + JSON.stringify(db.global_directory({lo: "L", hi: "L~"})) + '\n');

console.log('Closing database connection!');
db.close();
