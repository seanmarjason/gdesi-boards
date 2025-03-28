import postgres from 'postgres';

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  transform: {
    undefined: null
  }
});


export async function getPgVersion() {
  const result = await sql`select version()`;
  return(result[0]);
}

