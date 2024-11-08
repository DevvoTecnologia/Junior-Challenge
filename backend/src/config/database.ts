import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://marcospedroalves2003:Jts1oddmCwWpChzX@cluster0.ptf7e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    );
    // Jts1oddmCwWpChzX
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
