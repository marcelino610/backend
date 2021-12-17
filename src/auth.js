const admin = true

const verifyAuth = (req, res, next) => {
    admin ? next() : res.json({ error: 'Credenciales no válidas' })
}

export default verifyAuth