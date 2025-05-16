import { z } from "zod";

export const registrationSchema = z
  .object({
    login: z.string().min(3, {
      message: "Логин должен быть не менее 3 символов",
    }),
    email: z.string().email("Введите корректный email"),
    password: z
      .string()
      .min(6, {
        message: "Пароль должен быть не менее 6 символов",
      })
      .regex(/^(?=.*[A-Z]).+$/, {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      }),
    confirmPassword: z.string(),
    birthday: z
      .string()
      .regex(/^(0[1-9]|[12][0-9]|3[01]),(0[1-9]|1[0-2]),\d{4}$/, {
        message: "Введите дату в формате dd,mm,yyyy",
      }),
    phone: z.string().regex(/^\+375(29|33|44|25)\d{7}$/, {
      message: "Введите корректный номер в формате +375XXXXXXXXX",
    }),
    userGender: z.string(),
  })
  .required({
    login: true,
    email: true,
    password: true,
    confirmPassword: true,
    birthday: true,
    phone: true,
    userGender: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      try {
        const [day, month, year] = data.birthday.split(",");
        const birthDate = new Date(`${year}-${month}-${day}`);
        return !isNaN(birthDate.getTime()) && birthDate <= new Date();
      } catch {
        return false;
      }
    },
    {
      message: "Введите корректную дату рождения",
      path: ["birthday"],
    }
  );
