import * as mysql from 'mysql2';
import { Client } from 'ssh2';

const sshClient = new Client();

/**
 * 
 * @example
 *  // SSHDBConnection({
    //   db_host: '127.0.0.1',
    //   db_port: 3306,
    //   db_username: 'root',
    //   db_password: 'Root@1234',
    //   //   db_database: 'tools',
    //   ssh_host: '103.18.6.159',
    //   ssh_port: 2286,
    //   ssh_user: 'root',
    //   ssh_pass: 'Gmo@12345@#$',
    // })
    //   .then((res) => {
    //     console.log('a');
    //   })
    //   .catch((err) => {
    //     console.log('b');
    //   });
 */
const SSHDBConnection = ({
  db_host,
  db_port,
  db_username,
  db_password,
  db_database,
  ssh_host,
  ssh_port,
  ssh_user,
  ssh_pass,
}): Promise<mysql.Connection> => {
  const dbServer = {
    host: db_host,
    port: db_port,
    user: db_username,
    password: db_password,
    database: db_database,
  };
  const sshTunnelConfig = {
    host: ssh_host,
    port: ssh_port,
    username: ssh_user,
    password: ssh_pass,
  };
  const forwardConfig = {
    srcHost: dbServer.host,
    srcPort: dbServer.port,
    dstHost: dbServer.host,
    dstPort: dbServer.port,
  };
  return new Promise((resolve, reject) => {
    sshClient
      .on('ready', () => {
        sshClient.forwardOut(
          forwardConfig.srcHost,
          forwardConfig.srcPort,
          forwardConfig.dstHost,
          forwardConfig.dstPort,
          (err, stream) => {
            if (err) reject(err);
            const updatedDbServer = {
              ...dbServer,
              stream,
            };
            const connection = mysql.createConnection(updatedDbServer);
            connection.connect((error) => {
              if (error) {
                console.log('error---', error.message);
                reject(error.message);
              } else {
                console.log('Connection Successful');
                resolve(connection);
              }
            });
          },
        );
      })
      .connect(sshTunnelConfig);
  });
};

export default SSHDBConnection;
