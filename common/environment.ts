export const environment = {
    server: {port: process.env.SERVER_PORT || 3000},
    db: {url: process.env.DB_URL || 'mongodb://localhost/chat-api'}
};
