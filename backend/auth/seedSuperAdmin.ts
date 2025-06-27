import User from './models/userSchema.model';
import bcrypt from 'bcryptjs';

export const seedSuperAdmin = async () => {
  const existing = await User.findOne({ role: 'superadmin' });
  if (!existing) {
    const hashedPassword = await bcrypt.hash(`${process.env.SUPERADMIN_PASSWORD}`, 10);
    await User.create({
      email: `${process.env.SUPERADMIN_EMAIL}`,
      password: hashedPassword,
      name: `${process.env.SUPERADMIN_NAME}`,
      role: 'superadmin'
    });
    console.log('✅ Superadmin seeded');
  }
};
