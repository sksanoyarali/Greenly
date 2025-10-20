// add address

import Address from '../models/address.model.js'

export const addAddress = async (req, res) => {
  try {
    const userId = req.userId
    const { address } = req.body
    await Address.create({ ...address, userId })
    res.status(201).json({
      success: true,
      message: 'Address added successfully',
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
// get address

export const getAddress = async (req, res) => {
  const userId = req.userId
  try {
    const addresses = await Address.find({ userId })
    return res.status(200).json({
      success: true,
      addresses,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
