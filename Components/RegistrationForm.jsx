import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../src/index.css'
const RegistrationForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, control } = useForm()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const onSubmit = (data) => {
    setFormData(data);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const password = watch('password');
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        <ul>

          <li>Login:
            <input {...register('userName',
              {
                required: 'Введите логин',
                minLength: {
                  value: 3,
                  message: 'Логин должен быть не менее 3 символов',
                },
              })} />
            {errors.userName && <p>{errors.userName.message}</p>}
          </li>
          <li>
            Email:
            <input
              {...register('userEmail', {
                required: 'Поле обязательно для заполнения',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: 'Введите корректный email',
                },
              })} />
            {errors.userEmail && <p>{errors.userEmail.message}</p>}
          </li>
          <li>
            Password:
            <input
              type="password"
              {...register('password', {
                required: 'Введите пароль',
                minLength: {
                  value: 6,
                  message: 'Пароль должен быть не менее 6 символов',
                },
                pattern: {
                  value: /^(?=.*[A-Z]).+$/,
                  message: 'Пароль должен содержать хотя бы одну заглавную букву',
                },
              })} />
            {errors.password && <p>{errors.password.message}</p>}
          </li>
          <li>
            Confirm password:
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Подтвердите пароль',
                validate: (value) =>
                  value === password || 'Пароли не совпадают',
              })} />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </li>
          <li>
            Date of birth:
            <input
              placeholder='dd,mm,yyyy'
              {...register('birthdayDate', {
                required: 'Введите дату рождения ',
                pattern: {
                  value: /^(0[1-9]|[12][0-9]|3[01]),(0[1-9]|1[0-2]),\d{4}$/,
                  message: 'Введите дату в формате dd,mm,yyyy',
                },
                validate: (value) => {
                  const [day, month, year] = value.split(',');
                  const birthDate = new Date(`${year}-${month}-${day}`);
                  if (isNaN(birthDate.getTime()) || birthDate > new Date()) {
                    return 'Введите корректную дату';
                  }
                }
              })} />
            {errors.birthdayDate && <p>{errors.birthdayDate.message}</p>}
          </li>
          <li>
            Gender:
            <label >
              <input
                type='radio'
                value={'male'}
                {...register('userGender', {
                  required: 'Выберите пол',
                  validate: (value) =>
                    ['male', 'female'].includes(value) || 'Выберите корректное значение',
                })} />
              Male
            </label>
            <label >
              <input
                type='radio'
                value={'female'}
                {...register('userGender', {
                })} />
              Female
            </label>
          </li>
          <li>
            Phone number:

            <Controller
              name="userPhoneNumber"
              control={control}
              rules={{
                required: 'Введите номер телефона',
                pattern: {
                  value: /^\+375(29|33|44|25)\d{7}$/,
                  message: 'Введите корректный номер в формате +375XXXXXXXXX',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  international
                  defaultCountry="BY"
                  value={value}
                  onChange={onChange}
                  placeholder="+375XXXXXXXXX"
                />
              )}
            />
            {errors.userPhoneNumber && (
              <p>{errors.userPhoneNumber.message}</p>
            )}
          </li>
        </ul>
        <button type="submit">Зарегистрироваться</button>
      </form>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <h3>Успешно зарегистрировано!</h3>
            <pre className="modal-json">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  );
};
export default RegistrationForm