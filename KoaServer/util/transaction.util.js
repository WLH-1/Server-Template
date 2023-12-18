const { ebuyConn, commConn } = require("../app");
// 数据库事务
module.exports = Transaction = {
  startTransaction: async (db) => {
    let session = null;
    switch (db) {
      case "commDB":
        session = await commConn.startSession();
        break;
      case "ebuyDB":
        session = await ebuyConn.startSession();
        break;
    }
    session.startTransaction();
    return session;
  },
  commitTransaction: async (session) => {
    await session.commitTransaction();
    await session.endSession();
  },
  rollbackTransaction: async (session) => {
    await session.abortTransaction();
    await session.endSession();
  },
};
