import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';

const schema = z.object({ username: z.string().min(1, 'مطلوب'), password: z.string().min(1, 'مطلوب') });

type FormValues = z.infer<typeof schema>;

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema)});

  const onSubmit = async (data: FormValues) => {
    await login(data.username, data.password);
  };

  return (
    <div dir="rtl" className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-50 to-white">
      <div className="w-full max-w-sm bg-white border rounded-xl p-6 shadow-sm">
        <h1 className="text-xl font-bold mb-4 text-center">تسجيل الدخول</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm">اسم المستخدم</label>
            <input className="w-full rounded-md border px-3 py-2" {...register('username')} />
            {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm">كلمة المرور</label>
            <input type="password" className="w-full rounded-md border px-3 py-2" {...register('password')} />
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button disabled={isSubmitting} className="w-full rounded-md bg-slate-900 text-white py-2 hover:bg-slate-800">دخول</button>
        </form>
      </div>
    </div>
  );
};
