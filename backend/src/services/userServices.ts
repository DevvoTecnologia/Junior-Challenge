import { UserModel } from "../models/userModel"
import { UserType } from "../types/userType"

export const getUsers = () => UserModel.find()

export const getUserByEmail = (email: string) => UserModel.findOne({ email })

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken })

export const getUserById = (id: string) => UserModel.findById(id)

export const createUser = (userData: UserType) => {
  const user = new UserModel(userData)

  return user.save()
} 

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id})

export const updateUserById = (id: string, userData: UserType) => UserModel.findByIdAndUpdate(id, userData)
