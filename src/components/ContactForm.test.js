import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
  // Arrange
  render(<ContactForm />);
});

test('renders the contact form header', ()=> {
  // Arrange
  render(<ContactForm />);

  // Act
  const header = screen.queryByText(/contact form/i);

  // Assert
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/contact form/i);

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  // Arrange
  render(<ContactForm />);

  // Act
  const firstNameField = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameField, "Ben");

  // Assert
  const errorMessages = await screen.findAllByTestId("error");
  expect(errorMessages).toHaveLength(1);
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  // Arrange
  render(<ContactForm />);

  // Act
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  // Assert
  await waitFor(() => {
    const errorMessages = screen.queryAllByTestId("error");
    expect(errorMessages).toHaveLength(3);
  })
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  // Arrange
  render(<ContactForm />);

  // Act
  const firstNameField = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameField, "Benjamin");

  const lastNameField = screen.getByLabelText(/last name*/i);
  userEvent.type(lastNameField, "Craddock");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  // Assert
  const errorMessages = await screen.getAllByTestId("error");
  expect(errorMessages).toHaveLength(1);
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  // Arrange
  render(<ContactForm />);

  // Act
  const emailField = screen.getByLabelText(/email*/i);
  userEvent.type(emailField, "coconuts@gmail");

  // Assert
  const errorMessage = await screen.findByText(/email must be a valid email address/i);
  expect(errorMessage).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  // Arrange
  render(<ContactForm />);

  // Act
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  // Assert
  const errorMessage = await screen.findByText(/lastName is a required field/i);
  expect(errorMessage).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  // Arrange
  render(<ContactForm />);

  // Act
  const firstNameField = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameField, "Benjamin");

  const lastNameField = screen.getByLabelText(/last name*/i);
  userEvent.type(lastNameField, "Craddock");

  const emailField = screen.getByLabelText(/email*/i);
  userEvent.type(emailField, "benjamin@gmail.com");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  // Assert
  await waitFor(() => {
    const firstNameDisplay = screen.queryByText("Benjamin");
    const lastNameDisplay = screen.queryByText("Craddock");
    const emailDisplay = screen.queryByText("benjamin@gmail.com");
    const messageDisplay = screen.queryByTestId("messageDisplay");

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).not.toBeInTheDocument();
  })

});

test('renders all fields text when all fields are submitted.', async () => {
  // Arrange
  render(<ContactForm />);

  // Act
  const firstNameField = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameField, "Benjamin");

  const lastNameField = screen.getByLabelText(/last name*/i);
  userEvent.type(lastNameField, "Craddock");

  const emailField = screen.getByLabelText(/email*/i);
  userEvent.type(emailField, "benjamin@gmail.com");

  const messageField = screen.getByLabelText(/message/i);
  userEvent.type(messageField, "Hello this is a message");

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  // Assert
  await waitFor(() => {
    const firstNameDisplay = screen.queryByText("Benjamin");
    const lastNameDisplay = screen.queryByText("Craddock");
    const emailDisplay = screen.queryByText("benjamin@gmail.com");
    const messageDisplay = screen.queryByText("Hello this is a message");

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();
  })

});