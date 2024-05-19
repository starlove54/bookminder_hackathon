import * as edgedb from 'edgedb';

async function CreateConnection() {
      const connection = await edgedb.createClient({
        host: 'localhost',
        port: 5678,
    });

//     await connection.query('INSERT Story { name := $name }', { name: "My story" })

//     const stories = await connection.query("SELECT Story { name };");

//     console.log(stories);
}
