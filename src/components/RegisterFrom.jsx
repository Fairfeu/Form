import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./validationSchema";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";
import Modal from "./Modal";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      login: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: "",
      userGender: "",
      phone: "",
    },
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const onSubmit = (data) => {
    console.log("Форма отправлена:", data);
    setIsModalOpen(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Login"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("login")}
        />
        {errors.login && <p style={{ color: "red" }}>{errors.login.message}</p>}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("email")}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}

        <TextField
          label="Confirm password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}

        <TextField
          label="Date of birth (dd,mm,yyyy)"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("birthday")}
        />
        {errors.birthday && (
          <p style={{ color: "red" }}>{errors.birthday.message}</p>
        )}

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Gender</FormLabel>
          <Controller
            name="userGender"
            control={control}
            defaultValue="female"
            render={({ field }) => (
              <RadioGroup
                row
                aria-label="gender"
                name="userGender"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            )}
          />
        </FormControl>
        {errors.userGender && (
          <p style={{ color: "red" }}>{errors.userGender.message}</p>
        )}

        <TextField
          label="Phone number"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("phone")}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}

        <Button type="submit" variant="contained" color="primary">
          Зарегистрироваться
        </Button>
      </form>

      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        formData={watch()}
      />
    </div>
  );
}

export default RegisterForm;
