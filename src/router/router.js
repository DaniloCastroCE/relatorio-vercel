const express = require('express')
const router = express.Router()
const path = require('path')
const Item = require('../models/item')

router.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../public/pages/index.html'))
})

router.get('/countDocuments', async (req, res) => {
    try {
        const qt = await Item.countDocuments()
        return res.status(200).json({
            status: 'success', 
            message: 'Sucesso na consulta de quantidades de itens!', 
            qt: qt
        })
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Errou ao consultar a quantidade de itens!',
        })
    }
})

router.get('/getAll', async (req, res) => {
    try {
        const itens = await Item.find({}).sort({ createdAt: 1 })

        return res.status(200).json({
            status: 'success',
            message: 'Sucesso na consulta de itens!',
            json: itens
        })

    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'Errou ao consultar itens',
            error: err.message
        })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)

        return res.status(200).json({
            status: 'success',
            message: 'Sucesso na consultar por ID de um item!',
            json: item
        })

    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'Errou em consultar por ID',
            error: err.message
        })
    }
})

router.delete('/deleteAll', async (req, res) => {
    try {
        const result = await Item.deleteMany({})

        return res.status(200).json({
            status: 'success',
            message: 'Sucesso em deletar todos os itens!',
            result: result
        })

    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'Errou em deletar todos os itens!',
            error: err.message
        })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const itemDeletado = await Item.findByIdAndDelete(id);

        if (!itemDeletado) {
            return res.status(404).json({
                status: 'error',
                message: 'Item não encontrado para exclusão.',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: `Item com ID ${id} deletado com sucesso.`,
            deleted: itemDeletado
        });

    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'Erro ao deletar item por ID.',
            error: err.message
        });
    }
});

router.post('/create', async (req, res) => {
    const { nome, zona, horario, contato, envio, os, obs } = req.body

    if (!nome || !zona || !contato || !envio) {
        return res.status(422).json({
            status: 'error',
            message: 'Obrigatorio preenchar os campos NOME e ZONA',
        })
    }

    const item = { nome, zona, horario, contato, envio, os, obs }

    const novoItem = new Item(item)

    await novoItem.save()

    return res.status(201).json({
        status: 'success',
        message: `O Item (${nome.toUpperCase()}) foi adicionado a lista com sucesso !`,
        obj: item,
    })

})

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { nome, zona, horario, contato, envio, os, obs, exec } = req.body

        if (!nome || !zona || !contato || !envio) {
            return res.status(422).json({
                status: 'error',
                message: 'Obrigatorio preenchar os campos NOME e ZONA',
            })
        }
        const itemAtualizado = await Item.findByIdAndUpdate(
            id,
            { nome, zona, horario, contato, envio, os, obs, exec }, {
            new: true,
            runValidators: true,
        })

        if (!itemAtualizado) {
            return res.status(404).json({
                status: 'error',
                message: 'Item não encontrado',
                item: itemAtualizado
            })
        }

        return res.status(200).json({
            status: 'success',
            message: `O Item com ID ${id} foi atualizado com sucesso!`,
            obj: itemAtualizado,
        })

    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'Errou em atualizar item!',
            error: err.message
        })
    }
})

module.exports = router