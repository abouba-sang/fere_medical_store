import bcrypt from 'bcrypt';

const hashPassword = async password => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log('Hasging error:', error);
  }
};

export default hashPassword;
