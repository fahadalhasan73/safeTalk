const mongoose = require('mongoose');
let pending;
function connectDB(){
  if(!process.env.MONGODB_URI) return Promise.reject(new Error('MONGODB_URI is missing'));
  if(mongoose.connection.readyState === 1) return Promise.resolve(mongoose.connection);
  if(!pending) pending = mongoose.connect(process.env.MONGODB_URI, {maxPoolSize:5,serverSelectionTimeoutMS:10000}).catch(e=>{pending=null;throw e});
  return pending;
}
module.exports={connectDB};
