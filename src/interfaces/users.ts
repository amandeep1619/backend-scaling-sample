export interface ICreateUser {
  email: string
  password: string
  fullName?: string
}

export interface IUpdateUser {
  fullName: string
  age: number
}

export interface IUpdateUserDetails {
  id: string
  
}