import React, { useState } from "react";
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
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = Object.fromEntries(form);

    try {
      const validatedData = registrationSchema.parse(data);
      setFormData(validatedData);
      setIsModalOpen(true);
    } catch (err) {
      const formattedErrors = err.errors.reduce((acc, error) => {
        const field = error.path[0];
        acc[field] = error.message;
        return acc;
      }, {});

      setErrors(formattedErrors);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Login"
          variant="outlined"
          name="login"
          fullWidth
          margin="normal"
        />
        {errors.login && <p style={{ color: "red" }}>{errors.login}</p>}

        <TextField
          label="Email"
          variant="outlined"
          name="email"
          fullWidth
          margin="normal"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          fullWidth
          margin="normal"
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <TextField
          label="Confirm password"
          variant="outlined"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword}</p>
        )}

        <TextField
          label="Date of birth (dd,mm,yyyy)"
          variant="outlined"
          name="birthday"
          fullWidth
          margin="normal"
        />
        {errors.birthday && <p style={{ color: "red" }}>{errors.birthday}</p>}

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="userGender"
            defaultValue="female"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        {errors.userGender && (
          <p style={{ color: "red" }}>{errors.userGender}</p>
        )}

        <TextField
          label="Phone number"
          variant="outlined"
          name="phone"
          placeholder="+375291234567"
          fullWidth
          margin="normal"
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

        <Button type="submit" variant="contained" color="primary">
          Зарегистрироваться
        </Button>
      </form>

      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        formData={formData}
      />
    </div>
  );
}

export default RegisterForm;
