import db from "../config/db.js";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


const JWT_Secret = process.env.JWT_Secret
export const healthCheck = (req, res) => {
  res.send("App is running");
};

export const register = async(req,res)=>{
  const {name, email,password} = req.body;
  if(!name|| !email||!password){
    res.status(401).json({error: "All fields required"})
  }
  try {
    const isRegistered = await db.query("SELECT * FROM users WHERE email = ($1)",[email])
    if(isRegistered.rows.length>0){
      res.status(409).json({message: "already registed, pls login"})
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds)
    const newUser = await db.query("INSERT INTO users(name,email,password) VALUES($1,$2,$3)",[name,email,hashedPassword])
    res.status(201).json({message:"User created", user:newUser})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "Email and password required" });
  }
  try {
    const result = await db.query(
        "SELECT * FROM users WHERE email=($1)",[email]

    )
    const user = result.rows[0]
    if(!user){
        return res.status(404).json({message:"Invalid email"})
    }
    const valid = await bcrypt.compare(password,user.password)
    if(!valid){
        return res.status(400).json({error: "Invalid email or password"})
    }
    const token = JWT.sign({id:user.id},JWT_Secret,{expiresIn:"1h"})
    res.json({message:"Login successfull", token})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
};
