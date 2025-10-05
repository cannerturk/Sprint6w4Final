import React, { useEffect, useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isValid, setIsValid] = useState(false);

  const history = useHistory();

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nextErrors = {
      email: emailRegex.test(form.email) ? '' : errorMessages.email,
      password: form.password.length >= 4 ? '' : errorMessages.password,
    };
    setErrors(nextErrors);

    const formOk =
      emailRegex.test(form.email) && form.password.length >= 4 && form.terms;

    setIsValid(formOk);
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // form valid değilse post atma
    if (!isValid) return;

    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          history.push('/main');
        } else {
          history.push('/error');
        }
      });
  };

  // Hata mesajlarını sadece alanlar doldurulmuş ve hatalıysa göster
  const showEmailError = form.email !== '' && !!errors.email;
  const showPasswordError = form.password !== '' && !!errors.password;

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={showEmailError}
        />
        {showEmailError && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={showPasswordError}
        />
        {showPasswordError && <FormFeedback>{errors.password}</FormFeedback>}
      </FormGroup>

      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>

      <FormGroup className="text-center p-4">
        <Button color="primary" type="submit" disabled={!isValid}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
