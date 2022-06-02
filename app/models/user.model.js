module.exports = mongoose => {
  const userSchema = new mongoose.Schema({
      userName: {
          type: String,
          unique: true,
          required: true
      },
      FirstName: {
          type: String,
          required: true
      },
      lastName: {
          type: String,
          required: true
      },
      email: {
          type: String,
          required: true
      },
      phoneNumber: {
          type: String,
          required: true
      },
      password: {
          type: String,
          required: true
      }

  }, {
      timestamps: true
  })
  const user = mongoose.model("userDetails", userSchema);
  return user;
};