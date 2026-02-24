import { createServer } from 'http';
import { initSocket } from './infrastructure/config/socket';
import { Server } from './app';

const serverInstance = new Server();
const app = serverInstance.app;
const port = serverInstance.port;

const httpServer = createServer(app);

console.log('Calling initSocket...');
initSocket(httpServer); // inicializa y guarda la instancia

httpServer.listen(port, () => {
    console.log('\n==================================================');
    console.log(`🚀 Server listening on port ${port}`);
    console.log('✅ Socket.IO should be initialized and ready.');
    console.log('==================================================\n');
});
