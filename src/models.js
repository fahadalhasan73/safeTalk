const mongoose=require('mongoose');
const {Schema,model}=mongoose;
const opts={timestamps:true};
const userSchema=new Schema({
  firstName:{type:String,trim:true,maxlength:80},lastName:{type:String,trim:true,maxlength:80},
  email:{type:String,lowercase:true,trim:true,sparse:true,unique:true},
  username:{type:String,lowercase:true,trim:true,sparse:true,unique:true},
  passwordHash:{type:String,select:false},googleId:{type:String,unique:true,sparse:true},
  role:{type:String,enum:['student','psychologist','admin'],required:true},
  adminId:{type:String,unique:true,sparse:true},
  alias:{type:String,unique:true,sparse:true},
  institution:{type:String,maxlength:140},dob:{type:Date},gender:{type:String,maxlength:60},
  bio:{type:String,maxlength:1500},speciality:{type:String,maxlength:180},
  avatarKey:String,certificateKey:String,
  verification:{type:String,enum:['new','hold','temporary','verified','rejected','suspended'],default:'new'},
  verifyNote:{type:String,maxlength:1000},
  isTestAccount:{type:Boolean,default:false}
},opts);
userSchema.index({role:1,verification:1});
const caseSchema=new Schema({
  title:{type:String,required:true,maxlength:140},
  student:{type:Schema.Types.ObjectId,ref:'User',required:true,index:true},
  assignedTo:{type:Schema.Types.ObjectId,ref:'User',default:null,index:true},
  status:{type:String,enum:['pending','ongoing','solved'],default:'pending',index:true},
  lastMessageAt:{type:Date,default:Date.now},
  messageCount:{type:Number,default:0},reopenCount:{type:Number,default:0},
  studentReadAt:{type:Date},psychologistReadAt:{type:Date},
  trashedAt:{type:Date,default:null,index:true},deleteAt:{type:Date,default:null,index:true},
  finishedBy:{type:Schema.Types.ObjectId,ref:'User',default:null},finishedAt:Date
},opts);
caseSchema.index({status:1,trashedAt:1,lastMessageAt:-1});
const messageSchema=new Schema({
  caseId:{type:Schema.Types.ObjectId,ref:'Case',required:true,index:true},
  sender:{type:Schema.Types.ObjectId,ref:'User',required:true},
  senderRole:{type:String,enum:['student','psychologist'],required:true},
  content:{type:String,required:true,maxlength:10000},
  readAt:{type:Date,default:null}
},opts);
messageSchema.index({caseId:1,createdAt:1});
const notificationSchema=new Schema({
  user:{type:Schema.Types.ObjectId,ref:'User',required:true,index:true},
  caseId:{type:Schema.Types.ObjectId,ref:'Case',default:null},
  text:{type:String,required:true,maxlength:400},seen:{type:Boolean,default:false}
},opts);
const reportSchema=new Schema({
  caseId:{type:Schema.Types.ObjectId,ref:'Case',required:true},
  reporter:{type:Schema.Types.ObjectId,ref:'User',required:true},
  reason:{type:String,required:true,maxlength:1500},
  status:{type:String,enum:['open','resolved'],default:'open'},
  resolution:{type:String,maxlength:2000},resolvedBy:{type:Schema.Types.ObjectId,ref:'User'},resolvedAt:Date
},opts);
const reviewSchema=new Schema({
  student:{type:Schema.Types.ObjectId,ref:'User',required:true},psychologist:{type:Schema.Types.ObjectId,ref:'User',required:true},
  caseId:{type:Schema.Types.ObjectId,ref:'Case',required:true,unique:true},
  rating:{type:Number,min:1,max:5,required:true},text:{type:String,maxlength:1500,default:''},
  visible:{type:Boolean,default:true}
},opts);
const presenceSchema=new Schema({caseId:{type:Schema.Types.ObjectId,ref:'Case',required:true},user:{type:Schema.Types.ObjectId,ref:'User',required:true},until:{type:Date,required:true}},opts);
presenceSchema.index({caseId:1,user:1},{unique:true});presenceSchema.index({until:1},{expireAfterSeconds:0});
const auditSchema=new Schema({actor:{type:Schema.Types.ObjectId,ref:'User'},action:String,target:String,details:String},opts);
module.exports={User:model('User',userSchema),Case:model('Case',caseSchema),Message:model('Message',messageSchema),Notification:model('Notification',notificationSchema),Report:model('Report',reportSchema),Review:model('Review',reviewSchema),Presence:model('Presence',presenceSchema),Audit:model('Audit',auditSchema)};
