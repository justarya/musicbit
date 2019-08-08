const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: 'string',
    required: true
  },
  password: {
    type:'string',
    required: true,
  },
  email: {
    type: 'string',
    requried: true,
    validate: {
      validator: function(v){
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email` 
    }
  }
})

const User = mongoose.model('Users', userSchema);

module.exports = User;