const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    })

    const categories = await prisma.category.findMany({
      include: { products: true },
    })

    res.json({ products, categories })
  } catch (error) {
    next(error)
  }
})

router.get('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: { category: true },
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/products', async (req, res, next) => {
  try {
    const Product = {
      name:req.body.name,
      quantity:Number(req.body.quantity),
      price:Number(req.body.price)}
    const product = await prisma.product.create({
      data: Product,
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deleteProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(deleteProduct)
  } catch (error) {
    next(error)
  }
})

router.patch('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const updateProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      include: { category: true },
    })
    res.json(updateProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
