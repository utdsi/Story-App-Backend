

const express = require("express")

const { UserModel } = require("../model/user.model")


const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config()

//------------------------signup---------------------------------

const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body

        const user = await UserModel.findOne({ email })

        if (user) {
            res.status(200).send({ "msg": "User already exists" })
        } else {

            bcrypt.hash(password, 8, async function (err, hash) {

                if (err) {
                    return res.status(400).send({ msg: "Someting went wrong please try again" })
                } else {

                    const new_user = new UserModel({ name, email, password: hash })
                    await new_user.save()
                    res.status(201).send({ status: "1", msg: "Signup Successfull!", data: [] })

                }

            });
        }

    } catch (error) {
        res.status(500).send({ msg: "Something went wrong please try again " })
    }

}

//------------------------login---------------------------------

const login = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(401).send({ msg: "user not found please signin first" })
        }

        bcrypt.compare(password, user.password, function (err, result) {

            if (err) return res.status(400).send({ msg: "Someting went wrong please try again" })

            const token = jwt.sign({ userId: user._id }, process.env.secret_key);

            res.status(200).send({ status: "1", msg: "User Successfully Login", token: token, data: [{ user_id: user._id, name: user.name, email: user.email, dob: user.dob, gender: user.gender, created_at: user.created_at, profile_status: user.profile_status, profile_pic: user.profile_pic }] })

        });
    } catch (error) {
        res.status(500).send({ msg: "Something went wrong please try again " })
    }
}

//------------------------delete---------------------------------

const remove = async (req, res) => {

    try {
        const userId = req.params

        const user = await UserModel.findOne({ _id: userId })

        if (user) {
            await UserModel.findByIdAndDelete({ _id: userId })

            res.status(200).send({ status: "1", msg: "User Successfully Deleted from our system!", data: [] })
        } else {
            res.status(200).send({ status: "2", msg: "No Data Found!", data: [] })
        }

    } catch (error) {
        res.status(500).send({ msg: "Something went wrong please try again " })
    }

}

//------------------------update password---------------------------------

const update_password = async (req, res) => {


    try {
        const userId = req.params
        const { email, old_password, new_password } = req.body
        const user = await UserModel.findOne({ _id: userId, email: email })



        if (user) {

            bcrypt.compare(old_password, user.password, async function (err, result) {

                if (result) {

                    bcrypt.hash(new_password, 8, async function (err, hash) {

                        if (err) return res.status(400).send({ msg: "Someting went wrong please try again" })

                        await UserModel.findByIdAndUpdate({ _id: userId }, { password: hash })

                        res.status(200).send({ status: "1", msg: "Successfully updated password!", data: [] })

                    });
                }
            });
        } else {

            res.status(200).send({ status: "2", msg: "No Data Found!", data: [] })
        }
    } catch (error) {

        res.status(500).send({ msg: "Something went wrong please try again " })
    }



}


//------------------------forgot password---------------------------------

const forgot_password = async (req, res) => {

    try {
        const userId = req.params
        const { email } = req.body
        const user = await UserModel.findOne({ _id: userId, email: email })

        if (user) {



            res.status(200).send({ status: "1", msg: "We have sent a updated password on your email account. So, Please check your email", data: [] })

        } else {

            res.status(200).send({ status: "2", msg: "Please enter valid email address!", data: [] })
        }

    } catch (error) {
        res.status(500).send({ msg: "Something went wrong please try again " })
    }
}

//------------------------user_profile_update---------------------------------

const user_profile_edit = async (req, res) => {

    try {
        const userId = req.params
        const { gender, dob } = req.body
        const user = await UserModel.findOne({ _id: userId })

        if (user) {

            await UserModel.findByIdAndUpdate({ _id: userId }, { gender, dob })

            res.status(200).send({ status: "1", msg: "User details has been uploaded successfully", data: [] })

        } else {

            res.status(200).send({ status: "2", msg: "No Data Found!", data: [] })
        }
    } catch (error) {
        res.status(500).send({ msg: "Something went wrong please try again " })
    }
}

//------------------------user_profile_pic_update---------------------------------

const user_profile_pic_edit = async (req, res) => {

    try {
        const userId = req.params
        const { profile_pic } = req.body
        const user = await UserModel.findOne({ _id: userId })

        if (user) {

            await UserModel.findByIdAndUpdate({ _id: userId }, { profile_pic })

            res.status(200).send({ status: "1", msg: "User profile photo updated successfully", data: [] })

        } else {

            res.status(200).send({ status: "2", msg: "No Data Found!", data: [] })
        }
    } catch (error) {
        res.status(500).send({ msg: "Something went wrong please try again " })
    }
}





module.exports = { signup, login, remove, update_password, forgot_password, user_profile_edit, user_profile_pic_edit }

