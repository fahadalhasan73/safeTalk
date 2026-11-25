require('dotenv').config();
const bcrypt=require('bcryptjs');
const {connectDB}=require('../src/db');
const {User}=require('../src/models');
(async()=>{await connectDB();for(let i=1;i<=2;i++){const id=process.env[i===1?'ADMIN_ONE_ID':'ADMIN_TWO_ID'];const password=process.env[i===1?'ADMIN_ONE_PASSWORD':'ADMIN_TWO_PASSWORD'];if(!id||!password||password.length<12)throw Error(`Missing secure ADMIN_${i===1?'ONE':'TWO'}_ID/PASSWORD (minimum 12 chars)`);const hash=await bcrypt.hash(password,12);await User.findOneAndUpdate({adminId:id},{$set:{role:'admin',passwordHash:hash,adminId:id}},{upsert:true});console.log('Admin ready:',id)}process.exit(0)})().catch(e=>{console.error(e.message);process.exit(1)});
