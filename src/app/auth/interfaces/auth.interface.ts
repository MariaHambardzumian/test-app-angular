export interface UserRegistration {
  email: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface FailedLogin {
  failMessage: string | null
}
